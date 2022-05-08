import { Dataset, DatasetEntry, EntryLookUpError } from './dataset';

describe('Dataset', () => {
  it('should have an empty signature when empty', () => {
    const d = new Dataset([]);
    expect(d.signature).toEqual(new Set());
  });
  it('should be effectively empty when empty', () => {
    const d = new Dataset([]);
    expect(d.isEmpty()).toBeTruthy();
    expect(d.size).toEqual(0);
    // @ts-expect-error mock
    d.insert({});
    expect(d.isEmpty()).toBeFalsy();
    expect(d.size).toEqual(1);
  });
  it('should contains the correct entries', () => {
    const d = new Dataset([]);
    const values = [
      { signature: 3, value: 4 },
      { signature: 3, value: 5 },
      { signature: 3, value: 6 },
    ];
    for (const v of values) {
      // @ts-expect-error mock
      d.insert(v);
    }
    expect(d.entries()).toEqual(values);
  });
  it('should respect his signature on insert', () => {
    const d = new Dataset([]);

    expect(d.insert({
      // @ts-expect-error mock
      signature: 3,
    })).toBeTruthy();
    expect(d.size).toEqual(1);

    expect(d.insert({
      // @ts-expect-error mock
      signature: 3,
    })).toBeTruthy();
    expect(d.size).toEqual(2);

    expect(d.insert({
      // @ts-expect-error mock
      signature: 4,
    })).toBeFalsy();
    expect(d.size).toEqual(2);
  });
  it('should respect mappings', () => {
    const d = new Dataset([
      // @ts-expect-error mock
      1, 2, 3
    ]);
    const dPlusOne = new Dataset([
      // @ts-expect-error mock
      2, 3, 4
    ]);
    // @ts-expect-error mock
    d.map((x) => x + 1);

    expect(d).toEqual(dPlusOne);
  });
});

describe('DatasetEntry', () => {
  it('should have an empty signature when empty', () => {
    const e = new DatasetEntry(new Map());
    expect(e.signature).toEqual(new Set());
  });
  it('should respect his signature', () => {
    // @ts-expect-error mock
    const e = new DatasetEntry(new Map([
      ['a', { type: 4 }],
    ]));
    expect(e.signature).toEqual(new Set([
      ['a', 4],
    ]));
  });
  it('should be queryable correctly', () => {
    // @ts-expect-error mock
    const e = new DatasetEntry(new Map([
      ['a', { value: 4 }],
    ]));
    expect(e.get('a')).toEqual({ value: 4 });
    expect(e.get('7')).toEqual(EntryLookUpError.NotFound);
  });
  it('should be idempotent and preserve order on map id', () => {
    const d = new Dataset([
      // @ts-expect-error mock
      'a', 'b', 'c'
    ]);
    const dSame = new Dataset([
      // @ts-expect-error mock
      'a', 'b', 'c'
    ]);

    d.map((a) => a)
    expect(d).toEqual(dSame);
  });
});
