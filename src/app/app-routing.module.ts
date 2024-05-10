import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSceneOfCrimeComponent } from './views/form-scene-of-crime/form-scene-of-crime.component';
import { FormSearchNSeizureComponent } from './views/form-search-n-seizure/form-search-n-seizure.component';
import { FormWitnessStatementComponent } from './views/form-witness-statement/form-witness-statement.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search-and-seizure/663b73bf411c3f0c8b043427',
    pathMatch: 'full',
  },
  {
    path: 'scene-of-crime/:fir_id', 
    component: FormSceneOfCrimeComponent,
    title: "Scene of Crime Form",
  },
  {
    path: 'search-and-seizure/:fir_id',
    component: FormSearchNSeizureComponent,
    title: "Search and Seizure Form",
  },
  {
    path: 'witness-statement/:fir_id',
    component: FormWitnessStatementComponent,
    title: "Witness Statement Form",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
