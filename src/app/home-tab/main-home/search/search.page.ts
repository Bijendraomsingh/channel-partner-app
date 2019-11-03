import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { RestapiService } from '../../../restapi.service';
import { SearchandfilterdetailPage } from '../searchandfilterdetail/searchandfilterdetail.page';
import { ProductListPage } from '../product-list/product-list.page';
import { ProductDetailPage } from '../product-detail/product-detail.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  sliderOptssearchDep = {
    initialSlide: 0,
    slidesPerView: 2.7,
    spaceBetween: 15,
    centerMode: true,
    infinite: true
  };
  posts: any;
  searchQuery: any = '';
  items: any[];
  productList: any;
  getDepartments: any;
  getDepartmentsname: any;
  getIndustriesname: any;
  getIndustries: any;
  searchFilter: {
    slug: "";
    type: "";
    page: 1;
    filters: {
      feature: any[];
      min_price: 0;
      max_price: 1000000;
      brand: any[];
      discount: "";
      rating: "";
      org_size: any[];
      org_type: any[];
      operating_system: any[];
      deployment: any[];
    };
  };

  constructor(
    private restapiService: RestapiService,
    private router: Router,
    private modalController: ModalController
  ) { }

  searchCatgories: any;

  ngOnInit() {
    this.searchCategories();
    this.getDepartment();
    this.getIndustry();
  }
  searchbackDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

  async searchproductdetail() {
    const modal = await this.modalController.create({
      component: SearchandfilterdetailPage
    });
    return await modal.present();
  }
  getDepartment() {
    return this.restapiService
      .get_data('get_departments')
      .subscribe((res: any) => {
        this.getDepartments = res;
        this.getDepartmentsname = this.getDepartments.data;
      });
  }

  getIndustry() {
    console.log('Industry');
    this.restapiService.get_data('get_industries').subscribe((res: any) => {
      this.getIndustries = res;
      this.getIndustriesname = this.getIndustries.data;
    });
  }
  searchCategories() {
    console.log('searchpage');
    this.restapiService.get_data('search_categories').subscribe((res: any) => {
      this.searchCatgories = res;
      this.posts = this.searchCatgories.data;
      console.log(this.posts);
    });
  }

  getItems(input: any) {
    let keyword = input.target.value;
    this.restapiService
      .get_data('product_search?keyword=' + keyword)
      .subscribe((res: any) => {
        if (res.status) {
          this.productList = res.data;
          console.log(this.posts);
        }
      });
  }
  async selectedSearch(name: any, id: any, type: any) {
    console.log(id);
    if (type === 'product') {
      console.log('product');
      /* hit product_detail */
      /*set product detail page & pass id*/
      const productDetail = await this.modalController.create({
        component: ProductDetailPage,
        componentProps: {
          product_id: id,
          title: name
        }
      });
      return await productDetail.present();
    } else {
      console.log('not product');
      /* hit product_list */
      console.log(id);
      console.log(type);
      /*set product_list  page & pass id*/
      const productList = await this.modalController.create({
        component: ProductListPage,
        componentProps: {
          search: true,
          title: name,
          slug: id,
          type: type
        }
      });
      return productList.present();
    }
  }
}
