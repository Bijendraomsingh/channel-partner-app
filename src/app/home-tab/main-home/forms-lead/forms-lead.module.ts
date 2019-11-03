import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { FormsLeadPage } from "./forms-lead.page";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: "",
    component: FormsLeadPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormsLeadPage]
})
export class FormsLeadPageModule {}
