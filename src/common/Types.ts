import { namespace } from "d3";
import ForceGraph2D, { LinkObject, NodeObject } from 'react-force-graph-2d';

export namespace FdG {
    export type CustomeNodeObject = NodeObject & {
        description: string
    }

    export type CustomeLinkObject = LinkObject & {}
}