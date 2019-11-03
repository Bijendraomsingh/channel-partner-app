import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-searchandfilterdetail",
  templateUrl: "./searchandfilterdetail.page.html",
  styleUrls: ["./searchandfilterdetail.page.scss"]
})
export class SearchandfilterdetailPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  searchfilterdissmis() {
    this.modalController.dismiss();
  }
}
