import React, {
  useEffect, useRef, MutableRefObject, useMemo, FormEventHandler,
} from 'react';
import {
  Color, GraphableType, Shape, StorableType,
} from '../model/datatypes';
import { SPRenderer } from './renderer';
import SPRenderingSettingsSelectorVM from './renderingsettingsvm';
import SPRenderingSettingsView from './renderingsettingsview';
import SPDimensionSelectorView from './dimensionselectorview';
import { SPDimensionSelectorVM } from './dimensionselectorvm';
import { DatasetSignature } from '../model/dataset';
import { TransformationSignature, TransformationQuerryable, TransformationProvider } from '../model/transformer';
import { SPDimensions } from './dimensions';
import { SPMapper } from './mapper';

interface DataProp{
  readonly id: number,
  readonly timestamp: number,
  readonly loginOutcome: number,
  readonly application: string,
  readonly ip: string,
}

type Transformation = (a: any) => any;

export default class SPViewComposer {
  ref: React.RefObject<HTMLDivElement>;

  spMapper: SPMapper;

  public constructor(
    readonly transformationProvider: TransformationProvider,
    // TODO set default transformation provider
    /* = {
      get(s: TransformationSignature): Transformation | undefined {return},
    } */
    readonly refDiv: MutableRefObject<HTMLDivElement> | null = null,
    readonly data: DataProp[] = [
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
    ],
    readonly datasetSignature: DatasetSignature = new Set(
      [
        ['id', StorableType.Int],
        ['timestamp', StorableType.Int],
        ['loginOutcome', StorableType.LoginType],
        ['application', StorableType.String],
        ['ip', StorableType.String],
      ],
    ),
    readonly spDimensions: SPDimensions = {
      x: ['timestamp', { identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Real }],
      y: ['loginOutcome', { identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Real }],
      size: ['application', { identifier: 'application', from: StorableType.String, to: GraphableType.Int }],
      shape: ['id', { identifier: 'id', from: StorableType.Int, to: GraphableType.Shape }],
      color: ['ip', { identifier: 'ip', from: StorableType.String, to: GraphableType.Color }],
    },
    readonly transformationQuerryable: TransformationQuerryable = {
      compatibleTransformers: () => new Set(['timestamp', 'loginOutcome', 'application', 'id', 'ip']),
      compatibleStorableTypes: (g) => {
        if (g === GraphableType.Int) {
          return new Set([StorableType.Int]);
        }
        return new Set();
      },
    },
  ) {
    this.ref = useRef<HTMLDivElement>(refDiv);

    transformationProvider = {
      get(s: TransformationSignature): Transformation | undefined { },
    };

    useEffect(() => {
      if (this.ref !== null) {
        this.renderer.render(this.ref as MutableRefObject<HTMLDivElement>);
      }
    }, [this.ref, this.renderer, this.renderSettingsVM.model.getSettings, this.points]);

    this.spMapper = new SPMapper(this.transformationProvider, this.spDimensions);
  }

  points = useMemo(() => [
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

  dimensionSelectorVM = useMemo(() => ({
    model: new SPDimensionSelectorVM(
      this.transformationQuerryable,
      this.datasetSignature,
      this.spDimensions,
    ),
  }), []);

  // eslint-disable-next-line max-len
  renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [0, 15],
      domainY: [0, 20],
    }),
  }), []);

  // eslint-disable-next-line max-len
  renderer = useMemo(() => new SPRenderer(this.points, this.renderSettingsVM.model.getSettings), [this.points, this.renderSettingsVM.model.getSettings]);

  /**
  * name
  */
  public reload(): void {
    document.getElementById('render').innerHTML = '';
    const renderernew = new SPRenderer(this.points, this.renderSettingsVM.model.getSettings);
    renderernew.render(this.ref as MutableRefObject<HTMLDivElement>);
  }

  public render(): any {
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
          <div ref={this.ref} className="renderArea" id = "render"/>
          <SPDimensionSelectorView viewmodel={}></SPDimensionSelectorView>
          <SPRenderingSettingsView viewModel={this.renderSettingsVM.model}></SPRenderingSettingsView>
          <button onClick={this.reload}>
            Click to reload!
          </button>
        </>
    );
  }
}