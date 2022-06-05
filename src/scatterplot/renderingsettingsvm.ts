import { observable, action, computed } from 'mobx';
import SPRenderingSettingsSelector from './renderingsettings';
import SPRenderSettings from './renderersettings';

export default class SPRenderingSettingsSelectorVM {
  @observable
  private model: SPRenderingSettingsSelector;

  public constructor(settings: SPRenderSettings = {
    domainX: [5, 10],
    domainY: [5, 10],
  }) {
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @action
  updateSettings(settings: SPRenderSettings) {
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @action
  setWidth(domain: [number, number]) {
    const tmpsettings = this.model.selectedSettings;
    const settings: SPRenderSettings = {
      domainX: domain,
      domainY: tmpsettings.domainY,
    };
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @action
  setHeight(domain: [number, number]) {
    const tmpsettings = this.model.selectedSettings;
    const settings: SPRenderSettings = {
      domainX: tmpsettings.domainX,
      domainY: domain,
    };
    this.model = new SPRenderingSettingsSelector(settings);
  }

  @computed
  get getSettings(): SPRenderSettings {
    return this.model.selectedSettings;
  }

  @computed
  get getWidth(): [number, number] {
    return this.model.selectedSettings.domainX;
  }

  @computed
  get getHeight(): [number, number] {
    return this.model.selectedSettings.domainY;
  }
}
