import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

export interface RadarChart {
  name: string;
  radarChartOptions: RadialChartOptions;
  radarChartLabels: Label[];
  radarChartData: ChartDataSets[];
  radarChartType: ChartType;
}
