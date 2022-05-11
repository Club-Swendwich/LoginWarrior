import { GraphData, SNode, SLink } from "./renderer";
import { Mapper } from "../genericview/mapper";
import { Dataset, DatasetEntry } from "../model/dataset";
import { TransformationProvider, TransformationSignature } from "../model/transformer";
import { CustomNode, CustomLink } from "../model/datatypes";

interface NodeMapperSettings {
    nodeId: [string, TransformationSignature],
    name: [string, TransformationSignature]
}

interface LinkMapperSettings {
    source: [string, TransformationSignature],
    target: [string, TransformationSignature],
    value: [string, TransformationSignature]
}

export interface SKMapperSettings {
    node: NodeMapperSettings,
    link: LinkMapperSettings
}

interface MapFnAccumulator {
    nodeId: (e: DatasetEntry) => any,
    name: (e: DatasetEntry) => any,
    source: (e: DatasetEntry) => any,
    target: (e: DatasetEntry) => any,
    value: (e: DatasetEntry) => any,
}

export class SKMapper implements Mapper<SKMapperSettings, GraphData> {
    private mapFn: MapFnAccumulator;

    public constructor(
        private tranformer: TransformationProvider,
        private settings: SKMapperSettings
    ) {
        this.mapFn = this.makeMapFn(settings);
    }

    updateMapLogic(ml: SKMapperSettings): void {
        this.mapFn = this.makeMapFn(ml);
    }
    
    map(d: Dataset): GraphData {
        const __nodes = d.entries().map(this.applyToNodes);
        const __links = d.entries().map(this.applyToLinks);

        return {
            nodes: __nodes,
            links: __links
        };
    }
    
    private makeMapFn(s: SKMapperSettings): MapFnAccumulator {
        const nodeIdM = this.tranformer.get(s.node.nodeId[1])!;
        const nameM = this.tranformer.get(s.node.name[1])!;
        
        const sourceM = this.tranformer.get(s.link.source[1])!;
        const targetM = this.tranformer.get(s.link.target[1])!;
        const valueM = this.tranformer.get(s.link.value[1])!;

        return {
            nodeId: (d) => nodeIdM(d.get(s.node.nodeId[0])),
            name: (d) => nameM(d.get(s.node.name[0])),
            source: (d) => sourceM(d.get(s.link.source[0])),
            target: (d) => targetM(d.get(s.link.target[0])),
            value: (d) => valueM(d.get(s.link.value[0]))
        };
    }

    private applyToNodes(d: DatasetEntry): SNode {
        return {
            nodeId: this.mapFn.nodeId(d),
            name: this.mapFn.name(d)
        };
    }

    private applyToLinks(d: DatasetEntry): SLink {
        return {
            source: this.mapFn.source(d),
            target: this.mapFn.target(d),
            value: this.mapFn.value(d)
        };
    }
}