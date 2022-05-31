/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import {
  useEffect, useRef, MutableRefObject, useMemo, ReactElement,
} from 'react';
import {
  Color, GraphableType, LoginType, Shape, StorableType,
} from '../model/datatypes';
import { SPREnderablePoint, SPRenderer } from './renderer';
import SPRenderingSettingsSelectorVM from './renderingsettingsvm';
import SPRenderingSettingsView from './renderingsettingsview';
import { SPDimensionSelectorView } from './dimensionselectorview';
import { SPDimensionSelectorVM } from './dimensionselectorvm';
import {
  Dataset, DatasetSignature,
} from '../model/dataset';
import {
  Transformer,
} from '../model/transformer';
import { SPDimensions } from './dimensions';
import { SPMapper } from './mapper';
import { MapperError } from '../genericview/mapper';
import { CSVDatasetParser } from '../model/datasetloader';

export interface SPViewComposerProps {
  datasetSignature: DatasetSignature,
  spDimensions: SPDimensions,
}

export const SPViewComposer = (
  prop : SPViewComposerProps,
) => {
  const { datasetSignature, spDimensions } = prop;
  const ref = useRef<HTMLDivElement>(null);

  const transformer: Transformer = Transformer.new();

  transformer.add({ identifier: 'identity', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
  transformer.add({ identifier: 'userId', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
  transformer.add({ identifier: 'userId', from: StorableType.Int, to: GraphableType.Color }, () : any => [0.494, 0.905, 0.611, 1]);
  transformer.add({ identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
  transformer.add({ identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
  transformer.add({ identifier: 'eventType', from: StorableType.LoginType, to: GraphableType.Color }, () : any => [0.972, 0.486, 0.427, 1]);
  transformer.add({ identifier: 'eventType', from: StorableType.LoginType, to: GraphableType.Shape }, () : any => 'star');
  transformer.add({ identifier: 'appId', from: StorableType.String, to: GraphableType.Color }, () : any => [0.960, 0.925, 0.4, 1]);
  transformer.add({ identifier: 'appId', from: StorableType.String, to: GraphableType.Shape }, () : any => 'square');
  transformer.add({ identifier: 'encodedIp', from: StorableType.String, to: GraphableType.Int }, (a: string) : any => parseInt(a.replace('.', ''), 10));
  transformer.add({ identifier: 'encodedIp', from: StorableType.String, to: GraphableType.Real }, (a: string) : any => parseInt(a.replace('.', ''), 10));
  transformer.add({ identifier: 'encodedIp', from: StorableType.String, to: GraphableType.Color }, () : any => [0.780, 0.4, 0.960, 1]);

  const pointcsv = '10;744598728;2020-06-15 14:19:45.000;2;ERM;erm3zs02;2.36.88.14;\n10;922713975;2020-11-04 10:56:10.000;2;ERM;erm3zs02;2.228.10.106;\n17;37103170;2021-03-09 09:34:01.000;2;ERM;erm3zs02;62.108.225.252;';

  const parser = new CSVDatasetParser(';');

  const dataset = parser.parse(pointcsv);

  console.log('dataset: ', dataset);

  // eslint-disable-next-line max-len
  const spMapper: SPMapper = useMemo(() => new SPMapper(transformer, spDimensions), [spDimensions, transformer]);

  const points = useMemo(() => [
    {
      x: 5,
      y: 5,
      size: 1000,
      shape: 'star' as Shape,
      color: [1, 0.5, 1, 1] as Color,
    },
    {
      x: 7,
      y: 7,
      size: 1000,
      shape: 'square' as Shape,
      color: [1, 0.5, 1, 1] as Color,
    },
    {
      x: 4,
      y: 3,
      size: 1000,
      shape: 'triangle' as Shape,
      color: [0.6, 0.4, 1, 1] as Color,
    },
    {
      x: 4,
      y: 8,
      size: 500,
      shape: 'triangle' as Shape,
      color: [1, 0.5, 1, 1] as Color,
    },
  ], []);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SPDimensionSelectorVM(
      transformer,
      datasetSignature,
      spDimensions,
    ),
  }), [datasetSignature, spDimensions, transformer]);

  // eslint-disable-next-line max-len
  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [0, 15],
      domainY: [0, 20],
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
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, [ref, renderer, renderSettingsVM.model.getSettings]);

  console.log('points: ', spMapper.map(dataset as Dataset));
  function reload(): void {
    document.getElementById('render')!.innerHTML = '';
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