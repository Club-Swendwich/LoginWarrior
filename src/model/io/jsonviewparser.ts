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
    } catch (_) {
      return ViewIOError.WrongFormat;
    }

    if (parsed.scatterplot === undefined) {
      return ViewIOError.MissingField;
    }

    if (
      this.fullCheck
      && (
        parsed.scatterplot[ScatterPlotJsonParser.SIG_FIELD] === undefined
        || parsed.scatterplot[ScatterPlotJsonParser.DIM_FIELD] === undefined
      )
    ) {
      return ViewIOError.MissingField;
    }

    const settings = parsed.scatterplot[ScatterPlotJsonParser.SIG_FIELD];
    if (
      this.fullCheck
      && (
        settings.domainX === undefined
        || settings.domainY === undefined
      )
    ) {
      return ViewIOError.MissingField;
    }

    if (
      this.fullCheck
      && (
        isPairMissingField(settings.domainX)
        || isPairMissingField(settings.domainY)
      )
    ) {
      return ViewIOError.MissingField;
    }

    if (
      this.fullCheck
      && (
        !isPairOfNumber(settings.domainX)
        || !isPairOfNumber(settings.domainY)
      )
    ) {
      return ViewIOError.WrongFormat;
    }

    const dimensions = parsed.scatterplot[ScatterPlotJsonParser.DIM_FIELD];
    if (
      this.fullCheck
      && (
        dimensions.x === undefined
        || dimensions.y === undefined
        || dimensions.size === undefined
        || dimensions.color === undefined
        || dimensions.shape === undefined
      )
    ) {
      return ViewIOError.MissingField;
    }

    if (
      this.fullCheck
      && (
        !Array.isArray(dimensions.x)
        || !Array.isArray(dimensions.y)
        || !Array.isArray(dimensions.size)
        || !Array.isArray(dimensions.color)
        || !Array.isArray(dimensions.shape)
      )
    ) {
      return ViewIOError.WrongFormat;
    }

    if (
      this.fullCheck
      && (
        isTransMissingFields(dimensions.x)
        || isTransMissingFields(dimensions.y)
        || isTransMissingFields(dimensions.size)
        || isTransMissingFields(dimensions.color)
        || isTransMissingFields(dimensions.shape)
      )
    ) {
      return ViewIOError.MissingField;
    }

    if (
      this.fullCheck
      && (
        !isTransCorrectFormat(dimensions.x)
        || !isTransCorrectFormat(dimensions.y)
        || !isTransCorrectFormat(dimensions.size)
        || !isTransCorrectFormat(dimensions.color)
        || !isTransCorrectFormat(dimensions.shape)
      )
    ) {
      return ViewIOError.WrongFormat;
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
    let parsed;
    try {
      parsed = JSON.parse(src);
    } catch (_) {
      return ViewIOError.WrongFormat;
    }

    const settings = parsed.sankey[SankeyJsonParser.SIG_FIELD];
    if (this.fullCheck && settings === undefined) {
      return ViewIOError.MissingField;
    }

    const dimensions = parsed.sankey[SankeyJsonParser.DIM_FIELD];
    if (this.fullCheck && dimensions === undefined) {
      return ViewIOError.MissingField;
    }

    // TODO implement check fields

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

function isPairMissingField(arr: any) : Boolean {
  if (Array.isArray(arr)) {
    return !(arr.length === 2);
  }
  return true;
}

function isPairOfNumber(arr: any) : Boolean {
  return arr.length === 2
    && arr.every((value: any) => typeof value === 'number');
}

function isTransMissingFields(tran: any) : Boolean {
  if (tran.length === 2) {
    return (
      tran[0] === undefined
      || tran[1].identifier === undefined
      || tran[1].from === undefined
      || tran[1].to === undefined
    );
  }
  return true;
}

function isTransCorrectFormat(tran: any) : Boolean {
  return (
    typeof tran[0] === 'string'
    && typeof tran[1].identifier === 'string'
    && typeof tran[1].from === 'number'
    && typeof tran[1].to === 'number'
  );
}
