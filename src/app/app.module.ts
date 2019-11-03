import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

/* Pages/Modals */
import { PricefilterPageModule } from "./home-tab/main-home/pricefilter/pricefilter.module";
import { SearchPageModule } from "./home-tab/main-home/search/search.module";
import { ActivateyourbusinessPageModule } from "./home-tab/myaccount/activateyourbusiness/activateyourbusiness.module";
import { MySettingPageModule } from "./home-tab/myaccount/my-setting/my-setting.module";
import { SearchandfilterdetailPageModule } from "./home-tab/main-home/searchandfilterdetail/searchandfilterdetail.module";
import { FormsLeadPageModule } from "./home-tab/main-home/forms-lead/forms-lead.module";
import { MyProfilePageModule } from "./home-tab/myaccount/my-profile/my-profile.module";
import { ProductListPageModule } from "./home-tab/main-home/product-list/product-list.module";
import { ProductDetailPageModule } from "./home-tab/main-home/product-detail/product-detail.module";
import { AbouttechjockeyPageModule } from "./home-tab/myaccount/my-setting/abouttechjockey/abouttechjockey.module";
import { LogoutPageModule } from "./home-tab/myaccount/my-setting/logout/logout.module";
import { MyleadsPageModule } from "./home-tab/myaccount/myleads/myleads.module";
import { MysharesPageModule } from "./home-tab/myaccount/myshares/myshares.module";
import { BankAccountDetailsPageModule } from "./home-tab/myaccount/bank-account-details/bank-account-details.module";
import { MyearningsdocPageModule } from "./home-tab/myaccount/myearningsdoc/myearningsdoc.module";

import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PricefilterPageModule,
    SearchPageModule,
    ActivateyourbusinessPageModule,
    MySettingPageModule,
    SearchandfilterdetailPageModule,
    FormsLeadPageModule,
    MyProfilePageModule,
    ProductListPageModule,
    ProductDetailPageModule,
    AbouttechjockeyPageModule,
    LogoutPageModule,
    MyleadsPageModule,
    MysharesPageModule,
    BankAccountDetailsPageModule,
    MyearningsdocPageModule,
    IonicStorageModule.forRoot()
  ],

  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
