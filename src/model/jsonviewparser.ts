import { SPDimensions } from '../scatterplot/dimensions';
import SPRenderSettings from '../scatterplot/renderersettings';
import { ViewParser, ViewParserError } from './viewio';

export type ScatterPlotView = [SPRenderSettings, SPDimensions];
// FIXME: Insert the real views
export type SankeyView = [any, any];

export class ScatterPlotJsonParser implements ViewParser<ScatterPlotView> {
  static readonly SIG_FIELD = 'spSettings';

  static readonly DIM_FIELD = 'spDimensions';

  constructor(
    private readonly fullCheck = true,
  ) { }

  parse(src: string): ViewParserError | ScatterPlotView {
    let parsed = undefined;
    try {
        parsed = JSON.parse(src);
    } catch (_) {
        return ViewParserError.WrongFormat;
    }

    if (parsed === undefined) {
      return ViewParserError.WrongFormat;
    }

    const settings = parsed[ScatterPlotJsonParser.SIG_FIELD];
    if (this.fullCheck && settings === undefined) {
      return ViewParserError.MissingField;
    }

    const dimensions = parsed[ScatterPlotJsonParser.DIM_FIELD];
    if (this.fullCheck && dimensions === undefined) {
      return ViewParserError.MissingField;
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

  parse(src: string): ViewParserError | SankeyView {
    const parsed = JSON.parse(src);
    if (parsed === undefined) {
      return ViewParserError.WrongFormat;
    }

    const settings = parsed[SankeyJsonParser.SIG_FIELD];
    if (this.fullCheck && settings === undefined) {
      return ViewParserError.MissingField;
    }

    const dimensions = parsed[SankeyJsonParser.DIM_FIELD];
    if (this.fullCheck && dimensions === undefined) {
      return ViewParserError.MissingField;
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

  parse(src: string): FullView | ViewParserError {
    const sp = this.spParser.parse(src);
    if (typeof sp === typeof ViewParserError.MissingField) {
      return sp as ViewParserError;
    }

    const sk = this.skParser.parse(src);
    if (typeof sk === typeof ViewParserError.MissingField) {
      return sk as ViewParserError;
    }

    return [sp as ScatterPlotView, sk as SankeyView];
  }
}
