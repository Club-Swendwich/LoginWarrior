import { RenderingSettingsSelector } from '../genericview/renderingsetting';
import SPRenderSettings from './renderersettings';

class SPRenderingSettingsSelector implements RenderingSettingsSelector<SPRenderSettings> {
  public constructor(
    private currentSelection: SPRenderSettings,
  ) {}

  public get selectedSettings(): SPRenderSettings {
    return this.currentSelection;
  }
}

export default SPRenderingSettingsSelector;
