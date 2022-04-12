import { scaleLinear, ScaleLinear, select } from 'd3';
import {
  chartCartesian, seriesWebglMulti, seriesWebglPoint, webglFillColor,
} from 'd3fc';
import { MutableRefObject } from 'react';
import { GraphableType, GraphableTypeToRepr } from '../model/datatypes';
import { Renderer } from '../genericview/renderer';

export interface SPREnderablePoint {
  readonly x: GraphableTypeToRepr<GraphableType.Real>;
  readonly y: GraphableTypeToRepr<GraphableType.Real>;
  readonly size: GraphableTypeToRepr<GraphableType.Int>;
  readonly shape: GraphableTypeToRepr<GraphableType.Shape>;
  readonly color: GraphableTypeToRepr<GraphableType.Color>;
}

export interface SPRenderSettings {
  readonly domainX: [number, number];
  readonly domainY: [number, number];
}

export class SPRenderer implements Renderer<SPRenderSettings, SPREnderablePoint[]> {
  constructor(
    private points: SPREnderablePoint[],
    private settings: SPRenderSettings,
  ) { }

  updatePoints(p: SPREnderablePoint[]): void {
    this.points = p;
  }

  updateSettings(s: SPRenderSettings): void {
    this.settings = s;
  }

  render(ref: MutableRefObject<HTMLDivElement>): void {
    // NOTE: This is needed since right now d3fc does not support the render of
    // different shapes on the same series
    // see https://github.com/d3fc/d3fc/issues/1722
    const grouped = groupByShape(this.points);
    const chart = this.makeChart(grouped);
    select(ref.current)
      .datum(this.points)
      .call(chart);
  }

  private makeChart(grouped: Map<SPREnderablePoint['shape'],
  SPREnderablePoint[]>): WebGLSeries {
    const series = Array.from(grouped.entries())
      .map(([shape, points]) => this.makeSeries(shape, points));
    if (series.length === 0) {
      series.push(this.makeSeries('star', []));
    }

    return chartCartesian(this.xAxis, this.yAxis)
      .webglPlotArea(
        seriesWebglMulti()
          .xScale(this.xAxis)
          .yScale(this.yAxis)
          .series(series),
      );
  }

  private makeSeries(
    shape: SPREnderablePoint['shape'],
    points: SPREnderablePoint[],
  ): WebGLSeries {
    return seriesWebglPoint()
      .data(points)
      .xScale(this.xAxis)
      .yScale(this.yAxis)
      .crossValue((p: SPREnderablePoint) => p.x)
      .mainValue((p: SPREnderablePoint) => p.y)
      .size((p: SPREnderablePoint) => p.size)
      .type(shape)
      .decorate((context: WebGLContext, points: SPREnderablePoint[]) => {
        const fill = webglFillColor()
          .value((p: SPREnderablePoint) => p.color)
          .datum(points);
        // TODO: Should we support transaprency
        // const wbgl = context.context()
        // webgl.enable(webgl.BLEND)
        fill(context);
      });
  }

  public get xAxis(): ScaleLinear<number, number, never> {
    return scaleLinear().domain(this.settings.domainX);
  }

  public get yAxis(): ScaleLinear<number, number, never> {
    return scaleLinear().domain(this.settings.domainY);
  }
}

export function groupByShape(elements: SPREnderablePoint[]):
Map<SPREnderablePoint['shape'], SPREnderablePoint[]> {
  const accumulator = new Map<SPREnderablePoint['shape'], SPREnderablePoint[]>();
  for (const element of elements) {
    const key = element.shape;
    const group = accumulator.get(key);
    if (group === undefined) {
      accumulator.set(key, [element]);
    } else {
      group.push(element);
    }
  }
  return accumulator;
}

type WebGLSeries = any;
type WebGLContext = any;
