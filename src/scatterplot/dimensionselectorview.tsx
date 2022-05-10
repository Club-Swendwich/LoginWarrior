/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import { Dispatch, FormEventHandler, useState } from 'react';
import { TransformationContext } from 'typescript';
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

  const xFields = spDimensionSelector.availableFields().x;
  const yFields = spDimensionSelector.availableFields().y;
  const shapeFields = spDimensionSelector.availableFields().shape;
  const sizeFields = spDimensionSelector.availableFields().size;
  const colorFields = spDimensionSelector.availableFields().color;

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
      />
      <label htmlFor="yaxis" id="yaxis">Y Axis:</label>
      <RealSelector
        name="axisy"
        selection={{
          set: setY,
          get: y,
        }}
      />
      <label htmlFor="size" id="size">Size:</label>
      <IntSelector
        name="size"
        selection={{
          set: setSize,
          get: size,
        }}
      />
      <label htmlFor="shape" id="shape">Shape:</label>
      <ShapeSelector
        name="shape"
        selection={{
          set: setShape,
          get: shape,
        }}
      />
      <label htmlFor="color" id="color">Color:</label>
      <ColorSelector
        name="color"
        selection={{
          set: setColor,
          get: color,
        }}
      />
      <input type="submit" value="Applica dimensioni" />
    </form>
  );
};
