import { MapperError } from '../genericview/mapper';
import { SPMapper } from './mapper';

describe('scatterplot mapper', () => {
  it('should handle an empty dataset', () => {
    const dim = {
      x: ['a', { guid: 42 }],
      y: ['a', { guid: 42 }],
      size: ['a', { guid: 42 }],
      shape: ['a', { guid: 42 }],
      color: ['a', { guid: 42 }],
    };

    const prov = {
      get: () => ((x: number) => x + 1),
    };

    const m = new SPMapper(
      prov,
      // @ts-expect-error We aren't mocking the entire  object
      dim,
    );

    const emptyDs = {
      entries: () => [],
    };

    // @ts-expect-error We aren't mocking the entire  object
    expect(m.map(emptyDs)).toEqual([]);
  });

  it('should map a whole dataset', () => {
    const dim = {
      x: ['a', { guid: 42 }],
      y: ['a', { guid: 42 }],
      size: ['a', { guid: 42 }],
      shape: ['a', { guid: 42 }],
      color: ['a', { guid: 42 }],
    };

    const prov = {
      get: () => ((x: number) => x + 1),
    };

    const m = new SPMapper(
      prov,
      // @ts-expect-error We aren't mocking the entire  object
      dim,
    );

    const ds = {
      entries: () => [
        { get: () => 1 },
        { get: () => 2 },
      ],
    };

    // @ts-expect-error We aren't mocking the entire  object
    expect(m.map(ds)).toEqual([
      {
        color: 2,
        shape: 2,
        size: 2,
        x: 2,
        y: 2,
      },
      {
        color: 3,
        shape: 3,
        size: 3,
        x: 3,
        y: 3,
      },
    ]);
  });

  it('should update his settings', () => {
    const dim = {
      x: ['a', { guid: 42 }],
      y: ['a', { guid: 42 }],
      size: ['a', { guid: 42 }],
      shape: ['a', { guid: 42 }],
      color: ['a', { guid: 42 }],
    };

    const prov = {
      get: ({ guid }) => {
        if (guid !== 43) {
          return () => { throw new Error('Invalid mapper'); };
        }
        return () => 'a';
      },
    };

    const m = new SPMapper(
      // @ts-expect-error We aren't mocking the entire  object
      prov,
      dim,
    );

    const newDim = {
      x: ['a', { guid: 43 }],
      y: ['a', { guid: 43 }],
      size: ['a', { guid: 43 }],
      shape: ['a', { guid: 43 }],
      color: ['a', { guid: 43 }],
    };

    // @ts-expect-error We aren't mocking the entire  object
    m.updateMapLogic(newDim);

    const ds = {
      entries: () => [
        { get: () => 1 },
      ],
    };

    // @ts-expect-error We aren't mocking the entire  object
    expect(m.map(ds)).toEqual([
      {
        color: 'a',
        shape: 'a',
        size: 'a',
        x: 'a',
        y: 'a',
      },
    ]);
  });

  it('should handle a non present signature', () => {
    const dim = {
      x: ['a', { guid: 42 }],
      y: ['a', { guid: 42 }],
      size: ['a', { guid: 42 }],
      shape: ['a', { guid: 42 }],
      color: ['a', { guid: 42 }],
    };

    const prov = {
      get: () => { throw new Error(); },
    };

    const m = new SPMapper(
      prov,
      // @ts-expect-error We aren't mocking the entire  object
      dim,
    );

    const ds = {
      entries: () => [
        { get: () => 1 },
        { get: () => 2 },
      ],
    };

    // @ts-expect-error We aren't mocking the entire  object
    expect(m.map(ds)).toEqual(MapperError.UnknownSignature);
    // @ts-expect-error We aren't mocking the entire  object
    m.updateMapLogic(dim);
    // @ts-expect-error We aren't mocking the entire  object
    expect(m.map(ds)).toEqual(MapperError.UnknownSignature);
  });

  it('should handle a non present field', () => {
    const dim = {
      x: ['a', { guid: 42 }],
      y: ['a', { guid: 42 }],
      size: ['a', { guid: 42 }],
      shape: ['a', { guid: 42 }],
      color: ['a', { guid: 42 }],
    };

    const prov = {
      get: () => (x: any) => x,
    };

    const m = new SPMapper(
      prov,
      // @ts-expect-error We aren't mocking the entire  object
      dim,
    );

    const ds = {
      entries: () => [
        { get: () => { throw new Error(); } },
      ],
    };

    // @ts-expect-error We aren't mocking the entire  object
    expect(m.map(ds)).toEqual(MapperError.UnknownField);
  });
});
