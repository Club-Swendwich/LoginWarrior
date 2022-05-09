import { RenderingSettingsSelector } from '../genericview/renderingsetting';
import { SankeySettings } from './sankRendererSettings';

class SPRenderingSettingsSelector implements RenderingSettingsSelector<SankeySettings> {
  public constructor(
    private currentSelection: SankeySettings,
  ) {}

  public get selectedSettings(): SankeySettings {
    return this.currentSelection;
  }
}

export default SPRenderingSettingsSelector;
