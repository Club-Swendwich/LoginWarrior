import { GraphData } from "react-force-graph-2d";
import { Mapper } from "../genericview/mapper";
import { Dataset, DatasetEntry } from "../model/dataset";
import { SankeyLayer } from "../model/datatypes";
import { TransformationProvider } from "../model/transformer";
import { SKDimensions } from "./Dimensions/SKDimensions";
import { SLink, SNode } from "./renderer";


export class SKMapper implements Mapper<SKDimensions, GraphData> {

    public constructor(
        private transformer: TransformationProvider,
        private dimensions: SKDimensions,
    ) { }

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

    /**
     * Function that cicle through layers and entries in order to create new links
     * setting their source and target attributes in the right way
     * @param d object rappresenting the dataset 
     * @returns an array of new created links
     */
    private createLinks(d: Dataset) : SLink[] {
        const links: SLink[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            d.entries().forEach(element => {
                const source_result = layer.map(element.get(layer[0]));
                const source_index: string = i + "," + this.transformer.get(layer[1]).outcomes.indexOf(source_result);

                let target_index = "";
                if (this.dimensions.layers[i + 1] != null) {
                    const target_result = this.dimensions.layers[i + 1].map(element.get(layer[0]));
                    target_index = (i + 1) + "," + this.transformer.get(this.dimensions.layers[i + 1][1]).outcomes.indexOf(target_result);
                }

                links.push({
                    source: source_index,
                    target: target_index,
                    value: 1 // devo capire bene che cosa mettere
                });
            });
        });

        return links;
    }

    /**
     * Function that cicles through layers and for every layer cicles through his outcomes
     * in order to generate for every outcome of every layer the corresponding nodes.
     * @returns an array of new created nodes
     */
    private createNodes() : SNode[] {
        const nodes: SNode[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            const result: SankeyLayer<any> = this.transformer.get(layer[1]);
            result.outcomes.forEach((element, j) => {
                nodes.push({
                    nodeId: "" + i + j,
                    name: `nodox`
                });
            });
        });
        return nodes;
    }
}