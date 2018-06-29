import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ManuallyAddComponent } from './manually-add/manually-add.component';

const routes: Routes = [
  {
    path: '',
    component: AddComponent
  },
  {
    path: 'manuallyAdd',
    component: ManuallyAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
