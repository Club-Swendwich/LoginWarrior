import { FullView, SankeyView, ScatterPlotView } from '../views';
import { ViewParser, ViewIOError } from './viewio';

export class ScatterPlotJsonParser implements ViewParser<ScatterPlotView> {
  static readonly SIG_FIELD = 'settings';

  static readonly DIM_FIELD = 'dimensions';

  constructor(
    private readonly fullCheck = true,
  ) { }

  parse(src: string): ViewIOError | ScatterPlotView {
    let parsed;
    try {
      parsed = JSON.parse(src);
      console.log(parsed);
    } catch (_) {
      return ViewIOError.WrongFormat;
    }

    if (parsed === undefined) {
      return ViewIOError.WrongFormat;
    }

    const settings = parsed.scatterplot[ScatterPlotJsonParser.SIG_FIELD];
    console.log(settings);
    if (this.fullCheck && settings === undefined) {
      return ViewIOError.MissingField;
    }

    const dimensions = parsed.scatterplot[ScatterPlotJsonParser.DIM_FIELD];
    console.log(dimensions);
    if (this.fullCheck && dimensions === undefined) {
      return ViewIOError.MissingField;
    }

    return { settings, dimensions };
  }
}

export class SankeyJsonParser implements ViewParser<SankeyView> {
  static readonly SIG_FIELD = 'settings';

  static readonly DIM_FIELD = 'dimensions';

  constructor(
    private readonly fullCheck = true,
  ) { }

  parse(src: string): ViewIOError | SankeyView {
    const parsed = JSON.parse(src);
    console.log(parsed);
    if (parsed === undefined) {
      return ViewIOError.WrongFormat;
    }

    const settings = parsed.sankey[SankeyJsonParser.SIG_FIELD];
    console.log(settings);
    if (this.fullCheck && settings === undefined) {
      return ViewIOError.MissingField;
    }

    const dimensions = parsed.sankey[SankeyJsonParser.DIM_FIELD];
    console.log(dimensions);
    if (this.fullCheck && dimensions === undefined) {
      return ViewIOError.MissingField;
    }

    return { settings, dimensions };
  }
}

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

    return {
      scatterplot: sp as ScatterPlotView,
      sankey: sk as SankeyView,
    };
  }
}
