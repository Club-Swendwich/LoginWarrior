import { FormEventHandler, useState } from 'react';
import { observer } from 'mobx-react';
import { TransformationSignature } from '../../model/transformer';
import { SKDimensionSelectorVM } from './SKdimensionselectorvm';
import { StorableType } from '../../model/datatypes';

export interface SPDimensionSelectorViewProp {
  viewmodel: SKDimensionSelectorVM
}

export const SKDimensionSelectorView = (prop: SPDimensionSelectorViewProp) => {
  const { viewmodel } = prop;

  //const xMaps = viewmodel.mapX;
  
  function getNames(names: Set<[string, StorableType]>): string[] {
    const fields: string[] = [];
    names.forEach((val) => fields.push(val[0]));
    return fields;
  }

  //const [xField, setXField] = useState<string>(viewmodel.currentXField);
  //Mettere colonne di field per ogni serie di nodi

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //Creare form dinamico (chiedere al model numero di nodi) 
    /*
    viewmodel.updateXAxisField(xField!);
    viewmodel.updateYAxisField(yField!);
    viewmodel.updateSizeField(sizeField!);
    viewmodel.updateShapeField(shapeField!);
    viewmodel.updateColorField(colorField!);
    viewmodel.updateXAxisMap(xMap!);
    viewmodel.updateYAxisMap(yMap!);
    viewmodel.updateSizeMap(sizeMap!);
    viewmodel.updateShapeMap(shapeMap!);
    viewmodel.updateColorMap(colorMap!);
    */
  };
  return (
    <form className="dimensionSelector" onSubmit={onSubmit}>
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
};
export default observer(SPDimensionSelectorView);
