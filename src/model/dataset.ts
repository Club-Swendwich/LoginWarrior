import { StorableType, StorableTypeToRepr } from './datatypes';

export type DatasetSignature = Set<[string, StorableType]>;

export class Dataset {
  constructor(
    private _entries: DatasetEntry[],
  ) { }

  public get signature(): DatasetSignature {
    if (this.isEmpty()) {
      return new Set();
    }
    return this._entries[0].signature;
  }

  public entries(): DatasetEntry[] {
    return this._entries;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public get size(): number {
    return this._entries.length;
  }

  public insert(e: DatasetEntry): boolean {
    if (!this.isEmpty() && this.signature !== e.signature) {
      return false;
    }
    this._entries.push(e);
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
} | {
  type: StorableType.ApplicationType
  value: StorableTypeToRepr<StorableType.ApplicationType>
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
