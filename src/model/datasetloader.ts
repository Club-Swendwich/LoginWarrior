import { dsvFormat } from 'd3';
import { Dataset, DatasetEntry } from './dataset';
import { StorableType } from './datatypes';

/**
 * Interface that represents a generic loader fot a dataset
 */
export interface DatasetParser {
  /**
   * Parse a string in a dataset
   * @param content The string to eb parse
   * @returns The parsed dataset or undefined if the parsing failed
   */
  parse: (content: string) => Dataset | undefined;
}

/**
 * Class that represents a csv parse made specifically for our dataset
 */
export class CSVDatasetParser implements DatasetParser {
  /**
   * Construct a new CSVDatasetParser by the csv separator
   * @param separator the csv separator by default the semicolon
   */
  constructor(
    private separator: string = ';',
  ) { }

  public parse(content: string): Dataset | undefined {
    return CSVDatasetParser.parseRows(dsvFormat(this.separator).parseRows(content));
  }

  private static parseRows(data: string[][]): Dataset | undefined {
    const mappedData = data.map(CSVDatasetParser.parseCSVEntry);
    if (mappedData.includes(undefined)) {
      return undefined;
    }
    return new Dataset(mappedData as DatasetEntry[]);
  }

  private static parseCSVEntry(entry: string[]): DatasetEntry | undefined {
    const userId = Number.parseInt(entry[0], 10)!;
    const timestamp = Number.parseInt(entry[2], 10)!;
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
        type: StorableType.Int,
        value: timestamp,
      }],
      ['eventType', {
        type: StorableType.LoginType,
        value: evenType,
      }],
      ['encodedIp', {
        type: StorableType.String,
        value: encodedIp,
      }],
      ['appId', {
        type: StorableType.String,
        value: appId,
      }],
    ]));
  }
}
