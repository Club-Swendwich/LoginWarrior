import { GraphData } from "react-force-graph-2d";
import { Mapper } from "../genericview/mapper";
import { Dataset, DatasetEntry } from "../model/dataset";
import { SankeyLayer } from "../model/datatypes";
import { TransformationProvider, TransformationSignature } from "../model/transformer";
import { SKDimensions } from "./dimensions/SKDimensions";
import { SLink, SNode } from "./renderer";


export class SKMapper implements Mapper<SKDimensions, GraphData> {
    
    public constructor(
        private transformer: TransformationProvider,
        private dimensions: SKDimensions,
        
    ) { }

    public updateMapLogic(ml: SKDimensions): void {
        this.dimensions = ml;
    }

    public map(d: Dataset): GraphData {
        const _nodes = this.createNodes();
        const _links = this.createLinks(d);

        return {
            nodes: _nodes,
            links: _links
        };
    }

    /**
     * Function that from a transformation signature return the corresponding SankeyLayer
     * @param s the transformation signature 
     * @returns a transformation rappresenting a SankeyLayer
     */
    private signatureToLayer(s: TransformationSignature): any {
        return this.transformer.get(s);
    }

    /**
     * Function that calulates the source of the link to push
     * @param layer the layer 
     * @param element the dataset entry 
     * @returns a string rappresenting the source, where the first number rappresents the layer 
     * and the second rappresents the node
     */
    private calculateSource(layer: [string, TransformationSignature], element: DatasetEntry): string {
        const source_result = this.signatureToLayer(layer[1]).map(element.get(layer[0]));
        return "," + this.signatureToLayer(layer[1]).outcomes.indexOf(source_result);
    }   

    /**
     * Function that calculates the target of the link to push
     * @param i index of the layer
     * @param layer 
     * @param element the dataset entry
     * @returns a string that rappresents the target, where the first number rappresents the layer
     * and the second rappresents the node
     */
    private calculateTarget(i: number, layer: [string, TransformationSignature], element: DatasetEntry): string {
        if (layer != null) {
            const target_result = this.signatureToLayer(layer[1]).map(element.get(layer[0]));
            return (i + 1) + "," + this.signatureToLayer(layer[1]).outcomes.indexOf(target_result);
        }
        return "";
    }

    /**
     * Function that cicle through layers and entries in order to create new links and
     * setting their source and target attributes in the right way
     * @param d object rappresenting the dataset 
     * @returns an array of new created links
     */
    private createLinks(d: Dataset): SLink[] {
        const links: SLink[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            console.log("D: ", d)
            d.entries().forEach(element => {
                links.push({
                    source: i + this.calculateSource(layer, element),
                    target: this.calculateTarget(i, this.dimensions.layers[i+1], element),
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
    private createNodes(): SNode[] {
        const nodes: SNode[] = [];
        this.dimensions.layers.forEach((layer, i) => {
            const result: SankeyLayer<any> = this.transformer.get(layer[1]);
            result.outcomes.forEach((element, j) => {
                console.log(i + "," + j);
                nodes.push({
                    nodeId: i + "," + j,
                    name: `nodox`
                });
            });
        });
        return nodes;
    }
}