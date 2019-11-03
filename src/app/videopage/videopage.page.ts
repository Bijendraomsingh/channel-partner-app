import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

/* Import Components, Service etc */
import { RestapiService } from "../restapi.service";
@Component({
  selector: "app-videopage",
  templateUrl: "./videopage.page.html",
  styleUrls: ["./videopage.page.scss"]
})
export class VideopagePage implements OnInit {
  like_success_msg: any;
  likeUnlike: {
    cpartner_id: any;
    video_id: 1;
  };

  videoResponse: any;
  constructor(
    private router: Router,
    private restapiService: RestapiService,
    public modalCtrl: ModalController
  ) {
    console.log(localStorage.getItem("cpartner_id"));
  }

  public stopPlayingVideo() {}
  ngOnInit() {}
  selectskip() {
    this.router.navigate(["home-tab/main-home"]);
  }

  like_unlike() {
    this.likeUnlike.cpartner_id = localStorage.getItem("cpartner_id");
    this.restapiService
      .post_data("likevideo", this.likeUnlike)
      .subscribe((res: any) => {
        this.videoResponse = res;
        console.log(this.videoResponse);
      });
    this.like_success_msg = this.videoResponse._success_msg;
    console.log(this.like_success_msg);
  }
}
