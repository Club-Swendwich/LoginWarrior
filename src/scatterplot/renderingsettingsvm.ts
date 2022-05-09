import { observable, action } from 'mobx'
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
}
