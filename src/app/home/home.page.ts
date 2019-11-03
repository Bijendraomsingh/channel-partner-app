import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RestapiService } from "src/app/restapi.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  cpartner: any;
  language: { [key: number]: any } = {
    1: "Hindi",
    2: "English",
    3: "Kannada",
    4: "Telugu",
    5: "Malayalam",
    6: "Marathi",
    7: "Bengali",
    8: "Gujrati"
  };
  constructor(private router: Router, private restapiService: RestapiService) {}

  selectlanguage(item) {
    console.log(item);
    this.router.navigate(["welcome"]);
  }
  ngOnInit() {
    // let cpartner_id = localStorage.getItem("cpartner_id");
    // return this.restapiService
    //   .get_data("cpartner_details?cpartner_id=" + cpartner_id)
    //   .subscribe((res: any) => {
    //     if (res.status) {
    //       this.router.navigate(["home-tab/main-home"]);
    //     } else {
    //       console.log("yes1");
    //     }
    //   });
  }
}
