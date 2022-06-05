import {
  useEffect, useRef, MutableRefObject, useMemo,
} from 'react';
import { timeStamp } from 'console';
import {
  GraphableType, StorableType,
} from '../model/datatypes';
//RENDERER
import {
  SKRenderer
} from './renderer'
import * as d3Sankey from 'd3-sankey';

//VIEW  
import {InstanceSankeyRenderingSettingsSelectorVm} from "./viewModel/settingsSelectorView"
import  SankeyViewSettings  from "./viewModel/settingsSelectorView"
import SankeyView from "./viewModel/SankeyView";

//DIMENSION
import { SKDimensionSelectorView } from './dimensions/SKdimensionselectorview';
import { SKDimensionSelectorVM } from './dimensions/SKdimensionselectorvm';
import {
  Dataset, DatasetEntry, DatasetValue,
} from '../model/dataset';
import {
  Transformer,
} from '../model/transformer';
import { SKDimensions } from './dimensions/SKDimensions';
import { SKMapper } from './mapper';
import { MapperError } from '../genericview/mapper';




export interface SPViewComposerProps {
  spDimensions: SKDimensions,
  dataset: Dataset
}

export const SPViewComposer = (
  prop : SPViewComposerProps,
) => {
  const { spDimensions, dataset } = prop;
  const ref = useRef<HTMLDivElement>(null);

  const transformer: Transformer = Transformer.new();

  // eslint-disable-next-line max-len
  const spMapper: SKMapper = useMemo(() => new SKMapper(transformer, spDimensions), [spDimensions, transformer]);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SKDimensionSelectorVM(
      transformer,
      dataset.signature,
      spDimensions,
    ),
  }), [dataset, spDimensions, transformer]);

  // eslint-disable-next-line max-len
  const settings = useMemo(() => ({
    width: InstanceSankeyRenderingSettingsSelectorVm.getWidth,
    height: InstanceSankeyRenderingSettingsSelectorVm.getHeight,
    nodewidth: InstanceSankeyRenderingSettingsSelectorVm.getNodeWidth,
    opacity: InstanceSankeyRenderingSettingsSelectorVm.getOpacity
  }), []);

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
  // eslint-disable-next-line max-len
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderer = useMemo(() => new SKRenderer(settings, data), [settings, data])
  useEffect(() => {
      if (ref !== null) 
        renderer.render(ref as MutableRefObject<HTMLDivElement>)
  }, [ref, renderer, settings, data])

  useEffect(() => {
    if (ref !== null) {
      console.log('Render effect');
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, []);


  
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


export default SPViewComposer
