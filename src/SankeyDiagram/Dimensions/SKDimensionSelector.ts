import { DimensionSelector } from "../../genericview/dimensionselector";
import { DatasetSignature } from "../../model/dataset";
import { GraphableType, StorableType, SankeyLayer, LoginType } from "../../model/datatypes";
import { TransformationQuerryable, TransformationProvider, TransformationSignature, Transformer } from "../../model/transformer";
import { SKDimensions } from "./SKDimensions";

export class SkDimensionSelector implements DimensionSelector<SKDimensions> {
    
    public constructor(
        private readonly queryable: TransformationQuerryable,
        private readonly signature: DatasetSignature,
        private readonly currentSelection: SKDimensions
    ) {}
    
    get selectedDimensions(): SKDimensions {
        return this.currentSelection;
    }
    
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
    
    get getAvailableFieldsAtIndex() : Set<[string, StorableType]> {
        const compatibleStorables = this.queryable.compatibleStorableTypes(GraphableType.SankeyLayer);
        return new Set(
            Array.from(this.signature).filter(([, t]) => compatibleStorables.includes(t))
        );
    }
    
    get layerNumber(): number {
        return this.currentSelection.layers.length;
    } 
    
    public getLayerAtIndex(i: number) : SankeyLayer<any>{
        return this.currentSelection.layers[i][1];
    }
    
    public setLayerAtIndex(i: number, l: SankeyLayer<any>) : void {
        this.currentSelection.layers[i][1] = l;
    }

    public setFieldAtIndex(i: number, s: string) : [string, TransformationSignature] {
        this.currentSelection.layers[i][0] = s;
        const [compatible] = this.getAvailableLayersAtIndex(i);
        return [s, compatible];
    }

    public getFieldAtIndex(i: number): string {
        return this.currentSelection.layers[i][0];
    }
}