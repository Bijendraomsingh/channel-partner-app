import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { RestapiService } from './restapi.service';
import { PricefilterPage } from './home-tab/main-home/pricefilter/pricefilter.page'
import { ModalController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  shareData = {
    cpartner_id: "",
    product_id: "",
    platform: ""
  };
  imgUrl =
    "https://nweb.techjockey.com/assets/images/techjockey/products/thumb/";
  slug = "https://nweb.techjockey.com/assets/images/techjockey/products/thumb/";

  constructor(private socialSharing: SocialSharing,
    private restapiService: RestapiService,
    private modalCtrl: ModalController
  ) { }



  socialShare(platform, product) {

    const message = this.generateMsg(product);
    this.imgUrl + product.image;
    this.slug + product.slug;
    this.shareData.cpartner_id = localStorage.getItem("cpartner_id");
    this.shareData.platform = "facebook";
    this.shareData.product_id = product.product_id;
    /* WhatsApp */
    if (platform == 'whatsapp') {
      this.socialSharing
        .shareViaWhatsApp(message, this.imgUrl, this.slug)
        .then(res => {
          return this.restapiService
            .post_data("cpartner_share_products", this.shareData)
            .subscribe((res: any) => {
              console.log(res);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }

    /* Facebook */
    if (platform == 'facebook') {
      this.socialSharing
        .shareViaFacebook(message, this.imgUrl, this.slug)
        .then(res => {
          return this.restapiService
            .post_data("cpartner_share_products", this.shareData)
            .subscribe((res: any) => {
              console.log(res);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }

    /* Twitter */
    if (platform == 'twitter') {
      this.socialSharing
        .shareViaTwitter(message, this.imgUrl, this.slug)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
    /* Mail */
    if (platform == 'mail') {
    }
    /* General */


  }

  generateMsg(product) {
    return "Hi Please check this awesome product " + product.product_name;
  }

  async filterModal(categories, features, brands) {
    const filterModal = await this.modalCtrl.create({
      component: PricefilterPage,
      componentProps: {
        categories: categories,
        features: features,
        brands: brands
      },
      cssClass: "custom-modal"
    });
    return await filterModal.present();
  }


}
