import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { RestapiService } from "../../../restapi.service";
import { ToastController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-bank-account-details",
  templateUrl: "./bank-account-details.page.html",
  styleUrls: ["./bank-account-details.page.scss"]
})
export class BankAccountDetailsPage implements OnInit {
  cpartner: any;
  bankuserfrom: FormGroup;
  updatedata: any;
  successmessage: any;
  cpartnerDetail: any;
  contactDetail = {
    cpartner_id: "29",
    acc_holder_name: "Abcd",
    acc_num: "62273089667",
    bank_name: "xxxxxxx",
    branch_name: "xxxxxx",
    ifsc_code: "SBIN0020979"
  };

  constructor(
    private restapiService: RestapiService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
    public toastController: ToastController
  ) {
    this.bankuserfrom = new FormGroup({
      acc_holder_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      acc_num: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      bank_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      branch_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      ifsc_code: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ])
    });
  }

  ngOnInit() {
    this.cpartnerPartner();
    this.savebtn();
  }
  goBack() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  cpartnerPartner() {
    let cpartner_id = localStorage.getItem("cpartner_id");
    return this.restapiService
      .get_data("cpartner_bank?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.status) {
          console.log(res.data);
          this.cpartnerDetail = res.data;
          this.contactDetail.acc_holder_name = this.cpartnerDetail.acc_holder_name;
          this.contactDetail.acc_num = this.cpartnerDetail.acc_num;
          this.contactDetail.bank_name = this.cpartnerDetail.bank_name;
          this.contactDetail.branch_name = this.cpartnerDetail.branch_name;
          this.contactDetail.ifsc_code = this.cpartnerDetail.ifsc_code;
          this.contactDetail.cpartner_id = this.cpartnerDetail.id;
        }
      });
  }
  async savebtn() {
    this.contactDetail.acc_holder_name = this.cpartnerDetail.value.acc_holder_name;
    this.contactDetail.acc_num = this.cpartnerDetail.value.acc_num;
    this.contactDetail.bank_name = this.cpartnerDetail.value.bank_name;
    this.contactDetail.branch_name = this.cpartnerDetail.value.branch_name;
    this.contactDetail.ifsc_code = this.cpartnerDetail.value.ifsc_code;
    this.contactDetail.cpartner_id = localStorage.getItem("cpartner_id");
    this.restapiService
      .post_data("save_cpartner_bank", this.contactDetail)
      .subscribe((res: any) => {
        this.updatedata = res;
        console.log(this.updatedata);
        if (res.status == true) {
          this.successmessage = res.success_msg;
          console.log(this.successmessage);
        }
      });
    const toast = await this.toastController.create({
      position: "top",
      message: "Profile updated successfully",
      duration: 2000
    });
    toast.present();
  }
  // inputMobileno(event: any) {
  //   this.registerLoginError = "";
  //   const pattern = /[0-9\+\-\ ]/;
  //   const inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }
}
