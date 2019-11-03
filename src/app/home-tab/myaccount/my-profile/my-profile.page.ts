import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { RestapiService } from "../../../restapi.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { NavController } from "@ionic/angular";
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from "@ionic-native/camera/ngx";
import {
  ActionSheetController,
  Platform,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { HttpClient } from "@angular/common/http";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { Storage } from "@ionic/storage";
import { FilePath } from "@ionic-native/file-path/ngx";
import { finalize } from "rxjs/operators";
import { pipe } from "rxjs";

const STORAGE_KEY = "my_images";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.page.html",
  styleUrls: ["./my-profile.page.scss"]
})
export class MyProfilePage implements OnInit {
  images = [];
  updateprofile: any;
  cpartner: any;
  userForm: FormGroup;
  updatedata: any;
  successmessage: any;
  cpartnerDetail: any;
  contactDetail = {
    cpartner_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    image : "",
  };
  constructor(
    private restapiService: RestapiService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private formbuilder: FormBuilder,
    private toastController: ToastController,
    private camera: Camera,
    private file: File,
    private http: HttpClient,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private storage: Storage,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    private platform: Platform
  ) {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(4)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10)
      ])
    });
  }

  ngOnInit() {
    this.cpartnerPartner();
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        const arr = JSON.parse(images);
        this.images = [];
        for (const img of arr) {
          const filePath = this.file.dataDirectory + img;
          const resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    // tslint:disable-next-line: prefer-const
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (
        this.platform.is("android") &&
        sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
          let currentName = imagePath.substring(
            imagePath.lastIndexOf("/") + 1,
            imagePath.lastIndexOf("?")
          );
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      }
    });
  }
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log(newFileName);
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        success => {
          this.updateStoredImages(newFileName);
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);
      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }
  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
      var correctPath = imgEntry.filePath.substr(
        0,
        imgEntry.filePath.lastIndexOf("/") + 1
      );
      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast("File removed.");
      });
    });
  }

  startUpload(imgEntry) {
    this.file
      .resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file));
      })
      .catch(err => {
        this.presentToast("Error while reading file.");
      });
  }

  readFile(file: any) {
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append("file", imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: "Uploading image"
    });
    await loading.present();
    // this.http
    //   .post("https://nweb.techjockey.com/channelpartnerapi/update_profile_image", formData)
    // tslint:disable-next-line: variable-name
    //const cpartner_id = localStorage.getItem("cpartner_id");
    const  profileImage = {cpartner_id: localStorage.getItem('cpartner_id'), image: formData}
    console.log(profileImage);
    this.restapiService
      .post_data("update_profile_image", profileImage)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(res => {
        this.updateprofile = res;
        console.log(this.updateprofile);
        if (res["success"]) {
          this.presentToast("File upload complete.");
        } else {
          this.presentToast("File upload failed.");
        }
      });
  }

  goBack() {
    this.modalController.dismiss();
  }
  cpartnerPartner() {
    let cpartner_id = localStorage.getItem("cpartner_id");
    return this.restapiService
      .get_data("cpartner_details?cpartner_id=" + cpartner_id)
      .subscribe((res: any) => {
        if (res && res.status) {
          console.log(res.data);
          this.cpartnerDetail = res.data;
          this.contactDetail.first_name = this.cpartnerDetail.first_name;
          this.contactDetail.last_name = this.cpartnerDetail.last_name;
          this.contactDetail.email = this.cpartnerDetail.email;
          this.contactDetail.password = this.cpartnerDetail.password;
          this.contactDetail.phone = this.cpartnerDetail.phone;
          this.contactDetail.cpartner_id = this.cpartnerDetail.id;
        }
      });
  }
  async savebtn() {
    this.contactDetail.first_name = this.userForm.value.first_name;
    this.contactDetail.last_name = this.userForm.value.last_name;
    this.contactDetail.email = this.userForm.value.email;
    this.contactDetail.password = this.userForm.value.password;
    this.contactDetail.phone = this.userForm.value.phone;
    this.contactDetail.cpartner_id = localStorage.getItem("cpartner_id");
    this.restapiService
      .post_data("update_cpartner", this.contactDetail)
      .subscribe((res: any) => {
        this.updatedata = res;
        console.log(this.updatedata);
        if (res.status == true) {
          this.successmessage = res.success_msg;
          console.log(this.successmessage);
        }
      });
    const toast = await this.toastController.create({
      position: "top",
      message: "Profile updated successfully",
      duration: 2000
    });
    toast.present();
  }

  // TakePhotes() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then(imageData => {
  //     let filename = imageData.substring(imageData.lastIndexof("/") + 1);
  //     let path = imageData.substring(imageData.lastIndexof("/") + 1);
  //     this.file.readAsDataURL(path, filename).then(base64data => {
  //       this.photos.push(base64data);
  //     });
  //   });
  // }

  // inputMobileno(event: any) {
  //   this.registerLoginError = "";
  //   const pattern = /[0-9\+\-\ ]/;
  //   const inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }
}
