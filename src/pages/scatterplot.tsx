import React, {
  MutableRefObject, useEffect, useMemo, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Dataset } from '../model/dataset';
import { SPDimensionSelectorView } from '../scatterplot/dimensionselectorview';
import SPRenderingSettingsView from '../scatterplot/renderingsettingsview';
import SPRenderingSettingsSelectorVM from '../scatterplot/renderingsettingsvm';
import { SPDimensionSelectorVM } from '../scatterplot/dimensionselectorvm';
import { SPDimensionSelector } from '../scatterplot/dimensionselector';
import SPRenderingSettingsSelector from '../scatterplot/renderingsettings';
import { SPRenderer } from '../scatterplot/renderer';
import { SPMapper } from '../scatterplot/mapper';
import { MapperError } from '../genericview/mapper';
import { ScatterPlotView } from '../model/views';
import { Transformer } from '../model/transformer';

const NotPresentBox = (
  { dataset, settings } : { dataset: boolean, settings: boolean },
) => (
  <div className="infoBox">
    { dataset && <p className="msgFail">Non è stato caricato il dataset.</p>}
    { settings && <p className="msgFail">Non è stata caricata nessuna vista.</p>}
    <p className="msgInfo">
      <p>
        <Link className="link" to="/data">Carica</Link>
        { ' ' }
        i dati mancanti.
      </p>
    </p>
  </div>
);

enum CurrentStatus {
  Ok,
  NoField,
  NoMap,
  Waiting,
}

export interface ScatterplotSafeRenderProps {
  view: ScatterPlotView
  dataset: Dataset;
  updateView: (v: ScatterPlotView) => void;
}

const ScatterPlotSafeRender = (props: ScatterplotSafeRenderProps) => {
  const {
    view, dataset, updateView,
  } = props;

  const [status, setStatus] = useState(CurrentStatus.Waiting);
  const renderingAreaRef = useRef<HTMLDivElement>(null);
  const transformer = Transformer.provideInstance();

  const dimensionSelector = useMemo(
    () => new SPDimensionSelector(transformer, dataset.signature, view.dimensions),
    [dataset, transformer, view.dimensions],
  );

  const renderingSettingsSelector = useMemo(
    () => new SPRenderingSettingsSelector(view.settings),
    [view],
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
    () => new SPMapper(transformer, view.dimensions),
    [transformer, view],
  );

  useEffect(() => {
    const render = () => {
      const data = mapper.map(dataset);
      if (data === MapperError.UnknownField) {
        setStatus(CurrentStatus.NoField);
        return;
      }

      if (data === MapperError.UnknownSignature) {
        setStatus(CurrentStatus.NoMap);
        return;
      }
      const renderer = new SPRenderer(data, view.settings);
      setStatus(CurrentStatus.Ok);
      renderer.render(renderingAreaRef as MutableRefObject<HTMLDivElement>);
    };
    render();
  }, [dataset, mapper, view]);

  const onUpdate = () => {
    updateView({
      dimensions: dimensionSelector.selectedDimensions,
      settings: renderingSettingsSelector.selectedSettings,
    });
  };

  return (
    <div className="scatter">
      <div>
        <div ref={renderingAreaRef} className="renderArea" id="render" />
        { status === CurrentStatus.Ok
            && (
            <div className="settingsApplyArea">
              <div className="settingsArea">
                <SPDimensionSelectorView viewmodel={dimensionSelectorVM} />
                <SPRenderingSettingsView viewModel={renderSettingsVM} />
              </div>
              <div className="applyButton">
                <button type="button" onClick={onUpdate}>Aggiorna</button>
              </div>
            </div>
            )}
      </div>
      { (status === CurrentStatus.NoField) && (
      <div className="errC">
        <p className="msgFail">Uno dei campi richiesti non è presente nel dataset</p>
      </div>
      )}
      { (status === CurrentStatus.NoMap) && (
      <div className="errC">
        <p className="msgFail">Una delle funzioni di mapping richieste non è presente</p>
      </div>
      )}
    </div>
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
      view={views}
      dataset={dataset}
      updateView={updateViews}
    />
  );
};
