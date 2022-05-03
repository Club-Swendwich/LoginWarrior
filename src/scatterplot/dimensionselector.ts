import { DimensionSelector } from '../genericview/dimensionselector';
import { DatasetSignature } from '../model/dataset';
import { GraphableType, StorableType } from '../model/datatypes';
import { TransformationQuerryable, TransformationSignature } from '../model/transformer';
import { SPDimensions } from './dimensions';

interface DimensionResult<T> {
  readonly x: T,
  readonly y: T,
  readonly size: T,
  readonly color: T,
  readonly shape: T
}

export class SPDimensionSelector implements DimensionSelector<SPDimensions> {
  public constructor(
    private readonly querryable: TransformationQuerryable,
    private readonly signature: DatasetSignature,
    private currentSelection: SPDimensions,
  ) { }

  public get selectedDimensions(): SPDimensions {
    return this.currentSelection;
  }

  public aviableFields(): DimensionResult<Set<[string, StorableType]>> {
    return {
      x: this.aviableFieldsFor(GraphableType.Real),
      y: this.aviableFieldsFor(GraphableType.Real),
      shape: this.aviableFieldsFor(GraphableType.Shape),
      color: this.aviableFieldsFor(GraphableType.Color),
      size: this.aviableFieldsFor(GraphableType.Int),
    };
  }

  private aviableFieldsFor(type: GraphableType): Set<[string, StorableType]> {
    const aviableFields = this.querryable
      .compatibleStorableTypes(type);
    return new Set(
      Array.from(this.signature)
        .filter(([, t]) => aviableFields.has(t)),
    );
  }

  public aviableMappers(): DimensionResult<Set<TransformationSignature>> {
    return {
      x: this.aviableMappersFor(this.currentSelection.x[0], GraphableType.Real),
      y: this.aviableMappersFor(this.currentSelection.y[0], GraphableType.Real),
      size: this.aviableMappersFor(this.currentSelection.size[0], GraphableType.Int),
      color: this.aviableMappersFor(this.currentSelection.color[0], GraphableType.Color),
      shape: this.aviableMappersFor(this.currentSelection.shape[0], GraphableType.Shape),
    };
  }

  private aviableMappersFor(selectedField: string, toReach: GraphableType):
  Set<TransformationSignature> {
    const fieldType = Array.from(this.signature)
      .find(([n]) => n === selectedField)![1];
    const name = this.querryable.compatibleTransformers(fieldType, toReach);
    return new Set(
      Array.from(name).map((name) => ({
        from: fieldType,
        to: toReach,
        identifier: name,
      })),
    );
  }
}
