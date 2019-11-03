import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  showSplash = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      const cpartner_id = localStorage.getItem("cpartner_id");
      console.log(cpartner_id);
      if (cpartner_id && cpartner_id !== undefined) {
        this.router.navigate(["home-tab/main-home"]);
      } else {
        this.router.navigate(["welcome"]);
      }
    });
  }
  // async ionViewDidLoad() {
  //   this.fcm.getToken();
  //   this.fcm.listenToNotifactions().pipe;
  //   tap(msg => {
  //     const toast = this.toastCtrl.create({
  //       message: msg.body,
  //       duration: 3000
  //     });
  //     this.toast.present();
  //   })().subscribe();
  // }
}
