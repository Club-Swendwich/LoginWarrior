/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */

import React, {
  useEffect, useRef, MutableRefObject, useMemo,
} from 'react';
import { SPREnderablePoint, SPRenderer } from './renderer';
import SPRenderingSettingsSelectorVM from './renderingsettingsvm';
import SPRenderingSettingsView from './renderingsettingsview';
import { SPDimensionSelectorView } from './dimensionselectorview';
import { SPDimensionSelectorVM } from './dimensionselectorvm';
import {
  Dataset,
} from '../model/dataset';
import { SPDimensions } from './dimensions';
import { SPMapper } from './mapper';
import { MapperError } from '../genericview/mapper';
import { spTransformerInstance } from './transformer';

export interface SPViewComposerProps {
  spDimensions: SPDimensions,
  dataset: Dataset
}

const SPViewComposer = (
  prop : SPViewComposerProps,
) => {
  const { spDimensions, dataset } = prop;
  const ref = useRef<HTMLDivElement>(null);

  const transformer = spTransformerInstance();

  const spMapper: SPMapper = useMemo(() => new SPMapper(transformer, spDimensions), [spDimensions, transformer]);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SPDimensionSelectorVM(
      transformer,
      dataset.signature,
      spDimensions,
    ),
  }), [dataset, spDimensions, transformer]);

  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [1600651710000, 1625051710000],
      domainY: [0, 33000],
    }),
  }), []);

  const renderer = useMemo(
    () => {
      let dat: SPREnderablePoint[] = [];
      if (spMapper.map(dataset as Dataset) !== MapperError.UnknownField) {
        dat = spMapper.map(dataset as Dataset) as SPREnderablePoint[];
      }
      return new SPRenderer(
        dat,
        renderSettingsVM.model.getSettings,
      );
    },
    [renderSettingsVM.model.getSettings, spMapper, dataset],
  );

  useEffect(() => {
    if (ref !== null) {
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, [renderer]);

  function reload(): void {
    document.getElementById('render')!.innerHTML = '';
    spMapper.updateMapLogic(dimensionSelectorVM.model.currentSelection);
    const renderernew = new SPRenderer(spMapper.map(dataset as Dataset) as SPREnderablePoint[], renderSettingsVM.model.getSettings);
    renderernew.render(ref as MutableRefObject<HTMLDivElement>);
  }

  return (
    <>
      <h1>ScatterPlot</h1>
      <style>
        {`
              .renderArea {
                  height: 400px;
              }
          `}
      </style>
      {/* eslint-disable */}
        <div ref={ref} className="renderArea" id = "render"/>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <div style={{display: 'flex' ,flexDirection: 'row' ,justifyContent: 'space-evenly'}}>
            <div style={{display: 'inline-block'}}>
              <h2>Selezione dimensioni:</h2>
              <SPDimensionSelectorView viewmodel={dimensionSelectorVM.model}></SPDimensionSelectorView>
            </div>
            <div style={{display: 'inline-block'}}>
              <h2>Selezione dominio:</h2>
              <SPRenderingSettingsView viewModel={renderSettingsVM.model}></SPRenderingSettingsView>
            </div>
          </div>
          <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
            <button onClick={reload}>
              Click to reload!
            </button>
          </div>
        </div>
        
      </>
  );
}

export default SPViewComposer
