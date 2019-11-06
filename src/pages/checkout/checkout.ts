import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { CheckoutService } from './checkout.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
import { UserService } from '../../providers/user-service';


const payPalEnvironmentSandbox = 'AcgkbqWGamMa09V5xrhVC8bNP0ec9c37DEcT0rXuh7hqaZ6EyHdGyY4FCwQC-fII-s5p8FL0RL8rWPRB';
const publishableKey = 'pk_test_mhy46cSOzzKYuB2MuTWuUb34';
const stripe_secret_key = 'sk_test_GsisHcPqciYyG8arVfVe2amE';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers: [CheckoutService, PayPal, Stripe]
})
export class CheckoutPage {
  orderDetails: any = {};
  orderData: any = {
    address: {},
    cardDetails: {},
    status: 'pending'
  };
  showCradBlock: boolean = false;
  paymentDetails: any = {
    paymentStatus: true
  };
  public stripeCardList: any[] = [];
  cardInfo: any = {};
  public userId: '';
  public cvc: number;
  public isSaveCard: boolean = false;
  public newCardSelect: boolean = false;

  public selectedCradIndex: any;
  public isCardSelected: boolean = false;
  public paymentTypes: any = [
    { 'default': true, 'type': 'PayPal', 'value': 'paypal', 'logo': 'assets/img/paypal_logo.jpg' },
    { 'default': false, 'type': 'Stripe', 'value': 'stripe', 'logo': 'assets/img/stripe.png' },
    { 'default': false, 'type': 'COD', 'value': 'cod', 'logo': '' }];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    public checkoutService: CheckoutService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public payPal: PayPal,
    public stripe: Stripe,
    public toastCtrl: ToastController) {

    this.orderData = this.navParams.get('orderData');
  }

  ngOnInit() {
    this.orderData.paymentOption = 'PayPal';
    this.userService.getUser().subscribe((user: any) => {
      this.userId = user._id;
      this.getStripeCardList(this.userId);
    })
  }

  // get all stripe cards list 
  getStripeCardList(userId) {
    this.checkoutService.getUserCardList(userId).subscribe((res: any) => {
      if (res.length > 0) {
        this.stripeCardList = res;
      }
    }, error => {
      this.showToaster(error.message, 4000);
    })
  }

  selectedCard(index) {
    this.isCardSelected = true;
    this.selectedCradIndex = index;
  }

  choosePaymentType(paymentType) {
    this.orderData.paymentOption = paymentType;
    this.paymentDetails.paymentType = paymentType;
  }

  onSaveCard() {
    //this.showToaster("Card Saved successful!", 3000);
  }



  onDeleteCard(i) {
    let deleteCard = {
      index: i,
      userId: this.userId
    }
    this.checkoutService.deleteSavedCard(deleteCard).subscribe(res => {
      this.stripeCardList.splice(i, 1);
    }, error => {
      this.showToaster(error.error.message, 4000);
    })
  }

  checkout(orderDetails: NgForm) {
    if (this.orderData.paymentOption == 'PayPal') {
      const config = {
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: payPalEnvironmentSandbox
      }
      this.checkoutService.placeOrder(this.orderData)
        .subscribe((order: any) => {
          this.payPal.init(config).then(() => {
            this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(() => {
              let payment = new PayPalPayment(this.orderData.grandTotal, 'USD', 'Description', 'sale');
              this.payPal.renderSinglePaymentUI(payment).then((success: any) => {
                this.paymentDetails.transactionId = success.response.id;
                this.savePaymentData(order._id, this.paymentDetails);
              }, (error) => {
                this.showToaster(error.message, 4000);
              });
            }, (error) => {
              this.showToaster(error.message, 4000);
            })
          }, (error) => {
            this.showToaster(error.message, 4000);
          })
        })
    } else if (this.orderData.paymentOption == 'Stripe') {

      if (this.orderData.grandTotal >= 50) {

        let loader = this.loadingCtrl.create({
          content: 'please wait..'
        })
        loader.present();
        this.checkoutService.placeOrder(this.orderData)
          .subscribe((order: any) => {
            if (this.isCardSelected == true && this.newCardSelect == false) {
              let pay = {
                index: this.selectedCradIndex,
                amount: Math.round(this.orderData.grandTotal),
                userId: this.userId,
                cvc: this.cvc
              }
              this.checkoutService.stripePaymentBySavedCard(pay).subscribe((res: any) => {
                loader.dismiss();
                if (res.message != null) {
                  this.paymentDetails.transactionId = res.transactionId;// transaction id
                  this.savePaymentData(order._id, this.paymentDetails);

                } else {
                  this.showToaster('CVC Invelid', 4000);
                }
              }, error => {
                loader.dismiss();
                this.showToaster(error.message, 4000);
              })
            } else {
              let card = {
                cardNumber: this.cardInfo.cardNumber,
                month: this.cardInfo.expiryMonth,
                year: this.cardInfo.expiryYear,
                cvc: this.cardInfo.cvc,
                userId: this.userId,
                isSaved: this.isSaveCard
              }
              this.checkoutService.saveStripeCardDetail(card).subscribe(res => {
                let pay = {
                  userId: this.userId,
                  amount: Math.round(this.orderData.grandTotal)
                }
                this.checkoutService.stripePayment(pay).subscribe((res: any) => {
                  loader.dismiss();
                  this.paymentDetails.transactionId = res.transactionId;// transaction id
                  this.savePaymentData(order._id, this.paymentDetails);
                }, error => {
                  loader.dismiss();
                  this.showToaster(error.message, 4000);
                })
              })
            }
          }, error => {
            loader.dismiss();
            this.showToaster(error.message, 4000);
          })
      } else {
        this.showAlert('Amount should be greater than $50.');
      }
    } else {
      this.placeOrder();
    }

  }

  placeOrder() {
    let loader = this.loadingCtrl.create({
      content: 'please wait'
    })
    loader.present();
    this.checkoutService.placeOrder(this.orderData)
      .subscribe((order: any) => {
        loader.dismiss();
        this.saveLoyaltyData(order.orderID);
        localStorage.removeItem('cartItem');
        this.navCtrl.setRoot("ThankyouPage");
      }, error => {
        loader.dismiss();
        this.showToaster(error.message, 4000);
      })
  }

  savePaymentData(orderId, paymentDetails) {
    this.checkoutService.savePaymentDetails(orderId, paymentDetails)
      .subscribe(response => {
        this.saveLoyaltyData(orderId);
        localStorage.removeItem('cartItem');
        this.navCtrl.setRoot("ThankyouPage");
      }, error => {
        this.showToaster(error.message, 4000);
      })
  }

  saveLoyaltyData(orderId) {
    if (this.orderData.appliedLoyalty) {
      let loyaltyData = {
        credit: false,
        points: this.orderData.loyaltyPoints,
        orderId: orderId,
        dateAndTime: Date.now()
      };
      this.checkoutService.saveLoyaltyPoints(this.userId, loyaltyData)
        .subscribe(result => {
          this.showToaster('Loyalty Points Saved', 4000);
        }, error => {
          this.showToaster(error.message, 4000);
        })
    }
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }


}
