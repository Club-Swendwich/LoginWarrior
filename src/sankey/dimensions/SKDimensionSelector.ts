import { DimensionSelector } from "../../genericview/dimensionselector";
import { DatasetSignature } from "../../model/dataset";
import { GraphableType, StorableType, SankeyLayer } from "../../model/datatypes";
import { TransformationQuerryable, TransformationSignature } from "../../model/transformer";
import { SKDimensions } from "./SKDimensions";


export class SkDimensionSelector implements DimensionSelector<SKDimensions> {

    public constructor(
        private readonly queryable: TransformationQuerryable,
        private readonly signature: DatasetSignature,
        private readonly currentSelection: SKDimensions
    ) { }

    /**
     * getter of current selection
     */
    get selectedDimensions(): SKDimensions {
        return this.currentSelection;
    }

    /**
     * Function that allows to search for available layers at a specified index
     * @param i index of the layer
     * @returns a set of TransformationSignature
     */
    public getAvailableLayersAtIndex(i: number): Set<TransformationSignature> {
        const field = Array.from(this.signature)
            .find(([n]) => n === this.currentSelection.layers[i][0]);

        if (field == undefined) {
            throw new Error('Cannot find the selected field in the signature');
        }

        const fieldType = field[1];
        const name = this.queryable.compatibleTransformers(fieldType, GraphableType.SankeyLayer);
        return new Set(
            Array.from(name).map((currentName) => ({
                identifier: currentName,
                from: fieldType,
                to: GraphableType.SankeyLayer
            }))
        );
    }

    /**
     * Function that allows to search for available fields at a specified index
     * @returns a set of [string, StorableType]
     */
    public getAvailableFieldsAtIndex(): Set<[string, StorableType]> {
        const compatibleStorables = this.queryable.compatibleStorableTypes(GraphableType.SankeyLayer);
        return new Set(
            Array.from(this.signature).filter(([, t]) => compatibleStorables.includes(t))
        );
    }

    /**
     * Getter of the layer number
     */
    get layerNumber(): number {
        return this.currentSelection.layers.length;
    }

    /**
     * Function that allows to obtain the SankeyLayer at a specified index
     * @param i index of the layer that we're searching for 
     * @returns the layer at index i
     */
    public getLayerAtIndex(i: number): TransformationSignature {
        return this.currentSelection.layers[i][1];
    }

    /**
     * Function that allows to set the SankeyLayer at a specified index
     * @param i index of the layer that we want to change
     * @param l the new layer
     */
    public setLayerAtIndex(i: number, l: TransformationSignature): void {
        this.currentSelection.layers[i][1] = l;
    }

    /**
     * Function that allows to set the field of a layer at a specified index 
     * and set the associated layer to the first compatible one.
     * @param i index of the layer 
     * @param s identifier of the field that we want to modify
     * @returns a coupple of [s, first compatible layer]
     */
    public setFieldAtIndex(i: number, s: string): [string, TransformationSignature] {
        this.currentSelection.layers[i][0] = s;
        const [compatible] = this.getAvailableLayersAtIndex(i);
        return [s, compatible];
    }

    /**
     * Function that allows to get the field of a layer at a specified index 
     * @param i index of the layer
     * @returns the field of the layer ad a specified index
     */
    public getFieldAtIndex(i: number): string {
        return this.currentSelection.layers[i][0];
    }
}