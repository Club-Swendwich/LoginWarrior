import SPRenderingSettingsSelectorVM from './renderingsettingsvm';

const mockStruct = {
  domainY: [0, 1],
  domainX: [2, 3],
};

describe('SPRenderingSettingsSelectorVM', () => {
  it('should preserve the current selection', () => {
    const d = new SPRenderingSettingsSelectorVM(
      {
        // @ts-expect-error mock
        selectedSettings: mockStruct,
      },
    );

    expect(d.settings).toEqual(mockStruct);
    expect(d.height).toEqual(mockStruct.domainY);
    expect(d.width).toEqual(mockStruct.domainX);
  });

  it('should return changed height', () => {
    const selectedSettings: [number, number][] = [[0, 1], [2, 3]];
    const d = new SPRenderingSettingsSelectorVM(
      {
        // @ts-expect-error mock
        selectedSettings: mockStruct,
      },
    );

    expect(d.settings).toEqual(mockStruct);
    expect(d.height).toEqual(selectedSettings[0]);
    expect(d.width).toEqual(selectedSettings[1]);

    d.setHeight([12, 12]);

    expect(d.height).toEqual([12, 12]);
    expect(d.width).toEqual(selectedSettings[1]);
    expect(d.settings).toEqual({ domainX: mockStruct.domainX, domainY: [12, 12] });
  });

  it('should return changed width', () => {
    const selectedSettings = [[0, 1], [2, 3]];
    const d = new SPRenderingSettingsSelectorVM(
      {
        // @ts-expect-error mock
        selectedSettings: mockStruct,
      },
    );

    expect(d.settings).toEqual(mockStruct);
    expect(d.height).toEqual(selectedSettings[0]);
    expect(d.width).toEqual(selectedSettings[1]);

    d.setWidth([12, 12]);

    expect(d.width).toEqual([12, 12]);
    expect(d.height).toEqual(selectedSettings[0]);
    expect(d.settings).toEqual({ domainX: [12, 12], domainY: mockStruct.domainY });
  });

  it('should return changed settings', () => {
    const selectedSettings = [[0, 1], [2, 3]];
    const d = new SPRenderingSettingsSelectorVM(
      {
        // @ts-expect-error mock
        selectedSettings: mockStruct,
      },
    );

    expect(d.settings).toEqual(mockStruct);
    expect(d.height).toEqual(selectedSettings[0]);
    expect(d.width).toEqual(selectedSettings[1]);

    const newSettings:[number, number][] = [[0, 1], [2, 3]];

    d.updateSettings({ domainX: newSettings[1], domainY: newSettings[0] });
    expect(d.settings).toEqual({ domainX: newSettings[1], domainY: newSettings[0] });
    expect(d.width).toEqual(newSettings[1]);
    expect(d.height).toEqual(newSettings[0]);
  });
});
