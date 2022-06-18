import React from 'react';
import { Dataset } from '../model/dataset';
import { SPDimensions } from '../scatterplot/dimensions';
import SPRenderSettings from '../scatterplot/renderersettings';

export interface ScatterplotPageProps {
  renderSettings: SPRenderSettings | null;
  dimensions: SPDimensions | null;
  dataset: Dataset | null;
  updateSettings: (s: SPRenderSettings) => void;
  updateDimensions: (d: SPDimensions) => void;
}

const NotPresentBox = (
  { dimensions, settings, dataset } : { dimensions: boolean, settings: boolean, dataset: boolean },
) => (
  <div>
    <ul>
      { dimensions && <li className="msgFail">Non sono state caricate delle dimensioni.</li>}
      { settings && <li className="msgFail">Non sono caricate delle impostazioni.</li>}
      { dataset && <li className="msgFail">Non è stato caricato il dataset.</li>}
    </ul>
    )
    <p>
      <a href="./data">Carica</a>
      {' '}
      i dati mancanti
    </p>
  </div>
);

export const ScatterplotPage = (prop: ScatterplotPageProps) => {
  const {
    renderSettings, dimensions, dataset, updateSettings, updateDimensions
  } = prop;

  if (renderSettings === null || dimensions === null || dimensions === null) {
    return (
      <NotPresentBox
        settings={renderSettings === null}
        dimensions={dimensions === null}
        dataset={dataset === null}
      />
    );
  }
};
