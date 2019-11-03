import { Component, OnInit } from "@angular/core";
import { PopoverController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.page.html",
  styleUrls: ["./logout.page.scss"]
})
export class LogoutPage implements OnInit {
  cpartner_id: any;
  constructor(
    private popovercontroller: PopoverController,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log("cpartner_id");
  }
  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popovercontroller.dismiss({
      dismissed: true
    });
  }
  logout() {
    this.popovercontroller.dismiss({
      dismissed: true
    });
    localStorage.clear();
    this.router.navigate(["welcome"]);
    this.goBack();
  }

  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
