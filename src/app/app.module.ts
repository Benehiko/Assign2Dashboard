import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProjectsComponent} from './projects/projects.component';
import {RouterModule, Routes} from '@angular/router';
import {NotfoundComponent} from './notfound/notfound.component';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PolarchartComponent} from './polarchart/polarchart.component';
import {LinechartComponent} from './linechart/linechart.component';
import {ProjectdataService} from './projectdata.service';
import {FormsModule} from '@angular/forms';
import {ScatterplotComponent} from './scatterplot/scatterplot.component';
import {RadarComponent} from './radar/radar.component';
import {RadarchartService} from './radarchart.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTabsModule} from '@angular/material';
import {StaffdataService} from './staffdata.service';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'notfound', component: NotfoundComponent},
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    NotfoundComponent,
    PolarchartComponent,
    LinechartComponent,
    ScatterplotComponent,
    RadarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ChartsModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,

  ],
  providers: [ProjectdataService, RadarchartService, StaffdataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
