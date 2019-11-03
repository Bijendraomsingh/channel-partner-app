import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { RestapiService } from "src/app/restapi.service";

@Component({
  selector: "app-myleads",
  templateUrl: "./myleads.page.html",
  styleUrls: ["./myleads.page.scss"]
})
export class MyleadsPage implements OnInit {
  myLeads: any;
  totalLeads = 0;
  leadProducts: any;
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
    this.getLeads();
  }

  getLeads() {
    let cpartner_id = 5;
    return this.restapiService
      .get_data("get_leads?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        if (res && res.status) {
          this.myLeads = res.data;
          this.leadProducts = this.myLeads.leads;
          this.totalLeads = this.myLeads.total_leads;
          console.log(this.totalLeads);
        }
      });
  }

  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
