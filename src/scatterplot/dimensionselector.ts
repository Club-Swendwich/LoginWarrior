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
    private readonly queryable: TransformationQuerryable,
    private readonly signature: DatasetSignature,
    private currentSelection: SPDimensions,
  ) { }

  public get selectedDimensions(): SPDimensions {
    return this.currentSelection;
  }

  public availableFields(): DimensionResult<Set<[string, StorableType]>> {
    return {
      x: this.availableFieldsFor(GraphableType.Real),
      y: this.availableFieldsFor(GraphableType.Real),
      shape: this.availableFieldsFor(GraphableType.Shape),
      color: this.availableFieldsFor(GraphableType.Color),
      size: this.availableFieldsFor(GraphableType.Int),
    };
  }

  private availableFieldsFor(type: GraphableType): Set<[string, StorableType]> {
    const availableFields = this.queryable
      .compatibleStorableTypes(type);
    return new Set(
      Array.from(this.signature)
        .filter(([, t]) => availableFields.has(t)),
    );
  }

  public availableMappers(): DimensionResult<Set<TransformationSignature>> {
    return {
      x: this.availableMappersFor(this.currentSelection.x[0], GraphableType.Real),
      y: this.availableMappersFor(this.currentSelection.y[0], GraphableType.Real),
      size: this.availableMappersFor(this.currentSelection.size[0], GraphableType.Int),
      color: this.availableMappersFor(this.currentSelection.color[0], GraphableType.Color),
      shape: this.availableMappersFor(this.currentSelection.shape[0], GraphableType.Shape),
    };
  }

  private availableMappersFor(selectedField: string, toReach: GraphableType):
  Set<TransformationSignature> {
    const fieldType = Array.from(this.signature)
      .find(([n]) => n === selectedField)![1];
    const name = this.queryable.compatibleTransformers(fieldType, toReach);
    return new Set(
      Array.from(name).map((name) => ({
        from: fieldType,
        to: toReach,
        identifier: name,
      })),
    );
  }
}
