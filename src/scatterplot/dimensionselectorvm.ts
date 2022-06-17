import { action, computed, observable } from 'mobx';
import { SPDimensionSelector } from './dimensionselector';
import { TransformationSignature, TransformationQuerryable } from '../model/transformer';
import { StorableType } from '../model/datatypes';
import { SPDimensions } from './dimensions';
import { DatasetSignature } from '../model/dataset';

export class SPDimensionSelectorVM {
  @observable
  private selector: SPDimensionSelector;

  constructor(
    dimensionSelector: SPDimensionSelector
  ) {
    this.selector = dimensionSelector;
  }

  @computed get currentSelection() : SPDimensions {
    return this.selector.selectedDimensions;
  }

  @action updateXAxisField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.x[0] = newField;
    selection.x[1] = this.selector.availableMappers().x.values().next().value;
    this.selector.selectedDimensions = selection;
    this.selector.availableMappers();
  }

  @action updateYAxisField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.y[0] = newField;
    selection.y[1] = this.selector.availableMappers().y.values().next().value;
    if (selection.y[0] !== this.selector.selectedDimensions.y[0]) {
      this.selector.selectedDimensions = selection;
    }
    this.selector.availableMappers();
  }

  @action updateSizeField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.size[0] = newField;
    selection.size[1] = this.selector.availableMappers().size.values().next().value;
    this.selector.selectedDimensions = selection;
    this.selector.availableMappers();
  }

  @action updateColorField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.color[0] = newField;
    selection.color[1] = this.selector.availableMappers().color.values().next().value;
    this.selector.selectedDimensions = selection;
    this.selector.availableMappers();
  }

  @action updateShapeField(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.shape[0] = newField;
    selection.shape[1] = this.selector.availableMappers().shape.values().next().value;
    this.selector.selectedDimensions = selection;
    this.selector.availableMappers();
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

  @computed get currentXField(): string {
    return this.selector.selectedDimensions.x[0];
  }

  @computed get currentYField(): string {
    return this.selector.selectedDimensions.y[0];
  }

  @computed get currentSizeField(): string {
    return this.selector.selectedDimensions.size[0];
  }

  @computed get currentShapeField(): string {
    return this.selector.selectedDimensions.shape[0];
  }

  @computed get currentColorField(): string {
    return this.selector.selectedDimensions.color[0];
  }

  @computed get currentXMap(): TransformationSignature {
    return this.selector.selectedDimensions.x[1];
  }

  @computed get currentYMap(): TransformationSignature {
    return this.selector.selectedDimensions.y[1];
  }

  @computed get currentSizeMap(): TransformationSignature {
    return this.selector.selectedDimensions.size[1];
  }

  @computed get currentShapeMap(): TransformationSignature {
    return this.selector.selectedDimensions.shape[1];
  }

  @computed get currentColorMap(): TransformationSignature {
    return this.selector.selectedDimensions.color[1];
  }
}
