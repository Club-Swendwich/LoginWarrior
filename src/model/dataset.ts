import { StorableType, StorableTypeToRepr } from './datatypes';

export type DatasetSignature = [string, StorableType][];

export class Dataset {
  constructor(
    private entries: DatasetEntry[],
  ) { }

  public get signature(): DatasetSignature {
    if (this.entries.length === 0) {
      return [];
    }
    return this.entries[0].signature;
  }
}

export type DatasetValue = {
  type: StorableType.Int
  value: StorableTypeToRepr<StorableType.Int>
} | {
  type: StorableType.String
  value: StorableTypeToRepr<StorableType.String>
} | {
  type: StorableType.LoginType
  value: StorableTypeToRepr<StorableType.LoginType>
};

export class DatasetEntry {
  constructor(
    private readonly data: Map<string, DatasetValue>,
  ) { }

  public get signature(): DatasetSignature {
    return Array.from(this.data.entries())
      .map(([s, v]) => [s, v.type]);
  }

  public get(k: string): any | undefined {
    return this.data.get(k)?.value;
  }
}
