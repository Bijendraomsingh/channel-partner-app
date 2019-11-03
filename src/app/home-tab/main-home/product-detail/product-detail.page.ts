import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { RestapiService } from "src/app/restapi.service";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.page.html",
  styleUrls: ["./product-detail.page.scss"]
})
export class ProductDetailPage implements OnInit {
  title: any;
  product_id: any;
  productDetail: any;
  brandDescription: any;
  screenshots: any;
  productDsummery: any;
  productAlldata: any;
  plans: any;
  prices: any;
  menu: any;
  screenshotsBg =
    "https://www.techjockey.com/assets/images/techjockey/products/thumb/";

  slideOptsDetail = {
    initialSlide: 0,
    speed: 400,
    zoom: false,
    slidesPerView: 1,
    spaceBetween: 0
  };
  slideOptProduct = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
      // renderBullet: function(index, className) {
      //   return (
      //     '<span class="' + className + '">' + this.menu[index] + "</span>"
      //   );
      // }
    }
  };

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private restapiService: RestapiService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.title = navParams.get("title");
    this.product_id = navParams.get("product_id");
    console.log(this.product_id);
  }

  ngOnInit() {
    console.log(this.product_id);
    this.restapiService
      .get_data("product_detail?product_id=" + this.product_id)
      .subscribe((res: any) => {
        if (res.status) {
          this.productDetail = res.data;
          // console.log(this.productDetail);
          this.productAlldata = this.productDetail.detail;
          console.log(this.productAlldata);
          this.screenshots = this.productDetail.detail.screenshots;
          this.plans = this.productDetail.detail.plans.id;
          this.prices = this.productDetail.detail.price;
          console.log(this.plans);
        }
      });
  }

  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
