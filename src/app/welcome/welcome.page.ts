import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestapiService } from "../restapi.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { phoneNumberValidator } from "../phone-validator";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"]
})
export class WelcomePage implements OnInit {
  pushes: any = [];
  otp: any;
  status: any;
  registerLogin: any;
  contactForm: FormGroup;
  verfyOtp: any;
  otpaddForm: FormGroup;
  formotpadd: any;
  registerLoginError = "";
  errormsg: any;
  tast: any;
  showToast: any;
  toast: any;
  otpnotFdata: [];
  showOtp = false;
  registerData = {
    phone: 0,
    otp: 0,
    language: 1
  };
  constructor(
    private router: Router,
    private restapiService: RestapiService,
    private toastController: ToastController
  ) {
    this.contactForm = new FormGroup({
      mobile: new FormControl("", [Validators.required, phoneNumberValidator])
    });
    this.otpaddForm = new FormGroup({
      otp1: new FormControl("", [Validators.required, phoneNumberValidator]),
      otp2: new FormControl("", [Validators.required, phoneNumberValidator]),
      otp3: new FormControl("", [Validators.required, phoneNumberValidator]),
      otp4: new FormControl("", [Validators.required, phoneNumberValidator]),
      otp5: new FormControl("", [Validators.required, phoneNumberValidator]),
      otp6: new FormControl("", [Validators.required, phoneNumberValidator])
    });
  }
  ngOnInit() {}
  get mobile() {
    return this.contactForm.get("mobile");
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }
  revert() {
    this.contactForm.reset();
    this.otpaddForm.reset();
  }
  registerLoginbtn() {
    this.registerData.phone = this.contactForm.value.mobile;
    this.restapiService
      .post_data("register", this.registerData)
      .subscribe((res: any) => {
        this.registerLogin = res;
        if (this.registerLogin.data !== undefined) {
          if (
            this.registerLogin.data.cpartner_id &&
            this.registerLogin.data.cpartner_id !== undefined
          ) {
            localStorage.setItem(
              "cpartner_id",
              this.registerLogin.data.cpartner_id
            );
            localStorage.setItem("phone", this.registerLogin.data.phone);
            this.router.navigate(["home-tab/main-home"]);
          } else {
            this.showOtp = true;
            this.otp = this.registerLogin.data.otp;
          }
        } else {
          this.registerLoginError = this.registerLogin.errormsg;
          this.toast = this.toastController
            .create({
              message: this.registerLoginError,
              duration: 2000,
              position: "top"
            })
            .then(toastData => {
              console.log(toastData);
              toastData.present();
            });
        }
      });
  }
  verifyotp() {
    this.registerData.otp =
      this.otpaddForm.value.otp1 +
      this.otpaddForm.value.otp2 +
      this.otpaddForm.value.otp3 +
      this.otpaddForm.value.otp4 +
      this.otpaddForm.value.otp5 +
      this.otpaddForm.value.otp6;
    if (this.registerData.otp == this.otp) {
      this.restapiService
        .post_data("verify_otp", this.registerData)
        .subscribe((res: any) => {
          this.verfyOtp = res;
          if (this.verfyOtp.data) {
            localStorage.setItem("cpartner_id", this.verfyOtp.data.cpartner_id);
            this.router.navigate(["videopage"]);
            console.log(localStorage.getItem("cpartner_id"));
          }
        });
    } else {
      this.otp = "We couldn't verify your code!. Please try again";
    }
  }
  otpnotfound() {}
  inputMobileno(event: any) {
    this.registerLoginError = "";
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
