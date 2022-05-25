import { SankeyLayer, StorableType } from "../../model/datatypes";

/**
 * interface that stores the Sankey Diagram dimensions
 */
export interface SKDimensions {
    layers: [string, SankeyLayer<any>][];
}