import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { HomeTabPageRoutingModule } from "./home-tab.router.module";
import { IonicModule } from "@ionic/angular";
import { HomeTabPage } from "./home-tab.page";

const routes: Routes = [
  {
    path: "",
    component: HomeTabPage,
    children: [
      {
        path: "main-home",
        children: [
          {
            path: "",
            loadChildren: "./main-home/main-home.module#MainHomePageModule"
          }
        ]
      },
      {
        path: "contact-us",
        children: [
          {
            path: "",
            loadChildren: "./contact-us/contact-us.module#ContactUsPageModule"
          }
        ]
      },
      {
        path: "my-shares",
        children: [
          {
            path: "",
            loadChildren: "./my-shares/my-shares.module#MySharesPageModule"
          }
        ]
      },

      {
        path: "myaccount",
        children: [
          {
            path: "",
            loadChildren: "./myaccount/myaccount.module#MyaccountPageModule"
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeTabPage]
})
export class HomeTabPageModule {}
