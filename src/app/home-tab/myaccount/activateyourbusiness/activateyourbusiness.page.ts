import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-activateyourbusiness",
  templateUrl: "./activateyourbusiness.page.html",
  styleUrls: ["./activateyourbusiness.page.scss"]
})
export class ActivateyourbusinessPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  activateyourbusinessDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }
}
