import { StorableType, GraphableType } from './datatypes';

type TransformationIdentifier = string;

type Transformation = (a: any) => any;

/**
 * Reppresent an unique identifier for a transformation
 * @param indentifier the name of the transformation
 * @param from the type of the transformation parameter
 * @paramt the return type of the transformation
 */
export interface TransformationSignature {
  identifier: TransformationIdentifier,
  from: StorableType,
  to: GraphableType
}

/**
 * Represent a type that can be asked to provide the possible signatures that
 * the transformer can provide.
 */
export interface TransformationQuerryable {
  /**
   * Gets all the input types that have at least a transformation that returns
   * the provided type.
   * @param g the return type.
   * @returns all the storable types that can reach g
   */
  compatibleStorableTypes(g: GraphableType): Set<StorableType>;

  /**
   * Gets all the transformations identifier that have s as argument and g as
   * return type.
   * @param s The parameter type
   * @param g The return type
   * @returns All the transformer that have type s -> g
   */
  compatibleTransformers(s: StorableType, g: GraphableType): Set<TransformationIdentifier>;
}

/**
 * Represent a type that can provide a transformation by its signature
 */
export interface TransformationProvider {
  /**
   * Get a transformation by its signature
   * @param s the signature
   * @returns the corresponding transformation or undefined if it isn't found
   */
  get(s: TransformationSignature): Transformation | undefined;
}

export class Transformer
implements TransformationQuerryable, TransformationProvider {
  private static instance: Transformer | null = null;

  private constructor(
    private transformers: Map<GraphableType,
    Map<StorableType,
    Map<TransformationIdentifier,
    Transformation>>>,
  ) { }

  /**
   * Provide an empty transformer
   */
  static provideInstance(): Transformer {
    if (Transformer.instance === null) {
      Transformer.instance = new Transformer(new Map());
    }
    return Transformer.instance as Transformer;
  }

  /**
   * Add a transformation to the transformer
   * @param s it's signature
   * @param t it's implementation
   */
  add(s: TransformationSignature, t: Transformation) {
    if (!this.transformers.has(s.to)) {
      this.transformers.set(s.to, new Map());
    }

    const graphMap = this.transformers.get(s.to)!;
    if (!graphMap.has(s.from)) {
      graphMap.set(s.from, new Map());
    }

    const idMap = graphMap.get(s.from)!;
    idMap.set(s.identifier, t);
  }

  get(s: TransformationSignature): Transformation | undefined {
    return this.transformers.get(s.to)?.get(s.from)?.get(s.identifier);
  }

  compatibleStorableTypes(g: GraphableType): Set<StorableType> {
    const graphables = this.transformers.get(g);
    if (graphables === undefined) {
      return new Set();
    }
    return new Set(graphables.keys());
  }

  compatibleTransformers(s: StorableType, g: GraphableType): Set<TransformationIdentifier> {
    const graphables = this.transformers.get(g);
    if (graphables === undefined) {
      return new Set();
    }

    const storables = graphables.get(s);
    if (storables === undefined) {
      return new Set();
    }

    return new Set(storables.keys());
  }
}
