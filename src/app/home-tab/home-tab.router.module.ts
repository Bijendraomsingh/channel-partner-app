import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeTabPageRoutingModule {}
