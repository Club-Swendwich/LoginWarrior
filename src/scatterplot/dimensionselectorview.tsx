/* eslint-disable max-len */
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

  const [xField, setXField] = useState<string>(viewmodel.currentXField);
  const [yField, setYField] = useState<string>(viewmodel.currentYField);
  const [sizeField, setSizeField] = useState<string>(viewmodel.currentSizeField);
  const [shapeField, setShapeField] = useState<string>(viewmodel.currentShapeField);
  const [colorField, setColorField] = useState<string>(viewmodel.currentColorField);

  const [xMap, setXMap] = useState<TransformationSignature>(viewmodel.currentXMap);
  const [yMap, setYMap] = useState<TransformationSignature>(viewmodel.currentYMap);
  const [sizeMap, setSizeMap] = useState<TransformationSignature>(viewmodel.currentSizeMap);
  const [shapeMap, setShapeMap] = useState<TransformationSignature>(viewmodel.currentShapeMap);
  const [colorMap, setColorMap] = useState<TransformationSignature>(viewmodel.currentColorMap);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
  };
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
          defaultField={xField}
          defaultMap={xMap}
          fields={xFieldsNames}
          maps={xMaps}
          onNewSelection={(s: string) => {
            viewmodel.updateXAxisField(s);
            setXMap(viewmodel.currentXMap);
          }}
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
          defaultField={yField}
          defaultMap={yMap}
          fields={yFieldsNames}
          maps={yMaps}
          onNewSelection={(s: string) => {
            viewmodel.updateYAxisField(s);
            setYMap(viewmodel.currentYMap);
          }}
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
          defaultField={sizeField}
          defaultMap={sizeMap}
          fields={sizeFieldsNames}
          maps={sizeMaps}
          onNewSelection={(s: string) => {
            viewmodel.updateSizeField(s);
            setSizeMap(viewmodel.currentSizeMap);
          }}
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
          defaultField={shapeField}
          defaultMap={shapeMap}
          fields={shapeFieldsNames}
          maps={shapeMaps}
          onNewSelection={(s: string) => {
            viewmodel.updateShapeField(s);
            setShapeMap(viewmodel.currentShapeMap);
          }}
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
          defaultField={colorField}
          defaultMap={colorMap}
          fields={colorFieldsNames}
          maps={colorMaps}
          onNewSelection={(s: string) => {
            viewmodel.updateColorField(s);
            setColorMap(viewmodel.currentColorMap);
          }}
        />
      </div>
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
};
export default observer(SPDimensionSelectorView);
