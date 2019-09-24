import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectdataService} from '../projectdata.service';
import {Project} from '../Project';
import {RadarChart} from '../RadarChart';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {from} from 'rxjs';


/*interface Project {
  id?: number;
  name: string;
  manager: string;
  budget: number;
  deadline: Date;
}*/

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  page = 1;
  pageSize = 5;
  proj: Project[];
  collectionSize: number;
  radarCharts = [];
  dataSource: MatTableDataSource<Project>;

  displayedColumns = ['id', 'name', 'manager', 'budgetPercent', 'deadline', 'daysleft', 'status', 'satisfaction', 'radarChart'];

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  // Pie
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = ['0 Hearts', '1 Hearts', '2 Hearts', '3 Hearts', '4 Hearts', '5 Hearts'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)',
        'rgba(0, 255, 0, 0.3)',
        'rgba(0, 0, 255, 0.3)',
        'rgba(255, 255, 0, 0.3)',
        'rgba(160, 0, 10, 0.3)',
        'rgba(255, 145, 0, 0.3)'],
    },
  ];


  // PolarArea
  polarAreaChartLabels: Label[] = ['0 Hearts', '1 Hearts', '2 Hearts', '3 Hearts', '4 Hearts', '5 Hearts'];
  polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  polarAreaLegend = true;

  polarAreaChartType: ChartType = 'polarArea';

  kpi = 0;

  constructor(private data: ProjectdataService) {
  }

  ngOnInit() {
    this.proj = this.data.getProjects();
    this.dataSource = new MatTableDataSource(this.proj);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.collectionSize = this.proj.length;
    const rc = [];
    for (const i of this.proj) {
      const d: RadarChart = {
        name: i.name,
        radarChartLabels: i.radarChart.radarChartLabels,
        radarChartData: i.radarChart.radarChartData,
        radarChartType: i.radarChart.radarChartType,
        radarChartOptions: i.radarChart.radarChartOptions,
      };

      rc.push(d);
    }
    console.log(rc);
    const chunkSize = 4;
    this.radarCharts = this.chunk(rc, chunkSize);

    const staffd = this.getData();
    this.barChartOptions = staffd.barChartOptions;
    this.barChartData = staffd.barChartData;
    this.barChartLabels = staffd.barChartLabels;
    this.barChartPlugins = staffd.barChartPlugins;
    this.barChartType = staffd.barChartType;
    this.barChartLegend = staffd.barChartLegend;

    const completedProj = this.getCompletedProjects(this.proj);
    // this.pieChartLabels = [completedProj[0]completedProj.map(item => [item.name]);
    this.pieChartData = [completedProj[0], completedProj[1], completedProj[2], completedProj[3], completedProj[4], completedProj[5]];
    this.polarAreaChartData = [completedProj[0], completedProj[1], completedProj[2], completedProj[3], completedProj[4], completedProj[5]];
    this.kpi = Math.floor((completedProj[3] + completedProj[4] + completedProj[5]) /
      (completedProj[0] + completedProj[1] + completedProj[2] + completedProj[3] + completedProj[4] + completedProj[5]) * 100);
  }

  chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  get projects(): Project[] {
    return this.proj
      .map((project, i) => ({id: i + 1, ...project}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getChart(unavailEmpl, totalEmpl) {

    const seriesA = [];
    const seriesB = [];
    const labels = [];

    for (const i of unavailEmpl) {
      seriesA.push(i.staff);
      labels.push(i.date.toLocaleDateString());
    }

    for (const i of totalEmpl) {
      seriesB.push(i.staff);
    }

    const barChartOptions: ChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };

    const barChartLabels: Label[] = labels;
    const barChartType: ChartType = 'bar';
    const barChartLegend = true;
    const barChartPlugins = [pluginDataLabels];

    const barChartData: ChartDataSets[] = [
      {data: seriesA, label: 'Unavailable'},
      {data: seriesB, label: 'Total Staff'}
    ];

    return {barChartOptions, barChartLabels, barChartType, barChartLegend, barChartPlugins, barChartData};
  }

  getData() {
    const pd: Project[] = this.proj;
    const today = new Date();
    const projectEmpl = [];
    const totalEmpl = [];

    for (let i = 0; i <= 3; i++) {
      const tmp = new Date(today.getFullYear(), today.getMonth() + i);
      projectEmpl.push({date: tmp, staff: this.getEmployees(pd, tmp)});
      totalEmpl.push({date: tmp, staff: this.getTotalEmployees(pd, tmp)});
    }
    return this.getChart(projectEmpl, totalEmpl);
  }

  getEmployees(projectData, date: Date) {
    const temp = projectData
      .filter((staff) => {
        const t = Math.floor(Math.floor(staff.deadline.getTime() - date.getTime()) / (1000 * 3600 * 24));
        return t < 0 && (staff.complete === 0);
      })
      .map((staff) => {
        return staff.employed;
      });
    if (temp.length > 0) {
      return temp.reduce((sum, staff) => {
        return sum + staff;
      });
    }
    return [];
  }

  getTotalEmployees(projectData, date: Date) {
    const temp = projectData
      .filter((staff) => {
        const t = Math.floor(Math.floor(staff.deadline.getTime() - date.getTime()) / (1000 * 3600 * 24));
        return t > 0;
      })
      .map((staff) => {
        return staff.staff;
      });
    if (temp.length > 0) {
      return temp.reduce((sum, staff) => {
        return sum + staff;
      });
    }
    return [];
  }

  getCompletedProjects(projects) {
    const temp: Project[] = [];
    this.proj
      .forEach(i => {
        if (i.complete) {
          temp.push(i);
        }

      });

    const grouped = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    temp.forEach((i) => {
      grouped[i.custsat] = (grouped[i.custsat] || 0) + 1;
    });
    console.log(grouped);
    return grouped;
  }

}
