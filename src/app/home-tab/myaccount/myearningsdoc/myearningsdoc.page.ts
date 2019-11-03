import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { RestapiService } from "src/app/restapi.service";

@Component({
  selector: "app-myearningsdoc",
  templateUrl: "./myearningsdoc.page.html",
  styleUrls: ["./myearningsdoc.page.scss"]
})
export class MyearningsdocPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    //loop: true,
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true
  };
  myEarnings: any;
  totalEarning = 0;
  earningProducts: any;
  constructor(
    private restapiService: RestapiService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getEarnings();
  }

  getEarnings() {
    let cpartner_id = localStorage.getItem("cpartner_id");
    return this.restapiService
      .get_data("get_myearning?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        if (res && res.status) {
          this.myEarnings = res.data;
          this.totalEarning = this.myEarnings.myearning;
          this.earningProducts = this.myEarnings.orders;
          console.log(this.myEarnings);
        }
      });
  }

  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
