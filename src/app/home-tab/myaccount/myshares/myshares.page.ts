import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { RestapiService } from "src/app/restapi.service";
@Component({
  selector: "app-myshares",
  templateUrl: "./myshares.page.html",
  styleUrls: ["./myshares.page.scss"]
})
export class MysharesPage implements OnInit {
  myShared: any;
  totalShares = 0;
  sharedProducts: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    //loop: true,
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(
    public modalCtrl: ModalController,
    private restapiService: RestapiService
  ) {}
  ngOnInit() {
    this.getShared();
  }

  getShared() {
    let cpartner_id = 183;
    //console.log(cpartner_id);
    return this.restapiService
      .get_data("shared_products?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.status) {
          this.myShared = res.data;
          this.sharedProducts = this.myShared.shares;
          this.totalShares = this.myShared.total_shared;

          console.log(this.sharedProducts);
        }
      });
  }

  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
