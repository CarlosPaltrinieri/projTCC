import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AddressListService } from './address-list.service';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
  providers: [AddressListService]
})
export class AddressListPage {
  addressList: any[];
  grandTotal: number;
  orderData: any = {};
  showAddress: boolean = false;
  selectedAddress: any = {};
  header_data: any;
  public amountDetails: any = {};
  public pincodes: Array<any>;
  public pincode_matched: boolean = false;
  public loyaltyPercentage: number = 0;
  public loyaltyPoints: number = 0;
  public leftLoyaltyPoint: number = 0;
  public checked: boolean = false;
  public loyaltyArray: any[] = [];
  public loyaltyLimit: number;
  public payTotal: number;
  public loyaltyObj: any = {};
  public currency: any;
  public selectedAddressData: any;
  constructor(public navCtrl: NavController,

    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private userService: UserService,
    private addressListService: AddressListService,
    public toastCtrl: ToastController) {
    this.currency = localStorage.getItem('currency');
    this.amountDetails = this.navParams.get('amountDetails');
    this.orderData.grandTotal = this.amountDetails.grandTotal;
    this.payTotal = this.amountDetails.grandTotal;
    this.orderData.subTotal = this.amountDetails.subTotal;
    this.orderData.taxAmount = this.amountDetails.tax;
    this.orderData.couponDiscountPercentage = this.amountDetails.couponDiscount;
    this.orderData.deductedAmountByCoupon = this.amountDetails.deductedPrice;
    this.orderData.cart = JSON.parse(localStorage.getItem("cartItem"));
    this.header_data = { ismenu: false, isHome: false, isCart: true, isSearch: false, title: 'Delivery Options' };
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    loader.present();
    this.addressListService.getAddressList()
      .subscribe((response: any) => {
        loader.dismiss();
        if (response.length > 0) {
          this.addressList = response;
        }
      }, (error) => {
        loader.dismiss();
        this.createToaster(error.error.message, 4000)
      });

    this.addressListService.getAvailablePincodes().subscribe((result: any) => {
      this.pincodes = result;
    });
    this.addressListService.getLoyaltyStatus().subscribe(loyalty => {
      this.loyaltyObj = loyalty;
    })

    this.userService.getUser().subscribe((user: any) => {
      this.loyaltyArray = user.loyaltyPoints;
      // if (this.loyaltyArray != null) {
      //   let _points: number = 0;
      //   for (let i = 0; i < this.loyaltyArray.length; i++) {
      //     _points = Number(_points + Number(this.loyaltyArray[i].points));
      //     this.loyaltyPoints = _points;
      //     console.log(this.loyaltyPoints, _points);
      //   }
      // }
      this.loyaltyPoints = user.totalLoyaltyPoints;
    }, error => {
      this.createToaster(error.message, 4000)
    })
    this.orderData.status = 'pending';
  }

  deleteAdress(id, index) {
    this.addressListService.deleteAdressData(id).subscribe(res => {
      this.addressList.splice(index, 1);
    }, error => {
      this.showAlert('Somthing Wrong');
    })
  }



  addAddress() {
    this.navCtrl.push("AddressPage",
      { amountDetails: this.amountDetails });
  }

  updateLoyality(event) {
    if (this.loyaltyObj.loyalityProgram) {
      if (this.loyaltyPoints >= this.loyaltyObj.minLoyalityPoints) {
        this.checked = event.value;
        if (event.value == true) {
          if (this.payTotal < this.loyaltyPoints) {
            this.orderData.grandTotal = 0;
            this.leftLoyaltyPoint = this.loyaltyPoints - this.payTotal;
          }
          else if (this.payTotal > this.loyaltyPoints) {
            this.orderData.grandTotal = this.payTotal - this.loyaltyPoints;
            this.leftLoyaltyPoint = 0;
          }
        } else {
          this.orderData.grandTotal = this.amountDetails.grandTotal;
        }
      }
    }

  }


  selectAddress(address) {
    this.pincode_matched = false;
    this.orderData.shippingAddress = address;
    delete this.orderData.shippingAddress['_id'];
    this.selectedAddress = address;
    for (let i = 0; i < this.pincodes.length; i++) {
      if (this.pincodes[i].pincode == address.pincode) {
        this.pincode_matched = true;
      }
    }
  }


  checkOut() {
    if (this.pincode_matched) {
      this.orderData.appliedLoyalty = this.checked;
      if (this.orderData.appliedLoyalty == true) {
        this.orderData.usedLoyaltyPoints = this.loyaltyPoints;
      }
      if (this.orderData.shippingAddress != null) {
        this.navCtrl.push("CheckoutPage", {
          orderData: this.orderData
        });
      }
      else {
        this.showAlert('Please select address.');
      }
    } else {
      let pinCodesLoc: string = '';
      if (this.pincode_matched == false) {
        for (let i = 0; i < this.pincodes.length; i++) {
          pinCodesLoc = pinCodesLoc + ' , ' + this.pincodes[i].pincode;
        }
        this.showAlert('Not available for delivery at your location yet.' + pinCodesLoc);
      }
    }
  }

  private showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
