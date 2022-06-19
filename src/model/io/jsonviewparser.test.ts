import { FullViewParser, ScatterPlotJsonParser } from './jsonviewparser';
import { ViewIOError } from './viewio';

describe('ScatterPlotJsonParser', () => {
  it('should handle wrong formats', () => {
    const s = new ScatterPlotJsonParser();

    const res = s.parse('<xml>');

    expect(res).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle missing fields', () => {
    const s = new ScatterPlotJsonParser();

    const res = s.parse('{}');

    expect(res).toEqual(ViewIOError.MissingField);
  });

  it('should handle only settings or dimensions', () => {
    const s = new ScatterPlotJsonParser();

    const resS = s.parse('{ "scatterplot": { "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resD = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] } } }');

    expect(resS).toEqual(ViewIOError.MissingField);
    expect(resD).toEqual(ViewIOError.MissingField);
  });

  it('should handle missing setting', () => {
    const s = new ScatterPlotJsonParser();

    const resSx = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainY": [ 12, 13 ] } } }');
    const resSy = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ] } } }');

    expect(resSx).toEqual(ViewIOError.MissingField);
    expect(resSy).toEqual(ViewIOError.MissingField);
  });

  it('should handle settings not an array', () => {
    const s = new ScatterPlotJsonParser();

    const resSx = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": 1, "domainY": [ 12, 13 ] } } }');
    const resSy = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": 1 } } }');

    expect(resSx).toEqual(ViewIOError.MissingField);
    expect(resSy).toEqual(ViewIOError.MissingField);
  });

  it('should handle settings not an array of dim 2', () => {
    const s = new ScatterPlotJsonParser();

    const resSx = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11, 3 ], "domainY": [ 12, 13 ] } } }');
    const resSy = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13, 3 ] } } }');

    expect(resSx).toEqual(ViewIOError.MissingField);
    expect(resSy).toEqual(ViewIOError.MissingField);
  });

  it('should handle missing dimension', () => {
    const s = new ScatterPlotJsonParser();

    const resDx = s.parse('{ "scatterplot": { "dimensions": { "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDy = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsize = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshape = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolor = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDx).toEqual(ViewIOError.MissingField);
    expect(resDy).toEqual(ViewIOError.MissingField);
    expect(resDsize).toEqual(ViewIOError.MissingField);
    expect(resDshape).toEqual(ViewIOError.MissingField);
    expect(resDcolor).toEqual(ViewIOError.MissingField);
  });

  it('should handle missing dimension name', () => {
    const s = new ScatterPlotJsonParser();

    const resDxName = s.parse('{ "scatterplot": { "dimensions": { "x": [ { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxName).toEqual(ViewIOError.MissingField);
    expect(resDyName).toEqual(ViewIOError.MissingField);
    expect(resDsizeName).toEqual(ViewIOError.MissingField);
    expect(resDshapeName).toEqual(ViewIOError.MissingField);
    expect(resDcolorName).toEqual(ViewIOError.MissingField);
  });

  it('should handle wrong dimension format', () => {
    const s = new ScatterPlotJsonParser();

    const resDx = s.parse('{ "scatterplot": { "dimensions": { "x": 1, "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDy = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": 1, "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsize = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": 1, "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshape = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": 1, "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolor = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": 1 }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDx).toEqual(ViewIOError.WrongFormat);
    expect(resDy).toEqual(ViewIOError.WrongFormat);
    expect(resDsize).toEqual(ViewIOError.WrongFormat);
    expect(resDshape).toEqual(ViewIOError.WrongFormat);
    expect(resDcolor).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle missing dimension transformation signature', () => {
    const s = new ScatterPlotJsonParser();

    const resDxTransformation = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a" ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyTransformation = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b" ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeTransformation = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c" ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeTransformation = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d" ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorTransformation = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e" ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxTransformation).toEqual(ViewIOError.MissingField);
    expect(resDyTransformation).toEqual(ViewIOError.MissingField);
    expect(resDsizeTransformation).toEqual(ViewIOError.MissingField);
    expect(resDshapeTransformation).toEqual(ViewIOError.MissingField);
    expect(resDcolorTransformation).toEqual(ViewIOError.MissingField);
  });

  it('should handle missing dimension transformation signature id', () => {
    const s = new ScatterPlotJsonParser();

    const resDxId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxId).toEqual(ViewIOError.MissingField);
    expect(resDyId).toEqual(ViewIOError.MissingField);
    expect(resDsizeId).toEqual(ViewIOError.MissingField);
    expect(resDshapeId).toEqual(ViewIOError.MissingField);
    expect(resDcolorId).toEqual(ViewIOError.MissingField);
  });

  it('should handle missing dimension transformation signature from', () => {
    const s = new ScatterPlotJsonParser();

    const resDxFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxFrom).toEqual(ViewIOError.MissingField);
    expect(resDyFrom).toEqual(ViewIOError.MissingField);
    expect(resDsizeFrom).toEqual(ViewIOError.MissingField);
    expect(resDshapeFrom).toEqual(ViewIOError.MissingField);
    expect(resDcolorFrom).toEqual(ViewIOError.MissingField);
  });

  it('should handle missing dimension transformation signature to', () => {
    const s = new ScatterPlotJsonParser();

    const resDxTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxTo).toEqual(ViewIOError.MissingField);
    expect(resDyTo).toEqual(ViewIOError.MissingField);
    expect(resDsizeTo).toEqual(ViewIOError.MissingField);
    expect(resDshapeTo).toEqual(ViewIOError.MissingField);
    expect(resDcolorTo).toEqual(ViewIOError.MissingField);
  });

  it('should handle wrong format setting', () => {
    const s = new ScatterPlotJsonParser();

    const resSx = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": ["c", 1], "domainY": [ 12, 13 ] } } }');
    const resSy = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": ["c", 10] } } }');

    expect(resSx).toEqual(ViewIOError.WrongFormat);
    expect(resSy).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle wrong format dimension name', () => {
    const s = new ScatterPlotJsonParser();

    const resDxName = s.parse('{ "scatterplot": { "dimensions": { "x": [ 1, { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ 2, { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ 3, { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ 4, { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorName = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ 5, { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxName).toEqual(ViewIOError.WrongFormat);
    expect(resDyName).toEqual(ViewIOError.WrongFormat);
    expect(resDsizeName).toEqual(ViewIOError.WrongFormat);
    expect(resDshapeName).toEqual(ViewIOError.WrongFormat);
    expect(resDcolorName).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle wrong format dimension transformation signature id', () => {
    const s = new ScatterPlotJsonParser();

    const resDxId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": 1, "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": 2, "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": 3, "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": 4, "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorId = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": 5, "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxId).toEqual(ViewIOError.WrongFormat);
    expect(resDyId).toEqual(ViewIOError.WrongFormat);
    expect(resDsizeId).toEqual(ViewIOError.WrongFormat);
    expect(resDshapeId).toEqual(ViewIOError.WrongFormat);
    expect(resDcolorId).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle wrong format dimension transformation signature from', () => {
    const s = new ScatterPlotJsonParser();

    const resDxFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": "0", "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": "2", "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": "4", "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": "6", "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorFrom = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": "8", "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxFrom).toEqual(ViewIOError.WrongFormat);
    expect(resDyFrom).toEqual(ViewIOError.WrongFormat);
    expect(resDsizeFrom).toEqual(ViewIOError.WrongFormat);
    expect(resDshapeFrom).toEqual(ViewIOError.WrongFormat);
    expect(resDcolorFrom).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle wrong format dimension transformation signature to', () => {
    const s = new ScatterPlotJsonParser();

    const resDxTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": "1" } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDyTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": "3" } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDsizeTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": "5" } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDshapeTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": "7" } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');
    const resDcolorTo = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": "9" } ] }, "settings": { "domainX": [ 10, 11 ], "domainY": [ 12, 13 ] } } }');

    expect(resDxTo).toEqual(ViewIOError.WrongFormat);
    expect(resDyTo).toEqual(ViewIOError.WrongFormat);
    expect(resDsizeTo).toEqual(ViewIOError.WrongFormat);
    expect(resDshapeTo).toEqual(ViewIOError.WrongFormat);
    expect(resDcolorTo).toEqual(ViewIOError.WrongFormat);
  });

  it('should ignore field when the check is disabled', () => {
    const s = new ScatterPlotJsonParser(false);

    const res = s.parse('{ "scatterplot": {} }');

    expect(res).toEqual({dimensions: undefined, settings: undefined});
  });

  it('should parse when the format is correct', () => {
    const s = new ScatterPlotJsonParser(false);

    const res = s.parse('{ "scatterplot": { "dimensions": { "x": [ "a", { "identifier": "aId", "from": 0, "to": 1 } ], "y": [ "b", { "identifier": "bId", "from": 2, "to": 3 } ], "size": [ "c", { "identifier": "cId", "from": 4, "to": 5 } ], "shape": [ "d", { "identifier": "dId", "from": 6, "to": 7 } ], "color": [ "e", { "identifier": "eId", "from": 8, "to": 9 } ] }, "settings": { "domainY": [ 12, 13 ], "domainX": [ 10, 11 ] } } }');

    expect(res).toEqual({
      dimensions: {
        x: ['a', { identifier: 'aId', from: 0, to: 1 }], y: ['b', { identifier: 'bId', from: 2, to: 3 }], size: ['c', { identifier: 'cId', from: 4, to: 5 }], shape: ['d', { identifier: 'dId', from: 6, to: 7 }], color: ['e', { identifier: 'eId', from: 8, to: 9 }],
      },
      settings: { domainY: [12, 13], domainX: [10, 11] },
    });
  });
});

// TODO add sankey tests

describe('FullViewParser', () => {
  it('should handle both failure', () => {
    const f = new FullViewParser(
      { parse: () => ViewIOError.MissingField },
      { parse: () => ViewIOError.WrongFormat },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(ViewIOError.MissingField);
  });

  it('should handle sp failure', () => {
    const f = new FullViewParser(
      { parse: () => ViewIOError.MissingField },
      // @ts-expect-error We aren't mocking the entire object
      { parse: () => 'a' },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(ViewIOError.MissingField);
  });

  it('should handle sl failure', () => {
    const f = new FullViewParser(
      // @ts-expect-error We aren't mocking the entire object
      { parse: () => 'a' },
      { parse: () => ViewIOError.WrongFormat },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual(ViewIOError.WrongFormat);
  });

  it('should handle a correct format', () => {
    const f = new FullViewParser(
      // @ts-expect-error We aren't mocking the entire object
      { parse: () => 'a' },
      { parse: () => 'b' },
    );

    // @ts-expect-error We aren't mocking the entire object
    const p = f.parse({});

    expect(p).toEqual({ sankey: 'b', scatterplot: 'a' });
  });
});
