/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import { Dispatch, FormEventHandler, useState } from 'react';
import { StorableType } from '../model/datatypes';
import { TransformationSignature } from '../model/transformer';
import { SPDimensions } from './dimensions';
import { DimensionResult, SPDimensionSelector } from './dimensionselector';
import {
  ColorSelector, IntSelector, RealSelector, ShapeSelector,
}
  from './SPdimselectors';

export interface SPDimensionSelectorViewProp {
  spDimensions: SPDimensions
  spDimensionSelector: SPDimensionSelector
  setDimensionSelection: Dispatch<DimensionResult<[string, TransformationSignature]>>
}

export const SPDimensionSelectorView = (prop: SPDimensionSelectorViewProp) => {
  const { spDimensions, spDimensionSelector, setDimensionSelection } = prop;

  spDimensionSelector.availableFields().x.forEach(getxNames);
  spDimensionSelector.availableFields().y.forEach(getyNames);
  spDimensionSelector.availableFields().shape.forEach(getsizeNames);
  spDimensionSelector.availableFields().size.forEach(getshapeNames);
  spDimensionSelector.availableFields().color.forEach(getcolorNames);

  spDimensionSelector.availableMappers().x.forEach(getxMaps);
  spDimensionSelector.availableMappers().y.forEach(getyMaps);
  spDimensionSelector.availableMappers().size.forEach(getsizeMaps);
  spDimensionSelector.availableMappers().shape.forEach(getshapeMaps);
  spDimensionSelector.availableMappers().color.forEach(getcolorMaps);

  let xNames: string[];
  let yNames: string[];
  let sizeNames: string[];
  let shapeNames: string[];
  let colorNames: string[];

  let xMaps: string[];
  let yMaps: string[];
  let sizeMaps: string[];
  let shapeMaps: string[];
  let colorMaps: string[];

  function getxNames(name: [string, StorableType]) {
    // eslint-disable-next-line prefer-destructuring
    xNames.push(name[0]);
  }
  function getyNames(name: [string, StorableType]) {
    // eslint-disable-next-line prefer-destructuring
    yNames.push(name[0]);
  }
  function getsizeNames(name: [string, StorableType]) {
    // eslint-disable-next-line prefer-destructuring
    sizeNames.push(name[0]);
  }
  function getshapeNames(name: [string, StorableType]) {
    // eslint-disable-next-line prefer-destructuring
    shapeNames.push(name[0]);
  }
  function getcolorNames(name: [string, StorableType]) {
    // eslint-disable-next-line prefer-destructuring
    colorNames.push(name[0]);
  }

  function getxMaps(name: TransformationSignature) {
    // eslint-disable-next-line prefer-destructuring
    xMaps.push(name.identifier);
  }
  function getyMaps(name: TransformationSignature) {
    // eslint-disable-next-line prefer-destructuring
    yMaps.push(name.identifier);
  }
  function getsizeMaps(name: TransformationSignature) {
    // eslint-disable-next-line prefer-destructuring
    sizeMaps.push(name.identifier);
  }
  function getshapeMaps(name: TransformationSignature) {
    // eslint-disable-next-line prefer-destructuring
    shapeMaps.push(name.identifier);
  }
  function getcolorMaps(name: TransformationSignature) {
    // eslint-disable-next-line prefer-destructuring
    colorMaps.push(name.identifier);
  }

  const [x, setX] = useState(spDimensions.x);
  const [y, setY] = useState(spDimensions.y);
  const [size, setSize] = useState(spDimensions.size);
  const [shape, setShape] = useState(spDimensions.shape);
  const [color, setColor] = useState(spDimensions.color);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setDimensionSelection({
      x,
      y,
      size,
      shape,
      color,
    });
  };

  return (
    <form className="dimensionSelector" onSubmit={onSubmit}>
      <label htmlFor="xaxis" id="xaxis">X Axis:</label>
      <RealSelector
        name="axisx"
        selection={{
          set: setX,
          get: x,
        }}
        fields={xNames}
      />
      <label htmlFor="yaxis" id="yaxis">Y Axis:</label>
      <RealSelector
        name="axisy"
        selection={{
          set: setY,
          get: y,
        }}
        fields={yFields}
      />
      <label htmlFor="size" id="size">Size:</label>
      <IntSelector
        name="size"
        selection={{
          set: setSize,
          get: size,
        }}
        fields={sizeFields}
      />
      <label htmlFor="shape" id="shape">Shape:</label>
      <ShapeSelector
        name="shape"
        selection={{
          set: setShape,
          get: shape,
        }}
        fields={shapeFields}
      />
      <label htmlFor="color" id="color">Color:</label>
      <ColorSelector
        name="color"
        selection={{
          set: setColor,
          get: color,
        }}
        fields={colorFields}
      />
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
};
