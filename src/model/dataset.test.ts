import { Dataset, DatasetEntry } from './dataset';

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
});

describe('DatasetEntry', () => {
    it('should have an empty signature when empty', () => {
        const e = new DatasetEntry(new Map());
        expect(e.signature).toEqual(new Set());
    });
    it('should respect his signature', () => {
        // @ts-expect-error mock
        const e = new DatasetEntry(new Map([
            ["a", { type: 4 }],
        ]));
        expect(e.signature).toEqual(new Set([
            ["a", 4]
        ]));
    });
    it('should be queryable correctly', () => {
        // @ts-expect-error mock
        const e = new DatasetEntry(new Map([
            ["a", { value: 4 }],
        ]));
        expect(e.get("a")).toEqual(4);
        expect(e.get("7")).toBeUndefined();
    });
});
