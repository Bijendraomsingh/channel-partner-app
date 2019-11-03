import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { AbouttechjockeyPage } from "./abouttechjockey/abouttechjockey.page";
import { LogoutPage } from "./logout/logout.page";

@Component({
  selector: "app-my-setting",
  templateUrl: "./my-setting.page.html",
  styleUrls: ["./my-setting.page.scss"]
})
export class MySettingPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}
  mysettingDismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  async abouttechjockey() {
    const modal = await this.modalController.create({
      component: AbouttechjockeyPage
    });
    return await modal.present();
  }
  async logoutpage(ev: any) {
    const popover = await this.popoverController.create({
      component: LogoutPage,
      cssClass: "logoutpage",
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
