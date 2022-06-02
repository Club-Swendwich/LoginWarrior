import { dsvFormat, DSV } from 'd3';
import { Dataset, DatasetEntry } from './dataset';
import { StorableType } from './datatypes';

/**
 * Interface that represents a generic loader fot a dataset
 */
export interface DatasetParser {
  /**
   * Parse a string in a dataset
   * @param content The string to eb parse
   * @returns The parsed dataset or an error if the parsing failed
   */
  parse: (content: string) => Dataset | ParseError;
}

/**
 * The reason behind the paring fail
 */
export enum ParseError {
  /**
   * The file format was invalid, eg. invalid json
   */
  InvalidFormat,
  /**
   * One of the entries was invalid, eg. not enough fields in a csv row
   */
  InvalidRow,
}

/**
 * Class that represents a csv parse made specifically for our dataset
 */
export class CSVDatasetParser implements DatasetParser {
  private readonly format: DSV;

  /**
   * Construct a new CSVDatasetParser by the csv separator
   * @param separator the csv separator by default the semicolon
   */
  constructor(separator: string = ';') {
    this.format = dsvFormat(separator);
  }

  public parse(content: string): Dataset | ParseError {
    if (content.trim() === '') {
      console.log('trimmino', content.trim());
      return ParseError.InvalidFormat;
    }

    const dsvRead = this.format.parseRows(content);
    return CSVDatasetParser.parseRows(dsvRead);
  }

  private static parseRows(data: string[][]): Dataset | ParseError {
    const mappedData = data.map(CSVDatasetParser.parseCSVEntry);
    if (mappedData.includes(undefined)) {
      console.log('rowino', data);
      return ParseError.InvalidRow;
    }
    return new Dataset(mappedData as DatasetEntry[]);
  }

  private static parseCSVEntry(entry: string[]): DatasetEntry | undefined {
    const userId = Number.parseInt(entry[0], 10)!;
    const timestamp = new Date(entry[2])!;
    const evenType = Number.parseInt(entry[3], 10)!;
    const encodedIp = entry[6];
    const appId = entry[4];

    if (userId === undefined
      || timestamp === undefined
      || evenType === undefined
      || encodedIp === undefined
      || appId === undefined) {
      return undefined;
    }

    return new DatasetEntry(new Map([
      ['userId', {
        type: StorableType.Int,
        value: userId,
      }],
      ['timestamp', {
        type: StorableType.Date,
        value: timestamp,
      }],
      ['eventType', {
        type: StorableType.LoginType,
        value: evenType,
      }],
      ['encodedIp', {
        type: StorableType.Ip,
        value: encodedIp,
      }],
      ['appId', {
        type: StorableType.String,
        value: appId,
      }],
    ]));
  }
}
