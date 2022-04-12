import {
  scaleLinear, ScaleLinear, select, symbolStar, symbolTriangle, symbolCross,
  symbolSquare, SymbolType,
} from 'd3';
import {
  seriesWebglMulti, seriesWebglPoint, webglFillColor, chartCartesian,
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

export function renderShape(shape: GraphableTypeToRepr<GraphableType.Shape>): SymbolType {
  switch (shape) {
    case 'star': return symbolStar;
    case 'triangle': return symbolTriangle;
    case 'cross': return symbolCross;
    case 'square': return symbolSquare;
    default: {
      return symbolStar;
    }
  }
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

    const series = Array.from(grouped.entries())
      .map(([shape]) => this.makeSeries(shape));
    if (series.length === 0) {
      series.push(this.makeSeries('star'));
    }

    const multi = seriesWebglMulti()
      .xScale(this.xAxis)
      .yScale(this.yAxis)
      .series(series);
    const chart = chartCartesian(this.xAxis, this.yAxis)
      .webglPlotArea(multi);
    const renderFn = () => {
      select(ref.current)
        .datum(this.points)
        .call(chart);
    };
    renderFn();
  }

  private makeSeries(
    shape: SPREnderablePoint['shape'],
  ): WebGLSeries {
    // TODO: Figure ou how to enable the point dispatch
    return seriesWebglPoint()
      .xScale(this.xAxis)
      .yScale(this.yAxis)
      .crossValue((p: SPREnderablePoint) => p.x)
      .mainValue((p: SPREnderablePoint) => p.y)
      .size((p: SPREnderablePoint) => {
        // FIXME: This is an ugly hack find a better way to discriminate the
        // shapes
        if (p.shape !== shape) {
          return 0;
        }
        return p.size;
      })
      .type(renderShape(shape))
      .decorate((context: WebGLContext, p: SPREnderablePoint[]) => {
        const fill = webglFillColor()
          .value((p: SPREnderablePoint) => p.color)
          .data(p);
        fill(context);
        // TODO: Should we support transaprency
        // const webgl = context.context();
        // webgl.clearColor(1.0, 1.0, 1.0, 0.0);
        // webgl.clear(webgl.COLOR_BUFFER_BIT);
        // webgl.enable(webgl.BLEND);
        // webgl.blendColor(0.0, 0.0, 0.0, 1.0);
        // webgl.blendFuncSeparate(
        //   webgl.DST_COLOR,
        //   webgl.ZERO,
        //   webgl.CONSTANT_ALPHA,
        //   webgl.ZERO,
        // );
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
