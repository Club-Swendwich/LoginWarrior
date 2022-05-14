import { RenderingSettingsSelector } from '../genericview/renderingsetting';
import { SankeySettings } from './sankRendererSettings';

export class SankeyRenderingSettingsSelector implements RenderingSettingsSelector<SankeySettings> {
  public constructor(
    private currentSelection: SankeySettings,
  ) {}

  public get selectedSettings(): SankeySettings {
    return this.currentSelection;
  }
}

export default SankeyRenderingSettingsSelector;
//export const SankeySettingsSelected = new SankeyRenderingSettingsSelector(SankeySettings);
