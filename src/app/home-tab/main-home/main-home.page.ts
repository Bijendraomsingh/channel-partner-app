import { Component, OnInit } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { ModalController } from "@ionic/angular";
import { SearchPage } from "../main-home/search/search.page";
import { PopoverController, Platform } from "@ionic/angular";
import { FormsLeadPage } from "../main-home/forms-lead/forms-lead.page";
import { ProductListPage } from "./product-list/product-list.page";
import { HelperService } from "src/app/helper.service";

@Component({
  selector: "app-main-home",
  templateUrl: "./main-home.page.html",
  styleUrls: ["./main-home.page.scss"]
})
export class MainHomePage implements OnInit {
  backButtonSubscription;
  sliderOpts = {
    initialSlide: 0,
    zoom: false,
    slidesPerView: 3.6,
    spaceBetween: 10,
    centeredSlides: false
  };
  sliderOptsDep = {
    initialSlide: 0,
    slidesPerView: 2.7,
    spaceBetween: 15,
    centerMode: true,
    infinite: true
  };

  myproductdepatment: any;
  myproductindustries: any;

  channelbg =
    "https://nweb.techjockey.com/assets/images/techjockey/channel_partner/";
  productbg =
    "https://nweb.techjockey.com/assets/images/techjockey/products/thumb/";

  products: any;
  accountManager: any;
  topChannelPartners: any;
  topRatedProduct: any;
  productname: any;
  departments: any;
  getIndustries: any;
  getIndustriesname: any;
  ratingVal: any;
  priceOnrrequest: any;
  pricesdscount: any;
  categories: any;
  features: any;
  brands: any;
  price: any;
  allfilters = {
    filters: {
      features: [],
      max_price: "",
      min_price: "",
      rating: "",
      discount: "",
      org_size: [],
      deployment: [],
      org_type: []
    }
  };
  alldepartment = {
    dp: {
      discount: ""
    }
  };
  getDepartments: any;
  getDepartmentsname: any;
  defaultImg = "../../assets/images/badu-live.png";
  loaderToShow: any;
  shareData = {
    cpartner_id: "",
    product_id: "",
    platform: ""
  };

  constructor(
    private restapiService: RestapiService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private helperService: HelperService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.topChannelPartner();
    this.topRatedProducts();
    this.getDepartment();
    this.getIndustry();
  }

  // async presentModal() {
  //   const filterModal = await this.modalController.create({
  //     component: PricefilterPage,
  //     componentProps: {
  //       categories: this.categories,
  //       features: this.features,
  //       brands: this.brands
  //     },
  //     cssClass: "custom-modal"
  //   });
  //   return await filterModal.present();
  // }

  setFilter() {
    this.helperService.filterModal(
      this.categories,
      this.categories,
      this.brands
    );
  }

  async searchlistModal() {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }
  async leadformPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FormsLeadPage,
      cssClass: "lead-form",
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  shareProduct(platform, product) {
    this.helperService.socialShare(platform, product);
  }

  topChannelPartner() {
    return this.restapiService
      .get_data("top_channel_partner")
      .subscribe((res: any) => {
        this.products = res;
        this.accountManager = this.products.data.account_manager;
        this.topChannelPartners = this.products.data.top_channel_partner;
      });
  }

  topRatedProducts() {
    return this.restapiService
      .post_data("top_rated_products", this.allfilters)
      .subscribe((res: any) => {
        this.topRatedProduct = res;
        this.productname = this.topRatedProduct.data.products;
        this.categories = this.topRatedProduct.data.categories;
        this.features = this.topRatedProduct.data.features;
        this.brands = this.topRatedProduct.data.brands;
      });
  }

  getDepartment() {
    return this.restapiService
      .get_data("get_departments")
      .subscribe((res: any) => {
        this.getDepartments = res;
        this.getDepartmentsname = this.getDepartments.data;
      });
  }

  getIndustry() {
    this.restapiService.get_data("get_industries").subscribe((res: any) => {
      this.getIndustries = res;
      this.getIndustriesname = this.getIndustries.data;
    });
  }

  async selectedSearch(name: any, id: any, type: any) {
    console.log(name);
    console.log(id);
    console.log(type);
    /*set product_list  page & pass id*/
    const productList = await this.modalController.create({
      component: ProductListPage,
      componentProps: {
        title: name,
        slug: id,
        type: type
      }
    });
    return productList.present();
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
