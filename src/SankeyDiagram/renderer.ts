/*eslint-disable*/
import { MutableRefObject } from 'react';
import { Renderer } from '../genericview/renderer';
import {CustomNode, CustomLink} from '../model/datatypes';  
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import chroma from "chroma-js";

type SNode = d3Sankey.SankeyNode<CustomNode, CustomLink>;
type SLink = d3Sankey.SankeyLink<CustomNode, CustomLink>;

export interface GraphData {
    nodes: SNode[];
    links: SLink[];
}

export interface RenderSettings {
    width: number,
    height: number
}

export class SKRenderer implements Renderer<RenderSettings, GraphData>{
    
    public constructor(
        private settings: RenderSettings,
        private SKRenderableData: GraphData
    ) {}
    
    updateSettings(s: RenderSettings): void {
        this.settings = s;
    }
    updatePoints(p: GraphData): void {
        this.SKRenderableData = p;
    }
    
    public render(ref: MutableRefObject<HTMLDivElement>): void {
        const height = this.settings.height
        const width = this.settings.width;

        const svg = d3.select(ref.current)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        const formatNumber = d3.format(",.0f"),
        format = function (d: any) { return formatNumber(d) + " TWh"; },
        color = d3.scaleOrdinal(d3.schemeCategory10);

        const graph = d3Sankey.sankey()
                        .nodeWidth(25)
                        .nodePadding(10)
                        .extent([[1, 1], [width - 1, height - 6]]);;
        graph(this.SKRenderableData)

        const link = svg.append("g")
                        .attr("class", "links")
                        .attr("fill", "none")
                        .attr("stroke", "#000")
                        .attr("stroke-opacity", 0.2)
                        .selectAll("path");

        const node = svg.append("g")
                        .attr("class", "nodes")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .selectAll("g");

        link
        .data(this.SKRenderableData.links)
        .enter().append("path")
        .attr("d", d3Sankey.sankeyLinkHorizontal())
        .attr("stroke-width", function (d: any) { return Math.max(1, d.width); })

        node
        .data(this.SKRenderableData.nodes)
        .enter().append("g")
        .append("rect")
        .attr("x", function (d: any) { return d.x0; })
        .attr("y", function (d: any) { return d.y0; })
        .attr("height", function (d: any) { return d.y1 - d.y0; })
        .attr("width", function (d: any) { return d.x1 - d.x0; })
        .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
        .attr("stroke", "#000")
        .append("text")
                .attr("x", function (d: any) { return d.x0 - 6; })
                .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .text(function (d: any) { return d.name; })
                .filter(function (d: any) { return d.x0 < width / 2; })
                .attr("x", function (d: any) { return d.x1 + 6; })
                .attr("text-anchor", "start");
        
        /*.call(d3.drag()
            .subject(function (d) { return d; })
            .on('start', function (event, d) {
                this.parentNode?.appendChild(this)
            })
            .on("drag", dragmove)
        )
            Dio cane ancora non riesco a farli draggable
        */
    }
}