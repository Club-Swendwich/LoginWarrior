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
} from 'react';
import {
  SKRenderer
} from './SankeyDiagram/renderer'
import * as d3Sankey from 'd3-sankey';


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
      }), [])

    const renderer = useMemo(() => new SKRenderer(settings, data), [settings, data])
    useEffect(() => {
        if (ref !== null) 
          renderer.render(ref as MutableRefObject<HTMLDivElement>)
    }, [ref, renderer, settings, data])


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
