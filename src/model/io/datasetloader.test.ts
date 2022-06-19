import { Dataset, DatasetEntry } from '../dataset';
import { CSVDatasetParser, ParseError } from './datasetloader';
import { StorableType } from '../datatypes';

describe('datasetloader', () => {
  it('should handle an empty dataset', () => {
    const p = new CSVDatasetParser(';');
    expect(p.parse('')).toEqual(ParseError.InvalidFormat);
    expect(p.parse('    ')).toEqual(ParseError.InvalidFormat);
  });
  it('should return undefined on invalid data', () => {
    const p = new CSVDatasetParser(';');
    expect(p.parse('a;b;c;d')).toEqual(ParseError.InvalidRow);
  });
  it('should parse a line', () => {
    const line = '1;2;3;4;a;b;c;d';
    const p = new CSVDatasetParser(';');
    const toExpect = new Dataset([
      new DatasetEntry(new Map([
        ['userId', {
          type: StorableType.Int,
          value: 1,
        }],
        ['timestamp', {
          type: StorableType.Date,
          value: new Date('2001-02-28T23:00:00.000Z'),
        }],
        ['eventType', {
          type: StorableType.LoginType,
          value: 4,
        }],
        ['encodedIp', {
          type: StorableType.Ip,
          value: 'c',
        }],
        ['appId', {
          type: StorableType.String,
          value: 'a',
        }],
      ])),
    ]);
    expect(p.parse(line)).toEqual(toExpect);
  });
  it('should parse multiple lines', () => {
    const line = '1;2;3;4;a;b;c;d\n2;3;4;5;f;z;x;o';
    const p = new CSVDatasetParser(';');
    const toExpect = new Dataset([
      new DatasetEntry(new Map([
        ['userId', {
          type: StorableType.Int,
          value: 1,
        }],
        ['timestamp', {
          type: StorableType.Date,
          value: new Date('2001-02-28T23:00:00.000Z'),
        }],
        ['eventType', {
          type: StorableType.LoginType,
          value: 4,
        }],
        ['encodedIp', {
          type: StorableType.Ip,
          value: 'c',
        }],
        ['appId', {
          type: StorableType.String,
          value: 'a',
        }],
      ])),
      new DatasetEntry(new Map([
        ['userId', {
          type: StorableType.Int,
          value: 2,
        }],
        ['timestamp', {
          type: StorableType.Date,
          value: new Date('2001-03-31T22:00:00.000Z'),
        }],
        ['eventType', {
          type: StorableType.LoginType,
          value: 5,
        }],
        ['encodedIp', {
          type: StorableType.Ip,
          value: 'x',
        }],
        ['appId', {
          type: StorableType.String,
          value: 'f',
        }],
      ])),
    ]);
    expect(p.parse(line)).toEqual(toExpect);
  });
});
