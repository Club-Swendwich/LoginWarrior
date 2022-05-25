import { GraphData } from "react-force-graph-2d";
import { Mapper } from "../genericview/mapper";
import { Dataset, DatasetEntry } from "../model/dataset";
import { TransformationProvider } from "../model/transformer";
import { SKDimensions } from "./Dimensions/SKDimensions";
import { SLink, SNode } from "./renderer";



export class SKMapper implements Mapper<SKDimensions, GraphData> {
    public constructor(
        private transformer: TransformationProvider,
        private dimensions: SKDimensions,
    ) {}
    
    updateMapLogic(ml: SKDimensions): void {
        this.dimensions = ml;
    }
    
    map(d: Dataset): GraphData {
        const _nodes = this.createNodes();
        const _links = this.createLinks(d);

        return {
            nodes: _nodes,
            links: _links
        };
    }

    private createLinks(d : Dataset) {
        const links: SLink[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            d.entries().forEach(element => {
                const source_result = layer[1].map(element.get(layer[0]));
                const source_index: string = i + "," +  layer[1].outcomes.indexOf(source_result);
                
                let target_index = "";
                if (this.dimensions.layers[i+1] != null) {
                    const target_result = this.dimensions.layers[i+1][1].map(element.get(this.dimensions.layers[i+1][0]));
                    target_index = (i+1) + "," + this.dimensions.layers[i+1][1].outcomes.indexOf(target_result); 
                }

                links.push({
                    source: source_index,
                    target: target_index,
                    value: 1 // TODO: quale valore devo inserire?
                });
            });
        });

        return links;
    }

    private createNodes() {
        const nodes: SNode[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            layer[1].outcomes.forEach((element, j) => {
                nodes.push({
                    nodeId: "" + i + j,
                    name: `nodoX`
                });        
            });
        });
        return nodes;
    }
}