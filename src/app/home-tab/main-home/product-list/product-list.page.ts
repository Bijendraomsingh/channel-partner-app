import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { RestapiService } from "src/app/restapi.service";
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.page.html",
  styleUrls: ["./product-list.page.scss"]
})
export class ProductListPage implements OnInit {
  searchFilter = {
    slug: "",
    type: "",
    page: 1,
    filters: {
      feature: [],
      min_price: 0,
      max_price: 1000000,
      brand: [],
      discount: "",
      rating: "",
      org_size: [],
      org_type: [],
      operating_system: [],
      deployment: []
    }
  };
  productList: any;
  categories: any;
  features: any;
  brands: any;
  title: any;
  productbg =
    "https://nweb.techjockey.com/assets/images/techjockey/products/thumb/";


  constructor(
    public navParams: NavParams,
    private restapiService: RestapiService,
    public modalCtrl: ModalController,
    public helperService: HelperService
  ) {
    this.title = navParams.get("title");
    this.searchFilter.slug = navParams.get("slug");
    this.searchFilter.type = navParams.get("type");
    if (navParams.get('searchFilter') !== undefined) {
      this.searchFilter = navParams.get('searchFilter');
    }
  }

  ngOnInit() {
    this.restapiService
      .post_data("product_list", this.searchFilter)
      .subscribe((res: any) => {
        if (res.status) {
          this.productList = res.data.products;
          this.categories = res.data.categories;
          this.features = res.data.features;
          this.brands = res.data.brands
        }
      });
  }

  selectFilters(val: any, type: string) {
    if (type === "brand") {
      this.searchFilter.filters.brand.push(val);
    }

    if (type === "feature") {
      this.searchFilter.filters.feature.push(val);
    }

    if (type === "discount") {
      this.searchFilter.filters.discount = val;
    }

    if (type === "rating") {
      this.searchFilter.filters.rating = val;
    }

    if (type === "org_size") {
      this.searchFilter.filters.org_size.push(val);
    }

    if (type === "org_type") {
      this.searchFilter.filters.org_type.push(val);
    }

    if (type === "operating_system") {
      this.searchFilter.filters.operating_system.push(val);
    }

    if (type === "deployment") {
      this.searchFilter.filters.operating_system.push(val);
    }

    console.log(this.searchFilter);
  }

  goHome() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  setFilter() {
    this.helperService.filterModal(this.categories, this.features, this.brands)
  }

  applyFilter() {
    this.restapiService
      .post_data('product_list', this.searchFilter)
      .subscribe((res: any) => {
        if (res.status) {
          this.productList = res.data.products;
          console.log(this.productList);
        }
      });
  }

  shareProduct(platform, product) {
    this.helperService.socialShare(platform, product);
  }
}
