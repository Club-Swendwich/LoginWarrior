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
  Dataset, DatasetEntry, DatasetSignature,
} from '../model/dataset';
import {
  Transformer,
} from '../model/transformer';
import { SPDimensions } from './dimensions';
import { SPMapper } from './mapper';
import { MapperError } from '../genericview/mapper';

interface DataProp{
  readonly id: number,
  readonly timestamp: number,
  readonly loginOutcome: number,
  readonly application: string,
  readonly ip: string,
}

export interface SPViewComposerProps {
  datasetSignature: DatasetSignature,
  spDimensions: SPDimensions,
}

export const SPViewComposer = (
  prop: SPViewComposerProps,
) => {
  const ref = useRef<HTMLDivElement>(null);

  function hexToColor(hex: string): Color {
    const res = hex.match(/[a-f0-9]{2}/gi);
    const norm = res!.map((v) => parseInt(v, 16) / 255);
    const alpha = norm.length === 4 ? norm[3] : 1;
    return [norm[0], norm[1], norm[2], alpha];
  }

  const transformer: Transformer = Transformer.new();

  transformer.add({ identifier: 'id', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
  transformer.add({ identifier: 'id', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
  transformer.add({ identifier: 'id', from: StorableType.Int, to: GraphableType.Color }, (a: number) : any => hexToColor(a.toString(16)));
  transformer.add({ identifier: 'id', from: StorableType.Int, to: GraphableType.Shape }, (a: number) : any => 'star');
  transformer.add({ identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
  transformer.add({ identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
  transformer.add({ identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Color }, (a: number) : any => hexToColor(a.toString(16)));
  transformer.add({ identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Shape }, (a: number) : any => 'star');
  transformer.add({ identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Int }, (a: LoginType) : any => 1);
  transformer.add({ identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Real }, (a: LoginType) : any => 1);
  transformer.add({ identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Color }, (a: LoginType) : any => hexToColor(a.toString(16)));
  transformer.add({ identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Shape }, (a: LoginType) : any => 'star');
  transformer.add({ identifier: 'application', from: StorableType.String, to: GraphableType.Int }, (a: string) : any => 0);
  transformer.add({ identifier: 'application', from: StorableType.String, to: GraphableType.Real }, (a: string) : any => 0);
  transformer.add({ identifier: 'application', from: StorableType.String, to: GraphableType.Color }, (a: string) : any => hexToColor(a));
  transformer.add({ identifier: 'application', from: StorableType.String, to: GraphableType.Shape }, (a: string) : any => 'star');
  transformer.add({ identifier: 'ip', from: StorableType.String, to: GraphableType.Int }, (a: string) : any => parseInt(a.replace('.', ''), 10));
  transformer.add({ identifier: 'ip', from: StorableType.String, to: GraphableType.Real }, (a: string) : any => parseInt(a.replace('.', ''), 10));
  transformer.add({ identifier: 'ip', from: StorableType.String, to: GraphableType.Color }, (a: string) : any => hexToColor(a));
  transformer.add({ identifier: 'ip', from: StorableType.String, to: GraphableType.Shape }, (a: string) : any => 'star');

  const data: DataProp[] = [
    {
      id: 10,
      timestamp: 1593172218,
      loginOutcome: 2,
      application: 'ERM',
      ip: '2.228.10.106',
    },
    {
      id: 17,
      timestamp: 1604487370,
      loginOutcome: 2,
      application: 'ERM',
      ip: '62.108.225.252',
    },
    {
      id: 18,
      timestamp: 1615285386,
      loginOutcome: 2,
      application: 'ERM',
      ip: '62.108.225.150',
    },
    {
      id: 21,
      timestamp: 1618754885,
      loginOutcome: 3,
      application: 'ERM',
      ip: '62.108.225.252',
    },
    {
      id: 24,
      timestamp: 1618754984,
      loginOutcome: 2,
      application: 'ERM',
      ip: '62.108.225.79',
    },
    {
      id: 21,
      timestamp: 1618754986,
      loginOutcome: 1,
      application: 'HR1',
      ip: '',
    },
    {
      id: 21,
      timestamp: 1621757889,
      loginOutcome: 3,
      application: 'HRC',
      ip: '',
    },
    {
      id: 21,
      timestamp: 1623672848,
      loginOutcome: 1,
      application: 'HRW',
      ip: '',
    },
  ];

  const datasetentry: DatasetEntry[] = [
    new DatasetEntry(
      new Map([['id', { type: StorableType.Int, value: data[0].id }]]),
    ),
    new DatasetEntry(
      new Map([['timestamp', { type: StorableType.Int, value: data[0].timestamp }]]),
    ),
    new DatasetEntry(
      new Map([['loginOutcome', { type: StorableType.LoginType, value: data[0].loginOutcome }]]),
    ),
    new DatasetEntry(
      new Map([['application', { type: StorableType.String, value: data[0].application }]]),
    ),
    new DatasetEntry(
      new Map([['ip', { type: StorableType.String, value: data[0].ip }]]),
    ),
    new DatasetEntry(
      new Map([['id', { type: StorableType.Int, value: data[1].id }]]),
    ),
    new DatasetEntry(
      new Map([['timestamp', { type: StorableType.Int, value: data[1].timestamp }]]),
    ),
    new DatasetEntry(
      new Map([['loginOutcome', { type: StorableType.LoginType, value: data[1].loginOutcome }]]),
    ),
    new DatasetEntry(
      new Map([['application', { type: StorableType.String, value: data[1].application }]]),
    ),
    new DatasetEntry(
      new Map([['ip', { type: StorableType.String, value: data[1].ip }]]),
    ),
    new DatasetEntry(
      new Map([['id', { type: StorableType.Int, value: data[2].id }]]),
    ),
    new DatasetEntry(
      new Map([['timestamp', { type: StorableType.Int, value: data[2].timestamp }]]),
    ),
    new DatasetEntry(
      new Map([['loginOutcome', { type: StorableType.LoginType, value: data[2].loginOutcome }]]),
    ),
    new DatasetEntry(
      new Map([['application', { type: StorableType.String, value: data[2].application }]]),
    ),
    new DatasetEntry(
      new Map([['ip', { type: StorableType.String, value: data[2].ip }]]),
    ),
    new DatasetEntry(
      new Map([['id', { type: StorableType.Int, value: data[3].id }]]),
    ),
    new DatasetEntry(
      new Map([['timestamp', { type: StorableType.Int, value: data[3].timestamp }]]),
    ),
    new DatasetEntry(
      new Map([['loginOutcome', { type: StorableType.LoginType, value: data[3].loginOutcome }]]),
    ),
    new DatasetEntry(
      new Map([['application', { type: StorableType.String, value: data[3].application }]]),
    ),
    new DatasetEntry(
      new Map([['ip', { type: StorableType.String, value: data[3].ip }]]),
    ),
    new DatasetEntry(
      new Map([['id', { type: StorableType.Int, value: data[4].id }]]),
    ),
    new DatasetEntry(
      new Map([['timestamp', { type: StorableType.Int, value: data[4].timestamp }]]),
    ),
    new DatasetEntry(
      new Map([['loginOutcome', { type: StorableType.LoginType, value: data[4].loginOutcome }]]),
    ),
    new DatasetEntry(
      new Map([['application', { type: StorableType.String, value: data[4].application }]]),
    ),
    new DatasetEntry(
      new Map([['ip', { type: StorableType.String, value: data[4].ip }]]),
    ),

  ];

  const spMapper: SPMapper = new SPMapper(transformer, prop.spDimensions);

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
      prop.datasetSignature,
      prop.spDimensions,
    ),
  }), []);

  // eslint-disable-next-line max-len
  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [0, 15],
      domainY: [0, 20],
    }),
  }), []);

  function mapCheck(tmp: DatasetEntry[]) : SPREnderablePoint[] {
    let map: SPREnderablePoint[] = [];
    let maperror: MapperError;
    if (spMapper.map(new Dataset(tmp)) !== MapperError.UnknownField
    && spMapper.map(new Dataset(tmp)) !== MapperError.UnknownSignature) {
      map = spMapper.map(new Dataset(tmp)) as SPREnderablePoint[];
    } else {
      maperror = spMapper.map(new Dataset(tmp)) as MapperError;
    }

    return map;
  }

  // eslint-disable-next-line max-len
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderer = useMemo(
    () => new SPRenderer(mapCheck(datasetentry), renderSettingsVM.model.getSettings),
    [datasetentry, renderSettingsVM.model.getSettings],
  );

  useEffect(() => {
    if (ref !== null) {
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, [ref, renderer, renderSettingsVM.model.getSettings, datasetentry]);

  function reload(): void {
    document.getElementById('render')!.innerHTML = '';
    const renderernew = new SPRenderer(mapCheck(datasetentry), renderSettingsVM.model.getSettings);
    renderernew.render(ref as MutableRefObject<HTMLDivElement>);
  }

  return (
    <>
      <style>
        {`
              .renderArea {
                  height: 400px;
              }
          `}
      </style>
      {/* eslint-disable */}
        <div ref={ref} className="renderArea" id = "render"/>
        <SPDimensionSelectorView viewmodel={dimensionSelectorVM.model}></SPDimensionSelectorView>
        <SPRenderingSettingsView viewModel={renderSettingsVM.model}></SPRenderingSettingsView>
        <button onClick={reload}>
          Click to reload!
        </button>
      </>
  );
}

export default SPViewComposer