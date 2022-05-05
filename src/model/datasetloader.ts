import { dsvFormat } from 'd3';
import { Dataset, DatasetEntry } from './dataset';
import { StorableType } from './datatypes';

export interface DatasetParser {
  parse: (content: string) => Dataset;
}

export class CSVDatasetParser implements DatasetParser {
  constructor(
    private separator: string,
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
