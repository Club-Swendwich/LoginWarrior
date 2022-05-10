import { observable, action } from 'mobx';
import SPRenderingSettingsSelector from './renderingsettings';
import SPRenderSettings from './renderersettings';

export default class RenderingSettingsSelectorVM {
  @observable
  private model: SPRenderingSettingsSelector;

  public constructor(settings: SPRenderSettings = {
    domainX: [10, 10],
    domainY: [10, 10],
  }) {
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @action
  updateSettings(settings: SPRenderSettings) : void {
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @action
  setWidth(domain: [number, number]): void {
    const tmpsettings = this.model.selectedSettings;
    const settings: SPRenderSettings = {
      domainX: domain,
      domainY: tmpsettings.domainY,
    };
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @action
  setHeight(domain: [number, number]): void {
    const tmpsettings = this.model.selectedSettings;
    const settings: SPRenderSettings = {
      domainX: tmpsettings.domainX,
      domainY: domain,
    };
    this.model = new SPRenderingSettingsSelector(settings);
  }
}
