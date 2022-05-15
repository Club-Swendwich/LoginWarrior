import { SPDimensions } from '../scatterplot/dimensions';
import { SPRenderSettings } from '../scatterplot/renderer';
import { Settings } from '../SankeyDiagram/renderer';
/**
 * The type of the view
 */
export enum GraphType {
  ScatterPlot = 0,
  SankeyDiagram,
}

/**
 * The data that the user insert to specify how the view will be arranges
 */
export type View
    = { type: GraphType.ScatterPlot, settings: SPRenderSettings, dimensions: SPDimensions }
    | { type: GraphType.SankeyDiagram, settings: Settings, dimensions: undefined };
