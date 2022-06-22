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
  const ref = useRef<HTMLDivElement | null>(null);
  console.log("Sono qui");
  const transformer: Transformer = Transformer.provideInstance();


  transformer.add(
    { identifier: 'loginType', from: StorableType.LoginType, to: GraphableType.SankeyLayer },
    { outcomes: [LoginType.LoginSuccess, LoginType.LoginFail, LoginType.Logout],
      map: (field: DatasetValue) =>  {
        return field.value;
      } }
  );

  transformer.add(
    { identifier: 'default', from: StorableType.Int, to: GraphableType.SankeyLayer },
    { outcomes: ["HRW",
  "ERM",
  "GTL",
  "HRC",
  "HR1",
  "HRM",
  "HUT",
  "DWH",
  "HTR",
  "GAW",
  "HSP",
  "TM3",
  "HCF",
  "MD7"], map: (field: DatasetValue) => {
      return field.value;} }
  );

  console.log(skDimensions.layers , transformer);
  // eslint-disable-next-line max-len
  //const skMapper: SKMapper = useMemo(() => new SKMapper(transformer, skDimensions), [skDimensions, transformer]);
  const skMapper: SKMapper = new SKMapper(transformer, skDimensions);

  console.log(skMapper);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SKDimensionSelectorVM(
      transformer,
      dataset.signature,
      skDimensions,
    ),
  }), [dataset, skDimensions, transformer]);

  const settings = ({
    width: InstanceSankeyRenderingSettingsSelectorVm.getWidth,
    height: InstanceSankeyRenderingSettingsSelectorVm.getHeight,
    nodewidth: InstanceSankeyRenderingSettingsSelectorVm.getNodeWidth,
    opacity: InstanceSankeyRenderingSettingsSelectorVm.getOpacity
  });

  const renderer = useMemo(() => {
    //console.log(skMapper.map(dataset));
    let data = skMapper.map(dataset as Dataset) as GraphData; // Questo va in errore
    console.log("datamapped", data);
    console.log("I settings adatti sono " + InstanceSankeyRenderingSettingsSelectorVm.getSettings.height);
    return new SKRenderer(
      InstanceSankeyRenderingSettingsSelectorVm.getSettings,
      data,
    );
  },[settings, skMapper, dataset]);

  /**
   * [1, 2, 3, 4]
   * - - -- - - -
   * f(d) -> x ??? nodo
   */

  function reload(): void {
    console.log("stuff");
    document.getElementById("render").innerHTML = "";
    skMapper.updateMapLogic(dimensionSelectorVM.model.currentSelection);
    const mapped = skMapper.map(dataset as Dataset) as GraphData;
    console.log("mapped", mapped);
    const renderernew =  new SKRenderer(InstanceSankeyRenderingSettingsSelectorVm.getSettings, mapped);
    renderernew.render(ref as MutableRefObject<HTMLDivElement>)
  }

    useEffect(() => {
      console.log("hook render");
      if(ref !== null) {
        console.log('Render effect');
        console.log("render ref", ref);
        renderer.render(ref as MutableRefObject<HTMLDivElement>);
      }
    }, [ref, console, renderer, this]);

  //console.log('test ', skMapper.map(dataset as Dataset));

  return (
    <>

      {/* eslint-disable */}
      <main className="text-gray-400 bg-gray-900 body-font">
      <div ref={ref} className="renderArea" id="render"/>
      <SankeyView viewModel={InstanceSankeyRenderingSettingsSelectorVm}/>
      <button className="applyButton" onClick={reload}>
        Click to reload!
      </button>
      </main>
    </>
    );
}


export default SKViewComposer
