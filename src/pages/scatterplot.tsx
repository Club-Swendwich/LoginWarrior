import React, {
  MutableRefObject, useEffect, useMemo, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Dataset } from '../model/dataset';
import { SPDimensions } from '../scatterplot/dimensions';
import { SPDimensionSelectorView } from '../scatterplot/dimensionselectorview';
import SPRenderingSettingsView from '../scatterplot/renderingsettingsview';
import SPRenderSettings from '../scatterplot/renderersettings';
import SPRenderingSettingsSelectorVM from '../scatterplot/renderingsettingsvm';
import { SPDimensionSelectorVM } from '../scatterplot/dimensionselectorvm';
import { SPDimensionSelector } from '../scatterplot/dimensionselector';
import { spTransformerInstance } from '../scatterplot/transformer';
import SPRenderingSettingsSelector from '../scatterplot/renderingsettings';
import { SPRenderer } from '../scatterplot/renderer';
import { SPMapper } from '../scatterplot/mapper';
import { MapperError } from '../genericview/mapper';
import { ScatterPlotView } from '../model/views';

const NotPresentBox = (
  { dataset, settings } : { dataset: boolean, settings: boolean },
) => (
  <div>
    <ul>
      { dataset && <li className="msgFail">Non è stato caricato il dataset.</li>}
      { settings && <li className="msgFail">Non è stata caricata nessuna vista.</li>}
    </ul>
    <p>
      <Link to="/data">Carica</Link>
      {' '}
      i dati mancanti
    </p>
  </div>
);

enum CurrentStatus {
  Ok,
  NoField,
  NoMap,
}

export interface ScatterplotSafeRenderProps {
  renderSettings: SPRenderSettings;
  dimensions: SPDimensions;
  dataset: Dataset;
  updateView: (v: ScatterPlotView) => void;
}

const ScatterPlotSafeRender = (props: ScatterplotSafeRenderProps) => {
  const {
    renderSettings, dimensions, dataset, updateView,
  } = props;

  const [status, setStatus] = useState(CurrentStatus.Ok);
  const renderingAreaRef = useRef<HTMLDivElement>(null);
  const transformer = spTransformerInstance();

  const dimensionSelector = useMemo(
    () => new SPDimensionSelector(transformer, dataset.signature, dimensions),
    [dataset, transformer, dimensions],
  );

  const renderingSettingsSelector = useMemo(
    () => new SPRenderingSettingsSelector(renderSettings),
    [renderSettings],
  );

  const dimensionSelectorVM = useMemo(
    () => new SPDimensionSelectorVM(dimensionSelector),
    [dimensionSelector],
  );

  const renderSettingsVM = useMemo(
    () => new SPRenderingSettingsSelectorVM(renderingSettingsSelector),
    [renderingSettingsSelector],
  );

  const mapper = useMemo(
    () => new SPMapper(transformer, dimensions),
    [transformer, dimensions],
  );

  useEffect(() => {
    const render = () => {
      setStatus(CurrentStatus.Ok);

      const data = mapper.map(dataset);
      if (data === MapperError.UnknownField) {
        setStatus(CurrentStatus.NoField);
        return;
      }

      if (data === MapperError.UnknownSignature) {
        setStatus(CurrentStatus.NoMap);
        return;
      }

      const renderer = new SPRenderer(data, renderSettings);
      renderer.render(renderingAreaRef as MutableRefObject<HTMLDivElement>);
    };
    render();
  }, [dataset, mapper, renderSettings]);

  const onUpdate = () => {
    updateView({
      dimensions: dimensionSelector.selectedDimensions,
      settings: renderingSettingsSelector.selectedSettings,
    });
  };

  return (
    <>
      { (status === CurrentStatus.Ok) && (
      <div>
        <div ref={renderingAreaRef} className="renderArea" id="render" />
        <div className="settingsApplyArea">
          <div className="settingsArea">
            <SPDimensionSelectorView viewmodel={dimensionSelectorVM} />
            <SPRenderingSettingsView viewModel={renderSettingsVM} />
          </div>
          <div className="applyButton">
            <button type="button" onClick={onUpdate}>Aggiorna</button>
          </div>
        </div>
      </div>
      ) }
      { (status === CurrentStatus.NoField) && <p className="msgFail">Uno dei campi richiesti non è presente nel dataset</p> }
      { (status === CurrentStatus.NoMap) && <p className="msgFail">Una delle funzioni di mapping richieste non è presente</p>}
    </>
  );
};

export interface ScatterplotPageProps {
  views: ScatterPlotView | null
  dataset: Dataset | null;
  updateViews: (v: ScatterPlotView) => void;
}

export const ScatterplotPage = (prop: ScatterplotPageProps) => {
  const {
    views, dataset, updateViews,
  } = prop;

  if (views === null || dataset === null) {
    return (
      <NotPresentBox
        settings={views === null}
        dataset={dataset === null}
      />
    );
  }

  return (
    <ScatterPlotSafeRender
      renderSettings={views.settings}
      dimensions={views.dimensions}
      dataset={dataset}
      updateView={updateViews}
    />
  );
};
