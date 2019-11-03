import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { WelcomePage } from "./welcome.page";
import { ReactiveFormsModule } from "@angular/forms";
import { AutofocusDirective } from "../auto-focus.directive";

const routes: Routes = [
  {
    path: "",
    component: WelcomePage
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
  declarations: [WelcomePage, AutofocusDirective]
})
export class WelcomePageModule {}
