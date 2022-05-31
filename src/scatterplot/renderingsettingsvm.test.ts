/* import SPRenderSettings from './renderersettings';
import SPRenderingSettingsSelectorVM from './renderingsettingsvm';

describe('SPRenderingSettingsSelectorVM', () => {
  it('should preserve the current selection', () => {
    const current = { guid: 10 };
    const d = new SPRenderingSettingsSelectorVM(
      // @ts-expect-error mock
      current,
    );
    expect(d.getSettings).toEqual(current);
  });

  it('should return changed height', () => {
    const current: SPRenderSettings = {
      domainX: [10, 10],
      domainY: [10, 10],
    };
    const d = new SPRenderingSettingsSelectorVM(
      // @ts-expect-error mock
      current,
    );
    d.setHeight([12, 12]);
    expect(d.getHeight).toEqual([12, 12]);
    expect(d.getWidth).toEqual(current.domainX);
    expect(d.getSettings).toEqual({ domainX: current.domainX, domainY: [12, 12] });
  });

  it('should return changed width', () => {
    const current: SPRenderSettings = {
      domainX: [10, 10],
      domainY: [10, 10],
    };
    const d = new SPRenderingSettingsSelectorVM(
      // @ts-expect-error mock
      current,
    );
    d.setWidth([12, 12]);
    expect(d.getWidth).toEqual([12, 12]);
    expect(d.getHeight).toEqual(current.domainY);
    expect(d.getSettings).toEqual({ domainX: [12, 12], domainY: current.domainY });
  });

  it('should return changed settings', () => {
    const current: SPRenderSettings = {
      domainX: [10, 10],
      domainY: [10, 10],
    };
    const d = new SPRenderingSettingsSelectorVM(
      // @ts-expect-error mock
      current,
    );
    const change: SPRenderSettings = {
      domainX: [20, 20],
      domainY: [20, 20],
    };
    d.updateSettings(change);
    expect(d.getSettings).toEqual(change);
    expect(d.getWidth).toEqual(change.domainX);
    expect(d.getHeight).toEqual(change.domainY);
  });
});
 */