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
  from './selectors';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <form className="dimensionSelector">
      <div>
        <label htmlFor="xaxis" id="xaxis">Asse X:</label>
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
          onNewMapSelection={
            (s: TransformationSignature) => viewmodel.updateXAxisMap(s)
          }
          onNewFieldSelection={(s: string) => {
            viewmodel.updateXAxisField(s);
            setXMap(viewmodel.currentXMap);
          }}
        />
      </div>
      <div>
        <label htmlFor="yaxis" id="yaxis">Asse Y:</label>
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
          onNewMapSelection={
            (s: TransformationSignature) => viewmodel.updateYAxisMap(s)
          }
          onNewFieldSelection={(s: string) => {
            viewmodel.updateYAxisField(s);
            setYMap(viewmodel.currentYMap);
          }}
        />
      </div>
      <label htmlFor="size" id="size">Grandezza:</label>
      <div>
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
          onNewMapSelection={
            (s: TransformationSignature) => viewmodel.updateSizeMap(s)
          }
          onNewFieldSelection={(s: string) => {
            viewmodel.updateSizeField(s);
            setSizeMap(viewmodel.currentSizeMap);
          }}
        />
      </div>
      <label htmlFor="shape" id="shape">Forma:</label>
      <div>
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
          onNewMapSelection={
            (s: TransformationSignature) => viewmodel.updateShapeMap(s)
          }
          onNewFieldSelection={(s: string) => {
            viewmodel.updateShapeField(s);
            setShapeMap(viewmodel.currentShapeMap);
          }}
        />
      </div>
      <label htmlFor="color" id="color">Colore:</label>
      <div>
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
          onNewMapSelection={
            (s: TransformationSignature) => viewmodel.updateColorMap(s)
          }
          onNewFieldSelection={(s: string) => {
            viewmodel.updateColorField(s);
            setColorMap(viewmodel.currentColorMap);
          }}
        />
      </div>
    </form>
  );
};
export default observer(SPDimensionSelectorView);
