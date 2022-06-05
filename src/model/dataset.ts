import { StorableType, StorableTypeToRepr } from './datatypes';

/**
 * Represents the signature of the dataset, in particular who are his fields
 * and what type is stored in them for example in a dataset with key: 'a'
 * and value: 1 it's type is { ['a', integer]}
 */
export type DatasetSignature = Set<[string, StorableType]>;

/**
 * Represents the dataset.
 */
export class Dataset {
  /**
   * Constructs the dataset by a list of entries.
   * @param currentEntries: the entries (they must be uniform)
   * @param coherenceCheck: is the dataset should be checked for coherence,
   * this will slow down all the operations
   */
  constructor(
    private currentEntries: DatasetEntry[],
    private readonly coherenceCheck: boolean = false,
  ) { this.coherence(); }

  /**
   * Gets the signature of the entries in the dataset.
   * @returns the signature
   */
  public get signature(): DatasetSignature {
    if (this.isEmpty()) {
      return new Set();
    }
    return this.currentEntries[0].signature;
  }

  /**
   * Performs an in place map operation on all the entries in the dataset
   * @param a: the map function (must maintain coherence in the dataset structure)
   */
  public map(a: (d: DatasetEntry) => DatasetEntry) {
    this.currentEntries = this.currentEntries.map(a);
    this.coherence();
  }

  /**
   * Returns  the list of the entries in the dataset.
   * @returns the entries
   */
  public entries(): DatasetEntry[] {
    return this.currentEntries;
  }

  /**
   * Checks if the dataset is empty
   * @returns true is the the dataset has no entries
   */
  public isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Gets the size of the entries.incoherent dataset
   */
  public get size(): number {
    return this.currentEntries.length;
  }

  private coherence() {
    if (!this.isEmpty() && this.coherenceCheck) {
      const { signature } = this;
      if (this.currentEntries
        .map((d) => d.signature === signature)
        .includes(false)) {
        throw new Error('incoherent dataset');
      }
    }
  }

  /**
   * Insert a new entry in the dataset.
   * @param e the nre entry: must be coherent with the dataset signature.
   * @returns true if the elements in correctly inserted false otherwise.
   */
  public insert(e: DatasetEntry): boolean {
    if (!this.isEmpty() && this.signature !== e.signature) {
      return false;
    }
    this.currentEntries.push(e);
    return true;
  }
}

/**
 * The type of values that can be stored in the dataset tagged by type
 */
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

/**
 * Represents the various error can be encountered when querying a
 * property on the dataset
 */
export enum EntryLookUpError {
  /**
   * The requested property is not present.
   */
  NotFound,
}

/**
 * Represent a specific entry on the dataset
 */
export class DatasetEntry {
  /**
   * Construct an entry by its fields and values
   * @param data
   */
  constructor(
    private readonly data: Map<string, DatasetValue>,
  ) { }

  /**
   * Returns the signature of the entry (same as the dataset)
   */
  public get signature(): DatasetSignature {
    return new Set(Array.from(this.data.entries())
      .map(([s, v]) => [s, v.type]));
  }

  /**
   * Gets a a value in the dataset
   * @param k the name of the field
   * @returns the value if the field is present of an error
   */
  public get(k: string): DatasetValue | EntryLookUpError {
    const maybeEntry = this.data.get(k);
    if (maybeEntry === undefined) {
      return EntryLookUpError.NotFound;
    }
    return maybeEntry;
  }
}
