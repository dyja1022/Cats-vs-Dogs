import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseFrameComponent } from './base-frame/base-frame.component';

const routes: Routes = [
  {path: 'game', component: BaseFrameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
