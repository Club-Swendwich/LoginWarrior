/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import {
  useEffect, useRef, MutableRefObject, useMemo,
} from 'react';
import {
  GraphableType, StorableType,
} from '../model/datatypes';
import { SPREnderablePoint, SPRenderer } from './renderer';
import SPRenderingSettingsSelectorVM from './renderingsettingsvm';
import SPRenderingSettingsView from './renderingsettingsview';
import { SPDimensionSelectorView } from './dimensionselectorview';
import { SPDimensionSelectorVM } from './dimensionselectorvm';
import {
  Dataset,
} from '../model/dataset';
import {
  Transformer,
} from '../model/transformer';
import { SPDimensions } from './dimensions';
import { SPMapper } from './mapper';
import { MapperError } from '../genericview/mapper';

export interface SPViewComposerProps {
  spDimensions: SPDimensions,
  dataset: Dataset
}

const transformer: Transformer = Transformer.new();

transformer.add({ identifier: 'int identity', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
transformer.add({ identifier: 'int identity', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
transformer.add({ identifier: 'int to color', from: StorableType.Int, to: GraphableType.Color }, () : any => [0.494, 0.905, 0.611, 1]);
transformer.add({ identifier: 'date to int', from: StorableType.Date, to: GraphableType.Int }, (a: Date) : any => a.getTime().toFixed(0));
transformer.add({ identifier: 'date to real', from: StorableType.Date, to: GraphableType.Real }, (a: Date) : any => a.getTime());
transformer.add({ identifier: 'event to color', from: StorableType.LoginType, to: GraphableType.Color }, () : any => [0.972, 0.486, 0.427, 1]);
transformer.add({ identifier: 'event to shape', from: StorableType.LoginType, to: GraphableType.Shape }, () : any => 'star');
transformer.add({ identifier: 'app to color', from: StorableType.String, to: GraphableType.Color }, () : any => [0.960, 0.925, 0.4, 1]);
transformer.add({ identifier: 'app to shape', from: StorableType.String, to: GraphableType.Shape }, () : any => 'square');
transformer.add({ identifier: 'ip to int', from: StorableType.Ip, to: GraphableType.Int }, (a: string) : any => parseInt(a.replace('ip_', ''), 10));
transformer.add({ identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }, (a: string) : any => parseInt(a.replace('ip_', ''), 10));
transformer.add({ identifier: 'ip to color', from: StorableType.Ip, to: GraphableType.Color }, () : any => [0.780, 0.4, 0.960, 1]);
transformer.add({ identifier: 'default', from: StorableType.Int, to: GraphableType.Int }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.Int, to: GraphableType.Real }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.Int, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
transformer.add({ identifier: 'default', from: StorableType.Int, to: GraphableType.Shape }, () : any => 'square');
transformer.add({ identifier: 'default', from: StorableType.Date, to: GraphableType.Int }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.Date, to: GraphableType.Real }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.Date, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
transformer.add({ identifier: 'default', from: StorableType.Date, to: GraphableType.Shape }, () : any => 'square');
transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Int }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Real }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Shape }, () : any => 'square');
transformer.add({ identifier: 'default', from: StorableType.String, to: GraphableType.Int }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.String, to: GraphableType.Real }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.String, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
transformer.add({ identifier: 'default', from: StorableType.String, to: GraphableType.Shape }, () : any => 'square');
transformer.add({ identifier: 'default', from: StorableType.Ip, to: GraphableType.Int }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.Ip, to: GraphableType.Real }, () : any => 1);
transformer.add({ identifier: 'default', from: StorableType.Ip, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
transformer.add({ identifier: 'default', from: StorableType.Ip, to: GraphableType.Shape }, () : any => 'square');

export const SPViewComposer = (
  prop : SPViewComposerProps,
) => {
  const { spDimensions, dataset } = prop;
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line max-len
  const spMapper: SPMapper = useMemo(() => new SPMapper(transformer, spDimensions), [spDimensions, transformer]);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SPDimensionSelectorVM(
      transformer,
      dataset.signature,
      spDimensions,
    ),
  }), [dataset, spDimensions, transformer]);

  // eslint-disable-next-line max-len
  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [1600651710000, 1625051710000],
      domainY: [0, 33000],
    }),
  }), []);

  // eslint-disable-next-line max-len
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.log('Render effect');
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, []);

  function reload(): void {
    document.getElementById('render')!.innerHTML = '';
    console.log('Render reload');
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
        <div style={{display: 'flex' ,flexDirection: 'row' ,justifyContent: 'space-evenly'}}>
          <div style={{display: 'inline-block'}}>
            <h2>Selezione dimensioni:</h2>
            <SPDimensionSelectorView viewmodel={dimensionSelectorVM.model}></SPDimensionSelectorView>
          </div>
          <div style={{display: 'inline-block'}}>
            <h2>Selezione dominio:</h2>
            <SPRenderingSettingsView viewModel={renderSettingsVM.model}></SPRenderingSettingsView>
            <button onClick={reload}>
              Click to reload!
            </button>
          </div>
        </div>
      </>
  );
}

export default SPViewComposer
