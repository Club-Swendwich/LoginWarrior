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
                const source_result = layer.map(element);
                const source_index: string = i + "," +  layer.outcomes.indexOf(source_result);
                
                const target_index = "";
                if (this.dimensions.layers[i+1] != null) {
                    const target_result = this.dimensions.layers[i+1].map(element);
                    const target_index: string = (i+1) + "," + this.dimensions.layers[i+1].outcomes.indexOf(target_result); 
                }

                links.push({
                    source: source_index,
                    target: target_index,
                    value: 1 // devo capire bene che cazzo mettere
                });
            });
        });

        return links;
    }

    private createNodes() {
        const nodes: SNode[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            layer.outcomes.forEach((element, j) => {
                nodes.push({
                    nodeId: "" + i + j,
                    name: `${layer.layerTitle} ${i}`
                });        
            });
        });
        return nodes;
    }
}