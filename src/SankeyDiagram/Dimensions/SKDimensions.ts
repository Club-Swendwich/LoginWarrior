import { TransformationSignature } from "../../model/transformer";


/**
 * interface that stores the Sankey Diagram dimensions
 */
export interface SKDimensions {
    layers: [string, TransformationSignature][];
}