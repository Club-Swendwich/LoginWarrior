/*import { DimensionSelector } from "../../genericview/dimensionselector";
import { DatasetSignature } from "../../model/dataset";
import { GraphableType, StorableType } from "../../model/datatypes";
import { TransformationQuerryable, TransformationSignature } from "../../model/transformer";
import { SKDimensions } from "./SKDimensions";

interface DimensionResult<T> {
    readonly layers: T;
}

export class SkDimensionSelector implements DimensionSelector<SKDimensions> {
    
    public constructor(
        private readonly queryable: TransformationQuerryable,
        private readonly signature: DatasetSignature,
        private readonly currentSelection: SKDimensions
    ) {}
    
    get selectedDimensions(): SKDimensions {
        return this.currentSelection;
    }

    public availableFields(): DimensionResult<Set<[string, StorableType]>> {
        return {
            layers: this.availableFieldsFor(GraphableType.Forwarder)
        };
    }

    private availableFieldsFor(type: GraphableType): Set<[string, StorableType]> {
        const _fileds = this.queryable.compatibleStorableTypes(type);
        return new Set(
            Array.from(this.signature).filter(([,t]) => _fileds.includes(t))
        ); 
    }

    public availableMappers(): DimensionResult<Set<TransformationSignature>> {
        return {
            layers: this.availableMappersFor(this.currentSelection.layers, GraphableType.Forwarder)
        };
    }

    private availableMappersFor(selectedField: Set<[StorableType, Forwarder]>, 
        toReach: GraphableType) : Set<TransformationSignature> {
        const field: Array<StorableType> = [];
        
        for (let tuple of selectedField)
            field.push(tuple[0]);
        
        if (field === undefined)
            throw new Error('Cannot find the selected field in the signature');

        const name = this.queryable.compatibleTransformers(field[0], toReach);
        const result: Set<TransformationSignature> = new Set();
        let i = 0;
        for (let currentName of name) {
            result.add({
                from: field[i],
                to: toReach,
                identifier: currentName
            });
            i++;
        }
        return result;
    }
}*/