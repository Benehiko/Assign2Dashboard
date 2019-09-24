import {Injectable} from '@angular/core';
import {RadarchartService} from './radarchart.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectdataService {

  projects = [
    {
      name: 'Project 1',
      manager: 'Viktoria Kirk',
    },
    {
      name: 'Project 2',
      manager: 'Aaryan Clegg',
    },
    {
      name: 'Project 3',
      manager: 'Brandon Kramer',
    },
    {
      name: 'Project 4',
      manager: 'Samira Rahman',
    },
    {
      name: 'Project 5',
      manager: 'Caelan Alford',
    },
    {
      name: 'Project 6',
      manager: 'Humzah George',
    },
    {
      name: 'Project 7',
      manager: 'Bertha Galloway',
    },
    {
      name: 'Project 8',
      manager: 'Lleyton Marks',
    },
    {
      name: 'Project 9',
      manager: 'Ronny Cox',
    },
    {
      name: 'Project 10',
      manager: 'Simon Wolf',
    },
    {
      name: 'Project 11',
      manager: 'Radhika Boyce',
    },
    {
      name: 'Project 12',
      manager: 'Arianna Delaney',
    },
    {
      name: 'Project 13',
      manager: 'Kobie Finnegan',
    },
    {
      name: 'Project 14',
      manager: 'Anjali Ballard',
    },
    {
      name: 'Project 15',
      manager: 'Samantha Santiago',
    },
    {
      name: 'Project 16',
      manager: 'Hendrix Evans',
    },
    {
      name: 'Project 17',
      manager: 'Barney Kidd',
    },
    {
      name: 'Project 18',
      manager: 'Suranne Mendez',
    },
    {
      name: 'Project 19',
      manager: 'Wesley Arnold',
    },
    {
      name: 'Project 20',
      manager: 'Ava-Mai Gutierrez',
    },
    {
      name: 'Project 21',
      manager: 'Liberty Perez',
    },
    {
      name: 'Project 22',
      manager: 'Lorcan Conroy',
    },
    {
      name: 'Project 23',
      manager: 'Efa Hagan',
    },
    {
      name: 'Project 24',
      manager: 'Areebah Flores',
    },
    {
      name: 'Project 25',
      manager: 'Nikita Delgado',
    },
    {
      name: 'Project 26',
      manager: 'Ziva Daniel',
    },
    {
      name: 'Project 27',
      manager: 'Sabiha Sheppard',
    },
    {
      name: 'Project 28',
      manager: 'Aubrey Hanna',
    },
    {
      name: 'Project 29',
      manager: 'Veer Holman',
    },
    {
      name: 'Project 30',
      manager: 'Mira Pemberton',
    },
  ];

  generated = [];

  constructor(private radarChart: RadarchartService) {
    // const generated = [];
    const datenow = new Date();
    const startDate = new Date(datenow.getFullYear(), datenow.getMonth() - this.randomInt(0, 12));
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + this.randomInt(0, 12));
    let id = 0;
    for (const i of this.projects) {
      const budgetTotal = this.randomInt(100000, 1000000);
      const budgetUsed = this.randomInt(100000, 1000000);
      const budgetPercent = Math.floor(budgetUsed / budgetTotal * 100);
      const deadline = this.randomDate(startDate, endDate, 0, 23);
      const staff = this.randomInt(0, 50);
      const employed = this.randomInt(0, staff);
      const custsat = this.randomInt(0, 5);
      const complete = this.randomInt(0, 1);
      const daysleft = Math.floor(Math.floor(deadline.getTime() - datenow.getTime()) / (1000 * 3600 * 24));
      const totalDays = Math.floor(Math.floor(deadline.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      const seriesA = [100, 100, 100, 100];
      const seriesB = [Math.floor(employed / staff * 100),
        Math.floor(custsat / 5 * 100), budgetPercent,
        Math.floor(Math.abs(daysleft) / totalDays * 100)];
      const rchart = this.radarChart.genChart(seriesA, seriesB);
      id = id + 1;
      this.generated.push(
        {
          id,
          name: i.name,
          manager: i.manager,
          budgetUsed,
          budgetTotal,
          budgetPercent,
          deadline,
          daysleft,
          staff,
          employed,
          custsat,
          complete,
          radarChart: rchart,
        }
      );
    }
  }

  public getProjects() {
    return this.generated;
  }


  randomDate(start, end, startHour, endHour) {
    const date = new Date(+start + Math.random() * (end - start));
    // tslint:disable-next-line:no-bitwise
    const hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
  }

  /*randomDate(from, to) {
    return new Date(from + Math.random() * (to - from));
  }*/

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
