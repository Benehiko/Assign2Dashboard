import {Injectable} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {RadarChart} from './RadarChart';

@Injectable({
  providedIn: 'root'
})
export class RadarchartService {

  constructor() {
  }

  public genChart(seriesA, seriesB): RadarChart {
    const radarChartOptions: RadialChartOptions = {
      responsive: true,
    };
    const radarChartLabels: Label[] = ['Employees', 'Customer Satisfaction', 'Budget', 'Days'];
    const radarChartData: ChartDataSets[] = [
      {data: seriesA, label: 'Goal'},
      {data: seriesB, label: 'Current'}
    ];
    const radarChartType: ChartType = 'radar';
    return {name: 'default', radarChartOptions, radarChartLabels, radarChartData, radarChartType};
  }

}
