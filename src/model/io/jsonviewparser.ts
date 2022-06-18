import { SPDimensions } from '../../scatterplot/dimensions';
import SPRenderSettings from '../../scatterplot/renderersettings';
import { ViewParser, ViewIOError } from './viewio';

export type ScatterPlotView = [SPRenderSettings, SPDimensions];
// FIXME: Insert the real views
export type SankeyView = [any, any];

export class ScatterPlotJsonParser implements ViewParser<ScatterPlotView> {
  static readonly SIG_FIELD = 'spSettings';

  static readonly DIM_FIELD = 'spDimensions';

  constructor(
    private readonly fullCheck = true,
  ) { }

  parse(src: string): ViewIOError | ScatterPlotView {
    let parsed;
    try {
      parsed = JSON.parse(src);
    } catch (_) {
      return ViewIOError.WrongFormat;
    }

    if (parsed === undefined) {
      return ViewIOError.WrongFormat;
    }

    const settings = parsed[ScatterPlotJsonParser.SIG_FIELD];
    if (this.fullCheck && settings === undefined) {
      return ViewIOError.MissingField;
    }

    const dimensions = parsed[ScatterPlotJsonParser.DIM_FIELD];
    if (this.fullCheck && dimensions === undefined) {
      return ViewIOError.MissingField;
    }

    return [settings, dimensions];
  }
}

export class SankeyJsonParser implements ViewParser<SankeyView> {
  static readonly SIG_FIELD = 'skSettings';

  static readonly DIM_FIELD = 'skDimensions';

  constructor(
    private readonly fullCheck = true,
  ) { }

  parse(src: string): ViewIOError | SankeyView {
    const parsed = JSON.parse(src);
    if (parsed === undefined) {
      return ViewIOError.WrongFormat;
    }

    const settings = parsed[SankeyJsonParser.SIG_FIELD];
    if (this.fullCheck && settings === undefined) {
      return ViewIOError.MissingField;
    }

    const dimensions = parsed[SankeyJsonParser.DIM_FIELD];
    if (this.fullCheck && dimensions === undefined) {
      return ViewIOError.MissingField;
    }

    return [settings, dimensions];
  }
}

export type FullView = [ScatterPlotView, SankeyView];

export class FullViewParser implements ViewParser<FullView> {
  constructor(
    private readonly spParser: ViewParser<ScatterPlotView>,
    private readonly skParser: ViewParser<SankeyView>,
  ) { }

  parse(src: string): FullView | ViewIOError {
    const sp = this.spParser.parse(src);
    if (typeof sp === typeof ViewIOError.MissingField) {
      return sp as ViewIOError;
    }

    const sk = this.skParser.parse(src);
    if (typeof sk === typeof ViewIOError.MissingField) {
      return sk as ViewIOError;
    }

    return [sp as ScatterPlotView, sk as SankeyView];
  }
}
