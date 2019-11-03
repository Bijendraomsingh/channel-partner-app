import { Component, OnInit } from "@angular/core";
import { RestapiService } from "../../../restapi.service";
import { NavController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from "@angular/forms";
import { phoneNumberValidator } from "../../../phone-validator";
@Component({
  selector: "app-forms-lead",
  templateUrl: "./forms-lead.page.html",
  styleUrls: ["./forms-lead.page.scss"]
})
export class FormsLeadPage implements OnInit {
  formgroup: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  productname: AbstractControl;

  cpartner: any;
  firstName: any;
  emailAddress: any;
  phonenumber: any;
  product: any;
  constructor(
    private restapiService: RestapiService,
    public navCtrl: NavController,
    public formbuilder: FormBuilder
  ) {
    this.formgroup = formbuilder.group({
      name: ["", Validators.required, phoneNumberValidator],
      //email:['',Validators.required]
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ],
      phone: ["", Validators.required],
      productname: ["", Validators.required]
    });
    this.name = this.formgroup.controls["name"];
    this.email = this.formgroup.controls["email"];
    this.phone = this.formgroup.controls["phone"];
    this.productname = this.formgroup.controls["productname"];
  }

  ngOnInit() {
    this.cpartnerPartner();
  }
  saveEntry() {
    alert("form is complete");
  }
  cpartnerPartner() {
    console.log("cpartner_id");

    let cpartner_id = localStorage.getItem("cpartner_id");

    console.log(localStorage.getItem("cpartner_id"));
    return this.restapiService
      .get_data("cpartner_details?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        this.cpartner = res;
        this.phonenumber = this.cpartner.data.phone;
        this.firstName = this.cpartner.data.first_name;
        this.email = this.cpartner.data.email;
        console.log(this.firstName);
      });
  }
}
