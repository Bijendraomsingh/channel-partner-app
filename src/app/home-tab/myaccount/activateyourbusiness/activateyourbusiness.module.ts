import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivateyourbusinessPage } from './activateyourbusiness.page';

const routes: Routes = [
  {
    path: '',
    component: ActivateyourbusinessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivateyourbusinessPage]
})
export class ActivateyourbusinessPageModule {}
