import { SPDimensions } from '../scatterplot/dimensions';
import SPRenderSettings from '../scatterplot/renderersettings';

export interface ScatterPlotView {
  settings: SPRenderSettings;
  dimensions: SPDimensions;
}
// FIXME: Insert the real views
export interface SankeyView {
  settings: any;
  dimensions: any;
}

export interface FullView {
  scatterplot: ScatterPlotView;
  sankey: SankeyView;
};
