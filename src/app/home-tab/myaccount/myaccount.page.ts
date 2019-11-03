import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ActivateyourbusinessPage } from "./activateyourbusiness/activateyourbusiness.page";
import { MySettingPage } from "./my-setting/my-setting.page";
import { MyProfilePage } from "./my-profile/my-profile.page";

import { MyleadsPage } from "./myleads/myleads.page";
import { MysharesPage } from "./myshares/myshares.page";
import { BankAccountDetailsPage } from "./bank-account-details/bank-account-details.page";
import { MyearningsdocPage } from "./myearningsdoc/myearningsdoc.page";
import { RestapiService } from "src/app/restapi.service";
@Component({
  selector: "app-myaccount",
  templateUrl: "./myaccount.page.html",
  styleUrls: ["./myaccount.page.scss"]
})
export class MyaccountPage implements OnInit {
  totalLeads = 0;
  totalShared = 0;
  totalEarnings = 0;
  username: any;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private restapiService: RestapiService
  ) {
    this.username =
      localStorage.getItem("cpartner_id") !== undefined
        ? localStorage.getItem("cpartner_id")
        : localStorage.getItem("phone");
  }

  ngOnInit() {
    this.myAccount();
  }

  myAccount() {
    let cpartner_id = localStorage.getItem("cpartner_id");
    return this.restapiService
      .get_data("myaccount?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        if (res && res.status) {
          this.totalLeads = res.data.total_leads;
          this.totalShared = res.data.total_shared;
          this.totalEarnings = res.data.total_earning;
        }
      });
  }

  myaccountclick() {
    this.router.navigate(["home-tab/main-home"]);
  }

  async myearningsclick() {
    const modal = await this.modalController.create({
      component: MyearningsdocPage
    });
    return await modal.present();
  }

  async activateyourBusiness() {
    const modal = await this.modalController.create({
      component: ActivateyourbusinessPage
    });
    return await modal.present();
  }

  async myleads() {
    const modal = await this.modalController.create({
      component: MyleadsPage
    });
    return await modal.present();
  }

  async myshares() {
    const modal = await this.modalController.create({
      component: MysharesPage
    });
    return await modal.present();
  }
  async myyearningsdoc() {
    const modal = await this.modalController.create({
      component: MyearningsdocPage
    });
    return await modal.present();
  }
  async mysetting() {
    const modal = await this.modalController.create({
      component: MySettingPage
    });
    return await modal.present();
  }
  async myprofile() {
    const modal = await this.modalController.create({
      component: MyProfilePage
    });
    return await modal.present();
  }
  async bankaccount() {
    const modal = await this.modalController.create({
      component: BankAccountDetailsPage
    });
    return await modal.present();
  }
}
