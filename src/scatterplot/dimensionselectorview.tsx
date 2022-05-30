/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import { FormEventHandler, useState } from 'react';
import { observer } from 'mobx-react';
import { TransformationSignature } from '../model/transformer';
import {
  ColorSelector, IntSelector, RealSelector, ShapeSelector,
}
  from './SPdimselectors';
import { SPDimensionSelectorVM } from './dimensionselectorvm';
import { StorableType } from '../model/datatypes';

export interface SPDimensionSelectorViewProp {
  viewmodel: SPDimensionSelectorVM
}

export const SPDimensionSelectorView = (prop: SPDimensionSelectorViewProp) => {
  const { viewmodel } = prop;

  const xMaps = viewmodel.mapX;
  const yMaps = viewmodel.mapY;
  const sizeMaps = viewmodel.mapSize;
  const shapeMaps = viewmodel.mapShape;
  const colorMaps = viewmodel.mapColor;

  /*   const xFieldsNames: string[] = Array.from(viewmodel.fieldX
    .forEach((val) => xFieldsNames.push(val[0]))!);
  const yFieldsNames: string[] = Array.from(viewmodel.fieldY
    .forEach((val) => xFieldsNames.push(val[0]))!);
  const sizeFieldsNames: string[] = Array.from(viewmodel.fieldX
    .forEach((val) => xFieldsNames.push(val[0]))!);
  const shapeFieldsNames: string[] = Array.from(viewmodel.fieldX
    .forEach((val) => xFieldsNames.push(val[0]))!);
  const colorFieldsNames: string[] = Array.from(viewmodel.fieldX
    .forEach((val) => xFieldsNames.push(val[0]))!); */

  const xFieldsNames = getNames(viewmodel.fieldX);
  const yFieldsNames = getNames(viewmodel.fieldY);
  const sizeFieldsNames = getNames(viewmodel.fieldSize);
  const shapeFieldsNames = getNames(viewmodel.fieldShape);
  const colorFieldsNames = getNames(viewmodel.fieldColor);

  function getNames(names: Set<[string, StorableType]>): string[] {
    const fields: string[] = [];
    names.forEach((val) => fields.push(val[0]));
    return fields;
  }

  const [xField, setXField] = useState<string>();
  const [yFields, setYField] = useState<string>();
  const [sizeField, setSizeField] = useState<string>();
  const [shapeField, setShapeField] = useState<string>();
  const [colorField, setColorField] = useState<string>();

  const [xMap, setXMap] = useState<TransformationSignature>();
  const [yMap, setYMap] = useState<TransformationSignature>();
  const [sizeMap, setSizeMap] = useState<TransformationSignature>();
  const [shapeMap, setShapeMap] = useState<TransformationSignature>();
  const [colorMap, setColorMap] = useState<TransformationSignature>();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    viewmodel.updateXAxisField(xField!);
    viewmodel.updateYAxisField(yFields!);
    viewmodel.updateSizeField(sizeField!);
    viewmodel.updateShapeField(shapeField!);
    viewmodel.updateColorField(colorField!);
    viewmodel.updateXAxisMap(xMap!);
    viewmodel.updateYAxisMap(yMap!);
    viewmodel.updateSizeMap(sizeMap!);
    viewmodel.updateShapeMap(shapeMap!);
    viewmodel.updateColorMap(colorMap!);
  };
  console.log(xField);
  console.log(xMap);
  return (
    <form className="dimensionSelector" onSubmit={onSubmit}>
      <div style={{ paddingBottom: 24 }}>
        <label htmlFor="xaxis" id="xaxis">X Axis:</label>
        <RealSelector
          name="axisx"
          set={{
            setField: setXField,
            setMap: setXMap,
          }}
          fields={xFieldsNames}
          maps={xMaps}
        />
      </div>
      <div style={{ paddingBottom: 24 }}>
        <label htmlFor="yaxis" id="yaxis">Y Axis:</label>
        <RealSelector
          name="axisy"
          set={{
            setField: setYField,
            setMap: setYMap,
          }}
          fields={yFieldsNames}
          maps={yMaps}
        />
      </div>
      <label htmlFor="size" id="size">Size:</label>
      <div style={{ paddingBottom: 24 }}>
        <IntSelector
          name="size"
          set={{
            setField: setSizeField,
            setMap: setSizeMap,
          }}
          fields={sizeFieldsNames}
          maps={sizeMaps}
        />
      </div>
      <label htmlFor="shape" id="shape">Shape:</label>
      <div style={{ paddingBottom: 24 }}>
        <ShapeSelector
          name="shape"
          set={{
            setField: setShapeField,
            setMap: setShapeMap,
          }}
          fields={shapeFieldsNames}
          maps={shapeMaps}
        />
      </div>
      <label htmlFor="color" id="color">Color:</label>
      <div style={{ paddingBottom: 24 }}>
        <ColorSelector
          name="color"
          set={{
            setField: setColorField,
            setMap: setColorMap,
          }}
          fields={colorFieldsNames}
          maps={colorMaps}
        />
      </div>
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
};
export default observer(SPDimensionSelectorView);
