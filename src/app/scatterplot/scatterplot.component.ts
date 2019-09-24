import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {ProjectdataService} from '../projectdata.service';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  // scatter
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    legend: {display: true, position: 'top'}
  };
  public chartLegend = true;
  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        {x: 1, y: 1, r: 5},
        {x: 2, y: 3, r: 20},
        {x: 3, y: -2},
        {x: 4, y: 4},
        {x: 5, y: -3},
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  constructor(private data: ProjectdataService) {
  }

  ngOnInit() {
    const projects = this.data.getProjects();
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
