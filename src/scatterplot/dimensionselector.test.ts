import { GraphableType, StorableType } from '../model/datatypes';
import { SPDimensionSelector } from './dimensionselector';

describe('SPDimensionSelector', () => {
  it('should preserve the current selection', () => {
    const current = { guid: 10 };
    const d = new SPDimensionSelector(
      // @ts-expect-error mock
      {},
      {},
      current,
    );
    expect(d.selectedDimensions).toEqual(current);
  });

  it('should return empty options when there are no fields in the signature', () => {
    const d = new SPDimensionSelector(
      // @ts-expect-error mock
      { compatibleStorableTypes: () => undefined },
      new Set(),
      {},
    );
    expect(d.availableFields()).toEqual({
      x: new Set(),
      y: new Set(),
      shape: new Set(),
      color: new Set(),
      size: new Set(),
    });
  });

  it('should return only the fields that are really transformable', () => {
    const d = new SPDimensionSelector(
      // @ts-expect-error mock
      {
        compatibleStorableTypes: (g) => {
          if (g === GraphableType.Int) {
            return new Set([StorableType.Int]);
          }
          return new Set();
        },
      },
      new Set([['a', StorableType.Int]]),
      {},
    );
    expect(d.availableFields()).toEqual({
      x: new Set(),
      y: new Set(),
      shape: new Set(),
      color: new Set(),
      size: new Set([['a', StorableType.Int]]),
    });
  });
  it('should throw an error when the selected field in invalid', () => {
    const d = new SPDimensionSelector(
      // @ts-expect-error mock
      { compatibleTransformers: () => new Set() },
      new Set(),
      {
        x: 'a',
      },
    );
    expect(() => d.availableMappers())
      .toThrowError('Cannot find the selected field in the signature!');
  });
  it('should return empty options when the there are no transformations', () => {
    const d = new SPDimensionSelector(
      // @ts-expect-error mock
      { compatibleTransformers: () => new Set() },
      new Set([['a', StorableType.Int]]),
      {
        x: 'a',
        y: 'a',
        size: 'a',
        shape: 'a',
        color: 'a',
      },
    );
    expect(d.availableMappers()).toEqual({
      x: new Set(),
      y: new Set(),
      shape: new Set(),
      color: new Set(),
      size: new Set(),
    });
  });
  it('should return the correct available mapping functions', () => {
    const d = new SPDimensionSelector(
      // @ts-expect-error mock
      { compatibleTransformers: () => new Set(['a']) },
      new Set([['a', StorableType.Int]]),
      {
        x: 'a',
        y: 'a',
        size: 'a',
        shape: 'a',
        color: 'a',
      },
    );
    expect(d.availableMappers()).toEqual({
      x: new Set([{
        from: StorableType.Int,
        identifier: 'a',
        to: GraphableType.Real,
      }]),
      y: new Set([{
        from: StorableType.Int,
        identifier: 'a',
        to: GraphableType.Real,
      }]),
      shape: new Set([{
        from: StorableType.Int,
        identifier: 'a',
        to: GraphableType.Shape,
      }]),
      color: new Set([{
        from: StorableType.Int,
        identifier: 'a',
        to: GraphableType.Color,
      }]),
      size: new Set([{
        from: StorableType.Int,
        identifier: 'a',
        to: GraphableType.Int,
      }]),
    });
  });
});
