import { StorableType, StorableTypeToRepr } from './datatypes';

export type DatasetSignature = Set<[string, StorableType]>;

export class Dataset {
  constructor(
    private currentEntries: DatasetEntry[],
  ) { }

  public get signature(): DatasetSignature {
    if (this.isEmpty()) {
      return new Set();
    }
    return this.currentEntries[0].signature;
  }

  public entries(): DatasetEntry[] {
    return this.currentEntries;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public get size(): number {
    return this.currentEntries.length;
  }

  public insert(e: DatasetEntry): boolean {
    if (!this.isEmpty() && this.signature !== e.signature) {
      return false;
    }
    this.currentEntries.push(e);
    return true;
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
    return new Set(Array.from(this.data.entries())
      .map(([s, v]) => [s, v.type]));
  }

  public get(k: string): any | undefined {
    return this.data.get(k)?.value;
  }
}
