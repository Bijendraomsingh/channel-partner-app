import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestapiService } from 'src/app/restapi.service';
@Component({
  selector: "app-my-shares",
  templateUrl: "./my-shares.page.html",
  styleUrls: ["./my-shares.page.scss"]
})
export class MySharesPage implements OnInit {
  responseData: any;
  myEarnings: any;
  myShared: any;
  myLeads: any;

  totalEarning = 0;
  totalShares = 0;
  totalLeads = 0;

  earningProducts: any;
  sharedProducts: any;
  leadProducts: any;

  // earningProducts = [{ "customer": "rishabh neema", "order_product_id": "3512", "order_id": "2905", "product_id": "2967", "product_name": "Tally ERP 9", "price": "10800.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-10-11 00:00:00", "updated_at": "2019-10-12 00:00:00" }, { "customer": "rishabh neema", "order_product_id": "3513", "order_id": "2906", "product_id": "2967", "product_name": "Tally ERP 9", "price": "10800.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-10-04 00:00:00", "updated_at": "2019-10-05 00:00:00" }, { "customer": "rishabh neema", "order_product_id": "3514", "order_id": "2907", "product_id": "2967", "product_name": "Tally ERP 9", "price": "10800.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-09-25 00:00:00", "updated_at": "2019-10-02 00:00:00" }, { "customer": "rishabh neema", "order_product_id": "3515", "order_id": "2908", "product_id": "2967", "product_name": "Tally ERP 9", "price": "10800.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-08-16 00:00:00", "updated_at": "2019-09-28 00:00:00" }, { "customer": "rishabh neema", "order_product_id": "3517", "order_id": "2910", "product_id": "2967", "product_name": "Tally ERP 9", "price": "10800.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-09-14 00:00:00", "updated_at": "2019-10-17 00:00:00" }, { "customer": "RISHABH NEEMA", "order_product_id": "3538", "order_id": "2931", "product_id": "2967", "product_name": "Tally ERP 9", "price": "5400.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-08-17 00:00:00", "updated_at": "2019-08-31 00:00:00" }, { "customer": "RISHABH NEEMA", "order_product_id": "3548", "order_id": "2940", "product_id": "2967", "product_name": "Tally ERP 9", "price": "5400.00", "date_modified": "0000-00-00 00:00:00", "commission_amount": "54.16", "department_id": "4", "current_status": "7", "created_at": "2019-10-01 00:00:00", "updated_at": "2019-10-09 00:00:00" }];
  // sharedProducts = [{"product_id": "348","product_name": "Bigdbiz HRM","price":"0.00","price_on_request": "1","shares": [{"platform": "whatsapp","no_of_shares": "5"},{"platform": "facebook","no_of_shares": "2"}]},
  //   {"product_id": "349","product_name": "KocharTech DeviceMax LockDown","price":"0.00","price_on_request": "1","shares": [{"platform": "whatsapp","no_of_shares": "5"},{"platform": "facebook","no_of_shares": "2"}]
  //   }];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    //loop: true,
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true
  };
  constructor(private router: Router, private restapiService: RestapiService) { }

  ngOnInit() {
    this.getEarnings();
    this.getShared();
    this.getLeads();

  }

  onclickEarnings() {
    this.router.navigate(["home-tab/main-home"]);
  }

  getEarnings() {
    let cpartner_id = 5;
    return this.restapiService
      .get_data('get_myearning?cpartner_id=' + cpartner_id)
      .subscribe((res: any) => {
        if (res && res.status) {
          this.myEarnings = res.data;
          this.totalEarning = this.myEarnings.myearning;
          this.earningProducts = this.myEarnings.orders;
          console.log(this.myEarnings);
        }

      });
  }

  getShared() {
    let cpartner_id = 183;
    //console.log(cpartner_id);
    return this.restapiService
      .get_data('shared_products?cpartner_id=' + cpartner_id)
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.status) {
          this.myShared = res.data;
          this.sharedProducts = this.myShared.shares;
          this.totalShares = this.myShared.total_shared;

          console.log(this.sharedProducts)
        }
      });
  }

  getLeads() {
    let cpartner_id = 5;
    return this.restapiService
      .get_data('get_leads?cpartner_id=' + cpartner_id)
      .subscribe((res: any) => {
        if (res && res.status) {
          this.myLeads = res.data;
          this.leadProducts = this.myLeads.leads;
          this.totalLeads = this.myLeads.total_leads;
          console.log(this.totalLeads)
        }
      });
  }

}
