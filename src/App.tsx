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
import SPViewComposer from './scatterplot/spviewcomposer';

function App() {
  const ref = useRef<HTMLDivElement>(null);


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

function App(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    console.log("altezza impostata = " + InstanceSankeyRenderingSettingsSelectorVm.getHeight)
    const settings = useMemo(() => ({
      width: InstanceSankeyRenderingSettingsSelectorVm.getWidth,
      height: InstanceSankeyRenderingSettingsSelectorVm.getHeight,
      nodewidth: InstanceSankeyRenderingSettingsSelectorVm.getNodeWidth,
      opacity: InstanceSankeyRenderingSettingsSelectorVm.getOpacity
    }), []);
    console.log("Dico = " + settings.height);
    console.log("Dopo il costruttore = " + InstanceSankeyRenderingSettingsSelectorVm.getHeight);
 
  /*
  const datasetSignature: Set<[string, StorableType]> = new Set(
    [
      ['id', StorableType.Int],
      ['timestamp', StorableType.Int],
      ['loginOutcome', StorableType.LoginType],
      ['application', StorableType.String],
      ['ip', StorableType.String],
    ],
  );
  const spDimensions: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp', from: StorableType.Int, to: GraphableType.Real }],
    y: ['loginOutcome', { identifier: 'loginOutcome', from: StorableType.LoginType, to: GraphableType.Real }],
    size: ['application', { identifier: 'application', from: StorableType.String, to: GraphableType.Int }],
    shape: ['id', { identifier: 'id', from: StorableType.Int, to: GraphableType.Shape }],
    color: ['ip', { identifier: 'ip', from: StorableType.String, to: GraphableType.Color }],
  };
/*
    <>
      <div>hello world</div>
      <SPViewComposer datasetSignature={datasetSignature} spDimensions={spDimensions} />
*/
    function reload() {
      const datanew = ({
        nodes: [{
            nodeId: 0,
            name: "node0"
        }, {
            nodeId: 1,
            name: "node1"
        }, {
            nodeId: 2,
            name: "node2"
        }, {
            nodeId: 3,
            name: "node3"
        }, {
            nodeId: 4,
            name: "node4"
        }, {
            nodeId: 5,
            name: "node5"
        }],
          links: [{
            source: 0,
            target: 2,
            value: 2,
  
        }, {
            source: 1,
            target: 2,
            value: 2,
  
        }, {
            source: 1,
            target: 3,
            value: 2,
  
        }, {
            source: 0,
            target: 4,
            value: 2,
  
        }, {
            source: 2,
            target: 3,
            value: 2,
  
        }, {
            source: 2,
            target: 4,
            value: 2,
  
        }, {
            source: 3,
            target: 4,
            value: 4,
  
        }, {
            source: 5,
            target: 2,
            value: 10
        }]
        })

    const settingsnew = ({
      width: InstanceSankeyRenderingSettingsSelectorVm.getWidth,
      height: InstanceSankeyRenderingSettingsSelectorVm.getHeight,
      nodewidth: InstanceSankeyRenderingSettingsSelectorVm.getNodeWidth,
      opacity: InstanceSankeyRenderingSettingsSelectorVm.getOpacity
    });

    document.getElementById("render").innerHTML = "";
      const renderernew =  new SKRenderer(settingsnew, datanew);
      renderernew.render(ref as MutableRefObject<HTMLDivElement>)
      console.log("Fine render = " + InstanceSankeyRenderingSettingsSelectorVm.getHeight);
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
      <main className="text-gray-400 bg-gray-900 body-font">
      <div ref={ref} className="renderArea" id="render"/>
      <SankeyView viewModel={InstanceSankeyRenderingSettingsSelectorVm}/>
      <button onClick={reload}>
        Click to reload!
      </button>
      </main>
    </>
  );
}
export default App;
