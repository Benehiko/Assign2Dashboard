import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {ProjectdataService} from '../projectdata.service';
import {Project} from '../Project';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit {

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Employees', 'Customer Satisfaction', 'Budget', 'Days'];

  public radarChartData: ChartDataSets[] = [
    {data: [12, 59, 90, 81, 56, 55, 40], label: 'Aim'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Current'}
  ];
  public radarChartType: ChartType = 'radar';

  projects: Project[];

  constructor(private data: ProjectdataService) {
  }

  ngOnInit() {
    this.projects = this.data.getProjects();
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
