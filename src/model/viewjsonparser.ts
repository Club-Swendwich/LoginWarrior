import { SPDimensions } from '../scatterplot/dimensions';
import SPRenderSettings from '../scatterplot/renderersettings';
import { DatasetSignature } from './dataset';

class ViewJson {
  constructor(
    private datasetSignature: DatasetSignature,
    private scatterSettings: SPRenderSettings,
    private scatterDimensions: SPDimensions,
    private sankeySettings: any,
    private sankeyDimensions: any,
  ) {}

  public get viewToJson(): string {
    return JSON.stringify(this);
  }

  public get signature(): DatasetSignature {
    return this.datasetSignature;
  }

  public get spSettings(): SPRenderSettings {
    return this.scatterSettings;
  }

  public get spDimensions(): SPDimensions {
    return this.scatterDimensions;
  }

  public get skSettings(): any {
    return this.sankeySettings;
  }

  public get skDimensions(): any {
    return this.sankeyDimensions;
  }
}

export function viewFromJson(stringJson: string): ViewJson {
  const data = JSON.parse(stringJson);
  const datasetSignature = data.signature;
  const scatterSettings = data.spSettings;
  const scatterDimensions = data.spDimensions;
  const sankeySettings = data.skSettings;
  const sankeyDimensions = data.skDimensions;

  return new ViewJson(
    datasetSignature,
    scatterSettings,
    scatterDimensions,
    sankeySettings,
    sankeyDimensions,
  );
}

export default ViewJson;
