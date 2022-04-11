import { StorableType, GraphableType } from './datatypes';

type TransformationIdentifier = string;

type Transformation = (a: any) => any;

export interface TransformationSignature {
  identifier: TransformationIdentifier,
  from: StorableType,
  to: GraphableType
}

export interface TransformationQuerryable {
  compatibleStorableTypes(g: GraphableType): StorableType[];
  compatibleTransformers(s: StorableType, g: GraphableType): TransformationIdentifier[];
}

export interface TransformationProvider {
  get(s: TransformationSignature): Transformation | undefined;
}

export class Transformer
implements TransformationQuerryable, TransformationProvider {
  private constructor(
    private transformers: Map<GraphableType,
    Map<StorableType,
    Map<TransformationIdentifier,
    Transformation>>>,
  ) { }

  static new(): Transformer {
    return new Transformer(new Map());
  }

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

  compatibleStorableTypes(g: GraphableType): StorableType[] {
    const graphables = this.transformers.get(g);
    if (graphables === undefined) {
      return [];
    }
    return Array.from(graphables.keys());
  }

  compatibleTransformers(s: StorableType, g: GraphableType): TransformationIdentifier[] {
    const graphables = this.transformers.get(g);
    if (graphables === undefined) {
      return [];
    }

    const storables = graphables.get(s);
    if (storables === undefined) {
      return [];
    }

    return Array.from(storables.keys());
  }
}
