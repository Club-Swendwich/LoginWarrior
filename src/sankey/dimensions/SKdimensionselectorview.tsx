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
  };
  return (
    <form className="dimensionSelectorSK" onSubmit={onSubmit}>
      <label htmlFor= "assegnazione">Assegnazione</label>
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
};
export default observer(SKDimensionSelectorView);
