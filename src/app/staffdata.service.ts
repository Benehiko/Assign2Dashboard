import {Injectable} from '@angular/core';
import {ProjectdataService} from './projectdata.service';

@Injectable({
  providedIn: 'root'
})
export class StaffdataService {


  constructor(private projectData: ProjectdataService) {
  }



}
