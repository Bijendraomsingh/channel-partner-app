import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { VideopagePage } from "./videopage.page";
const routes: Routes = [
  {
    path: "",
    component: VideopagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideopagePage]
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideopagePageModule {}
