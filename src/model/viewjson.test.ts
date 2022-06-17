import { FullViewParser, ScatterPlotJsonParser } from './jsonviewparser';
import { ViewParserError } from './viewio';

describe('ScatterPlotJsonParser', () => {
  it('should handle wrong formats', () => {
    const s = new ScatterPlotJsonParser();

    const res = s.parse('<xml>');

    expect(res).toEqual(ViewParserError.WrongFormat);
  });

  it('should handle missing fields', () => {
    const s = new ScatterPlotJsonParser();

    const res = s.parse('{}');

    expect(res).toEqual(ViewParserError.MissingField);
  });

  it('should handle one field', () => {
    const s = new ScatterPlotJsonParser();

    const resD = s.parse('{ "spDimensions": {} }');
    const resS = s.parse('{ "spSettings": {} }');

    expect(resS).toEqual(ViewParserError.MissingField);
    expect(resD).toEqual(ViewParserError.MissingField);
  });

  it('should ignore field when the check is disabled', () => {
    const s = new ScatterPlotJsonParser(false);

    const res = s.parse('{ "spDimensions": {} }');

    expect(res).toEqual([undefined, {}]);
  });

  it('should parse when the format is correct', () => {
    const s = new ScatterPlotJsonParser(false);

    const res = s.parse('{ "spDimensions": 1,  "spSettings": 2}');

    expect(res).toEqual([2, 1]);
  });
});

describe('FullViewParser', () => {
  it('should handle both failure', () => {
    const f = new FullViewParser(
      { parse: () => ViewParserError.MissingField },
      { parse: () => ViewParserError.WrongFormat },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(ViewParserError.MissingField);
  });

  it('should handle sp failure', () => {
    const f = new FullViewParser(
      { parse: () => ViewParserError.MissingField },
      // @ts-expect-error We aren't mocking the entire object
      { parse: () => 'a' },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(ViewParserError.MissingField);
  });

  it('should handle sl failure', () => {
    const f = new FullViewParser(
      // @ts-expect-error We aren't mocking the entire object
      { parse: () => 'a' },
      { parse: () => ViewParserError.WrongFormat },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(ViewParserError.WrongFormat);
  });

  it('should handle a correct format', () => {
    const f = new FullViewParser(
      // @ts-expect-error We aren't mocking the entire object
      { parse: () => 'a' },
      { parse: () => 'b' },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(['a', 'b']);
  });
});
