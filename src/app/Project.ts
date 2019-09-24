import {RadarChart} from './RadarChart';

export interface Project {
  id?: number;
  name: string;
  manager: string;
  budgetUsed: number;
  budgetTotal: number;
  budgetPercent: number;
  deadline: Date;
  daysleft: number;
  staff: number;
  employed: number;
  custsat: number;
  complete: boolean;
  radarChart: RadarChart;
}
