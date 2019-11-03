import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyearningsdocPage } from './myearningsdoc.page';

const routes: Routes = [
  {
    path: '',
    component: MyearningsdocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyearningsdocPage]
})
export class MyearningsdocPageModule {}
