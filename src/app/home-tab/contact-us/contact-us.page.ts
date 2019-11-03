import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { RestapiService } from "../../restapi.service";
@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.page.html",
  styleUrls: ["./contact-us.page.scss"]
})
export class ContactUsPage implements OnInit {
  contactuserForm: FormGroup;
  cpartner: any;
  requestData = {
    name: "abcd",
    email: "example@gmail.com",
    contact_number: "1234567890"
  };
  requestCallbackdata: any;
  constructor(
    private router: Router,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
    private restapiService: RestapiService
  ) {
    this.contactuserForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(4)
      ]),
      contact_number: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
  }
  ngOnInit() {
    this.regForm();
  }
  onclickcontact() {
    this.router.navigate(["home-tab/main-home"]);
  }

  regForm() {
    console.log(this.requestData);
    this.restapiService
      .post_data("requestCallBack", this.requestData)
      .subscribe((res: any) => {
        this.requestCallbackdata = res.data;
        console.log(this.requestCallbackdata);
        // if (res && res.status) {
        //   console.log(res.data);
        //   this.requestData.name = res.data;
        //   this.requestData.name = this.requestData.name;
        //   this.requestData.email = this.requestData.email;
        //   this.requestData.contact_number = this.requestData.contact_number;
        // }
      });
  }
}
