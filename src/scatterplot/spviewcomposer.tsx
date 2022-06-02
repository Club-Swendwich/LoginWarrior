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
  spDimensions: SPDimensions,
}

export const SPViewComposer = (
  prop : SPViewComposerProps,
) => {
  const { spDimensions } = prop;
  const ref = useRef<HTMLDivElement>(null);

  const transformer: Transformer = Transformer.new();

  transformer.add({ identifier: 'int identity', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
  transformer.add({ identifier: 'int identity', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
  transformer.add({ identifier: 'int to color', from: StorableType.Int, to: GraphableType.Color }, () : any => [0.494, 0.905, 0.611, 1]);
  transformer.add({ identifier: 'date to int', from: StorableType.Date, to: GraphableType.Int }, (a: Date) : any => a.getTime().toFixed(0));
  transformer.add({ identifier: 'date to real', from: StorableType.Date, to: GraphableType.Real }, (a: Date) : any => a.getTime());
  transformer.add({ identifier: 'event to color', from: StorableType.LoginType, to: GraphableType.Color }, () : any => [0.972, 0.486, 0.427, 1]);
  transformer.add({ identifier: 'event to shape', from: StorableType.LoginType, to: GraphableType.Shape }, () : any => 'star');
  transformer.add({ identifier: 'app to color', from: StorableType.String, to: GraphableType.Color }, () : any => [0.960, 0.925, 0.4, 1]);
  transformer.add({ identifier: 'app to shape', from: StorableType.String, to: GraphableType.Shape }, () : any => 'square');
  transformer.add({ identifier: 'ip to int', from: StorableType.Ip, to: GraphableType.Int }, (a: string) : any => parseInt(a.replace('ip_', ''), 10));
  transformer.add({ identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }, (a: string) : any => parseInt(a.replace('ip_', ''), 10));
  transformer.add({ identifier: 'ip to color', from: StorableType.Ip, to: GraphableType.Color }, () : any => [0.780, 0.4, 0.960, 1]);

  const pointcsv = '10;744598728;2020-06-15 14:19:45.000;2;ERM;erm3zs02;ip_2;"          ";"          ";zx2e87892e\n10;922713975;2020-11-04 10:56:10.000;2;ERM;erm3zs02;ip_3;"          ";"          ";ukmk56u3zv\n17;37103170;2021-03-09 09:34:01.000;2;ERM;erm3zs02;ip_4;"          ";"          ";x817ikmgsk\n17;84371471;2021-04-29 14:12:31.000;1;ERM;erm3zs02;ip_4;"006       ";vsvefmedzu;r2hhwyei0b\n17;199266238;2021-02-02 09:04:05.000;2;ERM;erm3zs02;ip_4;"          ";"          ";i8cfakl78n\n17;225652999;2021-02-02 09:04:05.000;1;ERM;erm3zs02;ip_4;"006       ";hlqffmgglu;c1wpq4r93s\n17;243769831;2021-03-09 10:23:06.000;1;ERM;erm3zs02;ip_4;"006       ";gqvayusnbd;vl7m9grrhb\n17;245702123;2021-03-04 11:06:45.000;1;ERM;erm3zs02;ip_4;"006       ";gzbsamehsm;jpr32wxbuw\n17;279198338;2021-04-29 14:12:31.000;2;ERM;erm3zs02;ip_4;"          ";"          ";lgbv6iuptf\n17;337103223;2021-03-09 09:34:01.000;1;ERM;erm3zs02;ip_4;"006       ";embuifusll;ffwiz208zg\n17;376457170;2021-03-09 10:23:06.000;2;ERM;erm3zs02;ip_4;"          ";"          ";obl0jk5vc8\n17;639611601;2021-03-04 11:06:45.000;2;ERM;erm3zs02;ip_4;"          ";"          ";osyf4acqg6\n17;675896707;2021-03-04 10:30:15.000;2;ERM;erm3zs02;ip_4;"          ";"          ";g1tjckbix5\n17;753664448;2021-03-04 15:49:20.000;2;ERM;erm3zs02;ip_4;"          ";"          ";e4k5fcvfwl\n17;761869196;2021-03-04 10:30:15.000;1;ERM;erm3zs02;ip_4;"006       ";xsekgselkd;ex3q81ab4p\n17;766604474;2021-04-01 15:23:30.000;1;ERM;erm3zs02;ip_4;"006       ";zxkitutmhn;w08d4p3ads\n17;799436489;2021-03-04 15:49:20.000;1;ERM;erm3zs02;ip_4;"006       ";tiendkgpae;vvpcsitz7u\n17;802221495;2021-04-01 15:23:30.000;2;ERM;erm3zs02;ip_4;"          ";"          ";s5pph8tat9\n17;846757338;2021-03-04 10:30:22.000;2;ERM;erm3zs02;ip_4;"          ";"          ";hm5rim4fdf\n';

  const parser = new CSVDatasetParser(';');

  const dataset = parser.parse(pointcsv) as Dataset;

  // eslint-disable-next-line max-len
  const spMapper: SPMapper = useMemo(() => new SPMapper(transformer, spDimensions), [spDimensions, transformer]);

  const dimensionSelectorVM = useMemo(() => ({
    model: new SPDimensionSelectorVM(
      transformer,
      dataset.signature,
      spDimensions,
    ),
  }), [dataset, spDimensions, transformer]);

  // eslint-disable-next-line max-len
  const renderSettingsVM = useMemo(() => ({
    model: new SPRenderingSettingsSelectorVM({
      domainX: [1591223585000, 1616278841000],
      domainY: [0, 65],
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

  function reload(): void {
    document.getElementById('render')!.innerHTML = '';
    spMapper.updateMapLogic(dimensionSelectorVM.model.currentSelection);
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