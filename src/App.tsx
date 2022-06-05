<<<<<<< HEAD
import React, {
  useState, useCallback,
=======
import {InstanceSankeyRenderingSettingsSelectorVm} from "./SankeyDiagram/viewModel/settingsSelectorView"
import { OutputList } from "./SankeyDiagram/viewModel/output"
import  SankeyViewSettings  from "./SankeyDiagram/viewModel/settingsSelectorView"
import SankeyView from "./SankeyDiagram/viewModel/SankeyView";
import ReactDOM from 'react-dom';
/* eslint-disable */
import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef
>>>>>>> 5a1ad307ec7d680d7d0ecb49d39b6bc1dee4292d
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
  GraphableType, StorableType,
} from './model/datatypes';
import { Dataset } from './model/dataset';
import { SPDimensions } from './scatterplot/dimensions';
import SPViewComposer from './scatterplot/spviewcomposer';
import { CSVDatasetParser } from './model/datasetloader';

<<<<<<< HEAD
function App() {
  const parser = new CSVDatasetParser(';');
=======

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

    const data = useMemo(() => ({
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
>>>>>>> 5a1ad307ec7d680d7d0ecb49d39b6bc1dee4292d

  const [dataset, setDataset] = useState<null | Dataset>(null);
  const [drag, setDrag] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
      // Do whatever you want with the file contents
        setDataset(parser.parse((reader.result as string).replace(/^[\r\n]+/gm, '')) as Dataset);
        setDrag(true);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

<<<<<<< HEAD
  const spDimensions: SPDimensions = {
    x: ['timestamp', { identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }],
    y: ['encodedIp', { identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }],
    size: ['userId', { identifier: 'default', from: StorableType.Int, to: GraphableType.Int }],
    shape: ['appId', { identifier: 'app to shape', from: StorableType.String, to: GraphableType.Shape }],
    color: ['eventType', { identifier: 'event to color', from: StorableType.LoginType, to: GraphableType.Color }],
  };
  if (drag === true) {
    if (dataset !== null) {
      return (
        <div className="app">
          <SPViewComposer spDimensions={spDimensions} dataset={dataset as Dataset} />
        </div>
      );
    }
    console.log('null');
    return (
      <div>
        Caricamento
      </div>
=======

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
>>>>>>> 5a1ad307ec7d680d7d0ecb49d39b6bc1dee4292d
    );
  }
  return (
    <div
      style={{
        display: 'flex', width: '100%', height: '150px', border: '1px dashed', justifyContent: 'center', alignItems: 'center',
      }}
      className="drag"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <h1>Clicca qui o trascina il file csv nel riquadro</h1>
    </div>
  );
}
<<<<<<< HEAD

export default App;
=======
export default App;
>>>>>>> 648e2aa4ee7cdabf751e0b5bbb89db9e82786654
