import React, {
  useEffect, useRef, MutableRefObject, useMemo, FormEventHandler,
} from 'react';
import {
  Color, GraphableType, Shape, StorableType,
} from './model/datatypes';
import { SPRenderer } from './scatterplot/renderer';
import SPRenderingSettingsSelectorVM from './scatterplot/renderingsettingsvm';
import SPRenderingSettingsView from './scatterplot/renderingsettingsview';
import SPDimensionSelectorView from './scatterplot/dimensionselectorview';
import { SPDimensionSelectorVM } from './scatterplot/dimensionselectorvm';
import { DatasetSignature } from './model/dataset';
import { TransformationSignature, TransformationQuerryable } from './model/transformer';
import { SPDimensions } from './scatterplot/dimensions';
import { SPMapper } from './scatterplot/mapper';

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const data = [
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

  const signature: DatasetSignature = new Set(
    [
      ['id', StorableType.Int],
      ['timestamp', StorableType.Int],
      ['loginOutcome', StorableType.LoginType],
      ['application', StorableType.String],
      ['ip', StorableType.String],
    ],
  );
  const selection: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Real }],
    y: ['loginOutcome', { identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Real }],
    size: ['application', { identifier: 'application', from: StorableType.String, to: GraphableType.Int }],
    shape: ['id', { identifier: 'id', from: StorableType.Int, to: GraphableType.Shape }],
    color: ['ip', { identifier: 'ip', from: StorableType.String, to: GraphableType.Color }],
  };

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

  const transformationQuerryable: TransformationQuerryable = {
    compatibleTransformers: () => new Set(['timestamp', 'loginOutcome', 'application', 'id', 'ip']),
    compatibleStorableTypes: (g) => {
      if (g === GraphableType.Int) {
        return new Set([StorableType.Int]);
      }
      return new Set();
    },
  };

  const transformationProvider: TransformationProvider = { get: {} };

  const dimensionSelectorVM = useMemo(() => ({
    model: new SPDimensionSelectorVM(
      transformationQuerryable,
      signature,
      selection,
    ),
  }), []);

  const spMapper: SPMapper = new SPMapper(transformationProvider, selection);

  // eslint-disable-next-line max-len
  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [0, 15],
      domainY: [0, 20],
    }),
  }), []);

  // eslint-disable-next-line max-len
  const renderer = useMemo(() => new SPRenderer(points, renderSettingsVM.model.getSettings), [points, renderSettingsVM.model.getSettings]);

  useEffect(() => {
    if (ref !== null) {
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, [ref, renderer, renderSettingsVM.model.getSettings, points]);

  function reload() {
    document.getElementById('render').innerHTML = '';
    const renderernew = new SPRenderer(points, renderSettingsVM.model.getSettings);
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
				<SPDimensionSelectorView viewmodel={}></SPDimensionSelectorView>
        <SPRenderingSettingsView viewModel={renderSettingsVM.model}></SPRenderingSettingsView>
        <button onClick={reload}>
          Click to reload!
        </button>
      </>
  );
  
  }
  
  export default App;