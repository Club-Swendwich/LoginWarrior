/*eslint-disable*/
import { MutableRefObject } from 'react';
import { Renderer } from '../genericview/renderer';
import {CustomNode, CustomLink} from '../model/datatypes';  
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import chroma from "chroma-js";
import {SankeySettings} from "./sankRendererSettings"

type SNode = d3Sankey.SankeyNode<CustomNode, CustomLink>;
type SLink = d3Sankey.SankeyLink<CustomNode, CustomLink>;

export interface GraphData {
    nodes: SNode[];
    links: SLink[];
}

export class SKRenderer implements Renderer<SankeySettings, GraphData>{
    public constructor(
        private settings: SankeySettings,
        private SKRenderableData: GraphData
    ) {}
    
    updateSettings(s: SankeySettings): void {
        this.settings = s;
    }
    updatePoints(p: GraphData): void {
        this.SKRenderableData = p;
    }
    
    public render(ref: MutableRefObject<HTMLDivElement>): void {
        const height = this.settings.height;
        const width = this.settings.width;
        
        const svg = d3.select(ref.current)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        const graph = d3Sankey.sankey()
                        .nodeWidth(20)
                        .nodePadding(10)
                        .extent([[1, 1], [width - 1, height - 6]]);
        graph(this.SKRenderableData);
        
        const links = this.createLinks(svg);
        this.createNodes(svg, graph, links);
    }

    private createLinks(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {     
        const link = svg.append("g").selectAll(".link")
                    .data(this.SKRenderableData.links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", d3Sankey.sankeyLinkHorizontal())
                    .attr("stroke", "#000")
                    .attr("stroke-opacity", 0.2)
                    .attr("fill", "none")
                    .attr("stroke-width", function(d: any) { 
                        return Math.max(1, d.width); 
                    })
                    .on("mouseover", function () {
                        d3.select(this)
                        .attr("stroke-opacity", 0.5)
                    })
                    .on("mouseleave", function () {
                        d3.select(this)
                        .attr("stroke-opacity", 0.2)
                    })
        return link;
    }

    private createNodes(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, 
                        graph: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>, 
                        link: d3.Selection<SVGPathElement, SLink, SVGGElement, unknown>): void {
        
        /**
         * TODO: Stop drag when the node goes outside the borders
         * TODO: implement node's title 
         */
        const _self = this;
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        
        const node = svg.append("g")
                .selectAll(".node")
                .data(this.SKRenderableData.nodes)
                .enter().append("rect")
                .attr("class", "node")
                .attr("x", function (d: any) { return d.x0; })
                .attr("y", function (d: any) { return d.y0; })
                .attr("height", function (d: any) { return d.y1 - d.y0; })
                .attr("width", function (d: any) { return d.x1 - d.x0; })
                .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
                .attr("stroke", "#000");
   
        svg.selectAll<SVGElement, unknown>(".node")
        .call(
            d3.drag<SVGElement, unknown>()
            .subject(d => d)
            .on('start', function () { this.parentNode?.appendChild(this); })
            .on('drag', function (event, d: any) {
                var rectY = +d3.select(this).attr("y");
                var rectX = +d3.select(this).attr("x");
                d.y0 = d.y0 + event.dy;
                d.x1 = d.x1 + event.dx;
                d.x0 = d.x0 + event.dx;
                var yTranslate = d.y0 - rectY;
                var xTranslate = d.x0 - rectX;
                d3.select(this).attr('transform', "translate(" + (xTranslate) + "," + (yTranslate) + ")");
                graph.update(_self.SKRenderableData);
                link.attr('d', d3Sankey.sankeyLinkHorizontal());
            })
        );
    }
    
    public get svgWidth(): number {
        return this.settings.width;
    }

    public get svgHeight(): number {
        return this.settings.height;
    }
}