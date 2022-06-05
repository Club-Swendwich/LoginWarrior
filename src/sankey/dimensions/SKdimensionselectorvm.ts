import { action, computed, observable } from 'mobx';
import { SkDimensionSelector } from './SKDimensionSelector';
import { TransformationSignature, TransformationQuerryable } from '../model/transformer';
import { SKDimensions } from './SKDimensions';
import { DatasetSignature } from '../../model/dataset';

export class SPDimensionSelectorVM {
  @observable
  private selector: SkDimensionSelector;

  constructor(
    queryable: TransformationQuerryable,
    signature: DatasetSignature,
    currentSelection: SKDimensions,
  ) {
    this.selector = new SkDimensionSelector(
      queryable,
      signature,
      currentSelection,
    );
  }

  @computed get currentSelection() : SKDimensions {
    return this.selector.selectedDimensions;
  }

  @action updateLayers(newField: string) {
    const selection = this.selector.selectedDimensions;
    selection.layers[0][0] = newField;
    console.log("The current selection is " + selection.layers[0]);
  }

}
