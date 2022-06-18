import { LoginType, StorableType, GraphableType } from '../model/datatypes';
import { Transformer } from '../model/transformer';

export function addScatterplotTransformations(transformer: Transformer): void {
  const colorMap = new Map();
  function getColor(id: number) : number[] {
    if (!colorMap.has(id)) {
      const r = Math.random();
      const g = Math.random();
      const b = Math.random();

      const color = [r, g, b, 1];

      colorMap.set(id, color);
    }
    return colorMap.get(id);
  }

  const eventColorMap = new Map();
  eventColorMap.set(1, [0, 1, 0, 1]);
  eventColorMap.set(2, [1, 0, 0, 1]);
  eventColorMap.set(3, [0, 0, 1, 1]);
  eventColorMap.set(4, [0, 1, 1, 1]);
  eventColorMap.set(5, [0, 1, 0, 0]);
  eventColorMap.set(6, [1, 0, 0, 0]);
  eventColorMap.set(7, [0, 0, 1, 0]);
  function getEventColor(event: LoginType) : number[] {
    return eventColorMap.get(event);
  }

  function getLinLoutvsFailColor(event: LoginType) : number[] {
    if (event === LoginType.LoginFail) { return eventColorMap.get(event); }
    return eventColorMap.get(4);
  }

  function getLinvsLoutColor(event: LoginType) : number[] {
    if (event === LoginType.LoginFail) { return [0, 0, 0, 0]; }
    return eventColorMap.get(event);
  }

  function getLinvsFailColor(event: LoginType) : number[] {
    if (event === LoginType.Logout) { return [0, 0, 0, 0]; }
    return eventColorMap.get(event);
  }

  function getLoutvsFailColor(event: LoginType) : number[] {
    if (event === LoginType.LoginSuccess) { return [0, 0, 0, 0]; }
    return eventColorMap.get(event);
  }

  const eventShapeMap = new Map();
  eventShapeMap.set(1, 'square');
  eventShapeMap.set(2, 'cross');
  eventShapeMap.set(3, 'triangle');
  function getEventShape(event: LoginType) : string {
    return eventShapeMap.get(event);
  }

  const appColorMap = new Map();
  appColorMap.set('HRW', [0.274, 0.941, 0.941, 1]);
  appColorMap.set('GTL', [1, 0.882, 0.098, 1]);
  appColorMap.set('HRC', [0.941, 0.196, 0.901, 1]);
  appColorMap.set('HR1', [0.603, 0.388, 0.141, 1]);
  appColorMap.set('HRM', [0.980, 0.745, 0.831, 1]);
  appColorMap.set('HUT', [0.274, 0.6, 0.564, 1]);
  appColorMap.set('ERM', [0.862, 0.745, 1, 1]);
  appColorMap.set('DWH', [0.501, 0.501, 0, 1]);
  appColorMap.set('HTR', [0.749, 0.937, 0.270, 1]);
  appColorMap.set('HSP', [0.235, 0.705, 0.294, 1]);
  appColorMap.set('GAW', [0, 0, 0.458, 1]);
  appColorMap.set('MD7', [0.262, 0.388, 0.847, 1]);
  appColorMap.set('TM3', [0.960, 0.509, 0.192, 1]);
  appColorMap.set('HCF', [0.501, 0, 0, 1]);
  function getAppColor(app: string) : number[] {
    return appColorMap.get(app);
  }

  const appIdxMap = new Map();
  appIdxMap.set('HRW', 1);
  appIdxMap.set('GTL', 2);
  appIdxMap.set('HRC', 3);
  appIdxMap.set('HR1', 4);
  appIdxMap.set('HRM', 5);
  appIdxMap.set('HUT', 6);
  appIdxMap.set('ERM', 7);
  appIdxMap.set('DWH', 8);
  appIdxMap.set('HTR', 9);
  appIdxMap.set('HSP', 10);
  appIdxMap.set('GAW', 11);
  appIdxMap.set('MD7', 12);
  appIdxMap.set('TM3', 13);
  appIdxMap.set('HCF', 14);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getAppIdx(app: string) : number[] {
    return appIdxMap.get(app);
  }

  transformer.add({ identifier: 'int identity', from: StorableType.Int, to: GraphableType.Int }, (a: number) : any => a.toFixed(0));
  transformer.add({ identifier: 'int identity', from: StorableType.Int, to: GraphableType.Real }, (a: number) : any => a);
  transformer.add({ identifier: 'int to color', from: StorableType.Int, to: GraphableType.Color }, (a: number) : any => getColor(a));
  transformer.add({ identifier: 'timestamp to int', from: StorableType.Date, to: GraphableType.Int }, (a: Date) : any => a.getTime().toFixed(0));
  transformer.add({ identifier: 'timestamp to real', from: StorableType.Date, to: GraphableType.Real }, (a: Date) : any => a.getTime());
  transformer.add({ identifier: 'giorno del mese', from: StorableType.Date, to: GraphableType.Real }, (a: Date) : any => a.getDate());
  transformer.add({ identifier: 'minuti dalla mezzanotte', from: StorableType.Date, to: GraphableType.Real }, (a: Date) : any => a.getHours() * 60 + a.getMinutes() * 60 + a.getMinutes());
  transformer.add({ identifier: 'ora del giorno', from: StorableType.Date, to: GraphableType.Real }, (a: Date) : any => a.getHours());
  transformer.add({ identifier: 'event type', from: StorableType.LoginType, to: GraphableType.Color }, (a: LoginType) : any => getEventColor(a));
  transformer.add({ identifier: 'vs fails', from: StorableType.LoginType, to: GraphableType.Color }, (a: LoginType) : any => getLinLoutvsFailColor(a));
  transformer.add({ identifier: 'login vs fails', from: StorableType.LoginType, to: GraphableType.Color }, (a: LoginType) : any => getLinvsFailColor(a));
  transformer.add({ identifier: 'logout vs fails', from: StorableType.LoginType, to: GraphableType.Color }, (a: LoginType) : any => getLoutvsFailColor(a));
  transformer.add({ identifier: 'login vs logout', from: StorableType.LoginType, to: GraphableType.Color }, (a: LoginType) : any => getLinvsLoutColor(a));
  transformer.add({ identifier: 'event to shape', from: StorableType.LoginType, to: GraphableType.Shape }, (a: LoginType) : any => getEventShape(a));
  transformer.add({ identifier: 'app color', from: StorableType.String, to: GraphableType.Color }, (a: string) : any => getAppColor(a));
  transformer.add({ identifier: 'ip to int', from: StorableType.Ip, to: GraphableType.Int }, (a: string) : any => parseInt(a.replace('ip_', ''), 10));
  transformer.add({ identifier: 'ip to real', from: StorableType.Ip, to: GraphableType.Real }, (a: string) : any => parseInt(a.replace('ip_', ''), 10));
  transformer.add({ identifier: 'ip to color', from: StorableType.Ip, to: GraphableType.Color }, (a: string) : any => getColor(parseInt(a.replace('ip_', ''), 10)));
  transformer.add({ identifier: '1', from: StorableType.Int, to: GraphableType.Int }, () : any => 1);
  transformer.add({ identifier: '2', from: StorableType.Int, to: GraphableType.Int }, () : any => 2);
  transformer.add({ identifier: '3', from: StorableType.Int, to: GraphableType.Int }, () : any => 3);
  transformer.add({ identifier: '4', from: StorableType.Int, to: GraphableType.Int }, () : any => 4);
  transformer.add({ identifier: '5', from: StorableType.Int, to: GraphableType.Int }, () : any => 5);
  transformer.add({ identifier: 'default', from: StorableType.Int, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
  transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Real }, () : any => 1);
  transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
  transformer.add({ identifier: 'default', from: StorableType.LoginType, to: GraphableType.Shape }, () : any => 'square');
  transformer.add({ identifier: 'default', from: StorableType.String, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
  transformer.add({ identifier: 'default', from: StorableType.Ip, to: GraphableType.Color }, () : any => [0, 0, 0, 1]);
}
