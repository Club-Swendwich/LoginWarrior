import SPRenderingSettingsSelector from './renderingsettings';

describe('SPRenderingSettingsSelector', () => {
  it('should preserve the current selection', () => {
    const current = { guid: 10 };
    const d = new SPRenderingSettingsSelector(
      // @ts-expect-error mock
      current,
    );
    expect(d.selectedSettings).toEqual(current);
  });
});
