import { action, computed, observable } from 'mobx';
import { SPDimensionSelector } from './dimensionselector';
import { TransformationSignature } from '../model/transformer';
import { StorableType } from '../model/datatypes';

export class SPDimensionSelectorVM {
  constructor(
    @observable
    private readonly selector: SPDimensionSelector,
  ) { }

  @action updateXAxisField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.x[0] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateYAxisField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.y[0] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateSizeField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.size[0] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateColorField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.color[0] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateShapeField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.shape[0] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateXAxisMap(newField: TransformationSignature) {
    const selection = this.selector.selectedDimensions;
    selection.x[1] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateYAxisMap(newField: TransformationSignature) {
    const selection = this.selector.selectedDimensions;
    selection.y[1] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateSizeMap(newField: TransformationSignature) {
    const selection = this.selector.selectedDimensions;
    selection.size[1] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateColorMap(newField: TransformationSignature) {
    const selection = this.selector.selectedDimensions;
    selection.color[1] = newField;
    this.selector.selectedDimensions = selection;
  }

  @action updateShapeMap(newField: TransformationSignature) {
    const selection = this.selector.selectedDimensions;
    selection.shape[1] = newField;
    this.selector.selectedDimensions = selection;
  }

  @computed get fieldX(): Set<[string, StorableType]> {
    const fields = this.selector.availableFields();
    return fields.x;
  }

  @computed get fieldY(): Set<[string, StorableType]> {
    const fields = this.selector.availableFields();
    return fields.y;
  }

  @computed get fieldShape(): Set<[string, StorableType]> {
    const fields = this.selector.availableFields();
    return fields.shape;
  }

  @computed get fieldColor(): Set<[string, StorableType]> {
    const fields = this.selector.availableFields();
    return fields.color;
  }

  @computed get fieldSize(): Set<[string, StorableType]> {
    const fields = this.selector.availableFields();
    return fields.size;
  }

  @computed get mapX(): Set<TransformationSignature> {
    const fields = this.selector.availableMappers();
    return fields.x;
  }

  @computed get mapY(): Set<TransformationSignature> {
    const fields = this.selector.availableMappers();
    return fields.y;
  }

  @computed get mapSize(): Set<TransformationSignature> {
    const fields = this.selector.availableMappers();
    return fields.size;
  }

  @computed get mapShape(): Set<TransformationSignature> {
    const fields = this.selector.availableMappers();
    return fields.shape;
  }

  @computed get mapColor(): Set<TransformationSignature> {
    const fields = this.selector.availableMappers();
    return fields.color;
  }
}
