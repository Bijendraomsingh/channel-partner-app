import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { NavController } from "@ionic/angular";
import { RestapiService } from "../../../restapi.service";
import { LoadingController } from "@ionic/angular";
import { ProductListPage } from '../product-list/product-list.page';
@Component({
  selector: "app-pricefilter",
  templateUrl: "./pricefilter.page.html",
  styleUrls: ["./pricefilter.page.scss"]
})
export class PricefilterPage implements OnInit {
  shownGroup: null;
  posts: any;
  public categories: any;
  public features: any;
  public brands: any;
  allFilters: any;
  productList: any;
  searchFilter = {
    slug: "",
    type: "category",
    page: 1,
    filters: {
      feature: [],
      price: "",
      brand: [],
      discount: "",
      rating: "",
      org_size: [],
      org_type: [],
      operating_system: [],
      deployment: []
    }
  };
  categoryName: any;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private restapiService: RestapiService,
    private loadingController: LoadingController,
    private modalController: ModalController

  ) {
    this.categories = navParams.get("categories");
    this.features = navParams.get("features");
    this.brands = navParams.get("brands");
    console.log(this.features);
    console.log(this.brands);
  }

  toggleGroup(group) {
    console.log(this.allFilters);
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  ngOnInit() {
    this.allFilters = [
      {
        name: "Categories",
        children: this.categories
      },
      {
        name: "Features",
        children: this.features
      },
      {
        name: "Price",
        children: [
          { val: "1-10", name: "1-10", type: "price" },
          { val: "11-15", name: "11-15", type: "price" },
          { val: "16-200", name: "16-200", type: "price" },
          { val: "201-500", name: "201-500", type: "price" },
          { val: "501-1000", name: "501-1000", type: "price" },
          { val: "1001-5000", name: "1001-5000", type: "price" },
          { val: "5000+", name: "5000+", type: "price" }
        ]
      },
      {
        name: "Discounts",
        children: [
          { val: 50, name: "50% & Above", type: "discount" },
          { val: 40, name: "40% & Above", type: "discount" },
          { val: 30, name: "30% & Above", type: "discount" },
          { val: 20, name: "20% & Above", type: "discount" },
          { val: 10, name: "10% & Above", type: "discount" }
        ]
      },
      {
        name: "Brands",
        children: this.brands
      },
      {
        name: "Ratings",
        children: [
          { val: 5, name: "5", type: "rating" },
          { val: 4, name: "4", type: "rating" },
          { val: 3, name: "3", type: "rating" },
          { val: 2, name: "2", type: "rating" },
          { val: 1, name: "1", type: "rating" }
        ]
      },
      {
        name: "Best Suited For",
        children: [
          { val: "smes", name: "SMEs", type: "org" },
          { val: "mid_market", name: "Mid Market", type: "org" },
          { val: "enterprise", name: "Enterprise", type: "org" },
          { val: "govt", name: "Govt", type: "org" },
          { val: "psus", name: "PSUs", type: "org" },
          { val: "startups", name: "Startups", type: "org" },
          { val: "agencies", name: "Agencies", type: "org" }
        ]
      },
      {
        name: "Organization Type",
        children: [
          { val: "1-10", name: "1-10", type: "org_size" },
          { val: "11-15", name: "11-15", type: "org_size" },
          { val: "16-200", name: "16-200", type: "org_size" },
          { val: "201-500", name: "201-500", type: "org_size" },
          { val: "501-1000", name: "501-1000", type: "org_size" },
          { val: "1001-5000", name: "1001-5000", type: "org_size" },
          { val: "5000+", name: "5000+", type: "org_size" }
        ]
      }
    ];
  }

  selectFilters(type: any, val: string, name: string) {
    console.log(val);
    console.log(type);
    if (type === "category") {
      this.searchFilter.slug = val;
      this.categoryName = name;
    }

    if (type === "price") {
      this.searchFilter.filters.price = val;
    }

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

    if (type === "org") {
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

  async applyFilter() {
    const productList = await this.modalController.create({
      component: ProductListPage,
      componentProps: {
        search: false,
        title: this.categoryName,
        searchFilter: this.searchFilter
      }
    });
    return productList.present();
  }
}
