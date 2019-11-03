import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangelanguagePage } from './changelanguage.page';

const routes: Routes = [
  {
    path: '',
    component: ChangelanguagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangelanguagePage]
})
export class ChangelanguagePageModule {}
