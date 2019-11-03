import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MainHomePage } from "./main-home.page";
import { BbydepartmentComponent } from "./bbydepartment/bbydepartment.component";
import { BbyindustriesComponent } from "./bbyindustries/bbyindustries.component";
const routes: Routes = [
  {
    path: "",
    component: MainHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainHomePage, BbydepartmentComponent, BbyindustriesComponent]
})
export class MainHomePageModule {}
