import { observable, action, computed } from 'mobx';
import SPRenderingSettingsSelector from './renderingsettings';
import SPRenderSettings from './renderersettings';

export default class SPRenderingSettingsSelectorVM {
  @observable
  private model: SPRenderingSettingsSelector;

  public constructor(
    model: SPRenderingSettingsSelector,
  ) {
    this.model = model;
  }

  @action
  updateSettings(settings: SPRenderSettings) {
    this.model.selectedSettings = settings;
  }

  @action
  setWidth(domain: [number, number]) {
    const tmpsettings = this.model.selectedSettings;
    const settings: SPRenderSettings = {
      domainX: domain,
      domainY: tmpsettings.domainY,
    };
    this.model.selectedSettings = settings;
  }

  @action
  setHeight(domain: [number, number]) {
    const tmpsettings = this.model.selectedSettings;
    const settings: SPRenderSettings = {
      domainX: tmpsettings.domainX,
      domainY: domain,
    };
    this.model.selectedSettings = settings;
  }

  @computed
  get settings(): SPRenderSettings {
    return this.model.selectedSettings;
  }

  @computed
  get width(): [number, number] {
    return this.model.selectedSettings.domainX;
  }

  @computed
  get height(): [number, number] {
    return this.model.selectedSettings.domainY;
  }
}
