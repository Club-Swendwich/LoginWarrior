import { GraphableType, StorableType } from './datatypes';
import { Transformer } from './transformer';

describe('Transformer', () => {
  it('should return undefined on an unknown signature', () => {
    const t = Transformer.new();
    // @ts-expect-error We aren't mocking the entire object
    expect(t.get({})).toBeUndefined();
  });

  it('should retrive correctly an already inserted signature', () => {
    const t = Transformer.new();
    const k = { from: StorableType.Int, to: GraphableType.Color, identifier: 'test' };
    const v = { guid: 420 };

    // @ts-expect-error We aren't mocking the entire object
    t.add(k, v);
    expect(t.get(k)).toEqual(v);
  });

  it('should correctly perform query when is empty', () => {
    const t = Transformer.new();
    expect(t.compatibleStorableTypes(GraphableType.Color)).toEqual(new Set());
    expect(t.compatibleTransformers(StorableType.Int, GraphableType.Color)).toEqual(new Set());
  });

  function sameMembers(_a: any, _b: any) {
    const a = Array.from(_a);
    const b = Array.from(_b);
    expect(a).toEqual(expect.arrayContaining(b));
    expect(b).toEqual(expect.arrayContaining(a));
  }

  it('should correctly discriminate between different signatures', () => {
    const t = Transformer.new();
    // @ts-expect-error We aren't mocking the entire object
    t.add({ from: StorableType.Int, to: GraphableType.Color, identifier: 'a' }, {});
    // @ts-expect-error We aren't mocking the entire object
    t.add({ from: StorableType.String, to: GraphableType.Color, identifier: 'b' }, {});
    // @ts-expect-error We aren't mocking the entire object
    t.add({ from: StorableType.Int, to: GraphableType.Shape, identifier: 'c' }, {});
    // @ts-expect-error We aren't mocking the entire object
    t.add({ from: StorableType.Int, to: GraphableType.Color, identifier: 'd' }, {});

    sameMembers(
      t.compatibleStorableTypes(GraphableType.Color),
      [StorableType.Int, StorableType.String],
    );

    sameMembers(
      t.compatibleTransformers(StorableType.Int, GraphableType.Color),
      ['a', 'd'],
    );
  });
});
