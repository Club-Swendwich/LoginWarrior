import { AnyViewJsonSerializer } from './jsonviewserializer';
import { ViewIOError } from './viewio';

describe('AnyViewJsonSerializer', () => {
  it('should reject null', () => {
    const s = new AnyViewJsonSerializer();

    expect(s.serialize(null)).toEqual(ViewIOError.Null);
  });

  it('should accept null if is enabled', () => {
    const s = new AnyViewJsonSerializer(true);

    expect(s.serialize(null)).toEqual('null');
  });

  it('should serialize non null', () => {
    const s = new AnyViewJsonSerializer(true);

    expect(s.serialize({ a: 1 })).toEqual('{"a":1}');
  });
});
