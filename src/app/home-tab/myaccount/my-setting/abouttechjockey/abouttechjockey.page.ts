import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-abouttechjockey",
  templateUrl: "./abouttechjockey.page.html",
  styleUrls: ["./abouttechjockey.page.scss"]
})
export class AbouttechjockeyPage implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}
  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
