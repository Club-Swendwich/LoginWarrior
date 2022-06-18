import {
  useEffect, useRef, MutableRefObject, useMemo,
} from 'react';
import { timeStamp } from 'console';
import {
  GraphableType, LoginType, StorableType,
} from '../model/datatypes';

//RENDERER
import {
  SKRenderer, GraphData
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
import { SankeyLayer} from "../model/datatypes";


export interface SKViewComposerProps {
  skDimensions: SKDimensions,
  dataset: Dataset
}

export const SKViewComposer = (
  prop : SKViewComposerProps,
) => {
  const { skDimensions, dataset } = prop;
  const ref = useRef<HTMLDivElement>(null);
  console.log("Sono qui");
  const transformer: Transformer = Transformer.new();


  transformer.add({ identifier: 'loginType', from: StorableType.LoginType, to: GraphableType.SankeyLayer }, (a: LoginType) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });

  /*
  transformer.add({ identifier: 'userId', from: StorableType.Int, to: GraphableType.SankeyLayer }, (a: number) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [0, 1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });
  transformer.add({ identifier: 'eventType', from: StorableType.Int, to: GraphableType.SankeyLayer }, (a: number) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [0, 1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });
  transformer.add({ identifier: 'encodedIp', from: StorableType.Int, to: GraphableType.SankeyLayer }, (a: string) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [0, 1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });
  transformer.add({ identifier: 'appId', from: StorableType.Int, to: GraphableType.SankeyLayer }, (a: number) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [0, 1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });
  transformer.add({ identifier: 'default', from: StorableType.Int, to: GraphableType.SankeyLayer }, (a: number) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [0, 1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });
  

  transformer.add({ identifier: 'userId', from: StorableType.LoginType, to: GraphableType.SankeyLayer }, (a: ) : any => {
    const test: SankeyLayer<any> = {
      outcomes: [0, 1, 2, 3],
      map: (field: DatasetValue) => field.value
    }
    return test;
  });
  */

  console.log(transformer);

  // eslint-disable-next-line max-len
  const skMapper: SKMapper = useMemo(() => new SKMapper(transformer, skDimensions), [skDimensions, transformer]);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SKDimensionSelectorVM(
      transformer,
      dataset.signature,
      skDimensions,
    ),
  }), [dataset, skDimensions, transformer]);



  const renderer = useMemo(() => {
    let data = skMapper.map(dataset as Dataset) as GraphData;
    console.log("I settings adatti sono " + InstanceSankeyRenderingSettingsSelectorVm.getSettings);
    return new SKRenderer(
      InstanceSankeyRenderingSettingsSelectorVm.getSettings,
      data,      
    );
  },[InstanceSankeyRenderingSettingsSelectorVm.getSettings, skMapper, dataset]);
  /*
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
  */

  // eslint-disable-next-line max-len
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //const renderer = useMemo(() => new SKRenderer(settings, data), [settings, data])

  useEffect(() => {
    if (ref !== null) {
      console.log('Render effect');
      renderer.render(ref as MutableRefObject<HTMLDivElement>);
    }
  }, []);


  
  function reload(): void {
    /*
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
      }
      
    ]
      })*/

  const settingsnew = ({
    width: InstanceSankeyRenderingSettingsSelectorVm.getWidth,
    height: InstanceSankeyRenderingSettingsSelectorVm.getHeight,
    nodewidth: InstanceSankeyRenderingSettingsSelectorVm.getNodeWidth,
    opacity: InstanceSankeyRenderingSettingsSelectorVm.getOpacity
  });

    document.getElementById("render").innerHTML = "";
    skMapper.updateMapLogic(dimensionSelectorVM.model.currentSelection);
    const renderernew =  new SKRenderer(settingsnew, skMapper.map(dataset as Dataset) as GraphData);
    renderernew.render(ref as MutableRefObject<HTMLDivElement>)
    console.log("Fine render = " + InstanceSankeyRenderingSettingsSelectorVm.getHeight);
  }

  
  console.log('test ', skMapper.map(dataset as Dataset));

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


export default SKViewComposer
