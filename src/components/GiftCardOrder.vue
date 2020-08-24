<template>
    <div class="content">
        <Header :userId="giftCardDetails.userId" />
        <br />
        <div :class="isSuccess ? 'success': 'error'">{{ message }}</div>
       <table style="width: 50%" v-on:keypress="enterKeyPress">
           <tr>
               <td>
                   <h4>Recipient First Name</h4>
                   <input type="text" v-model="giftCardDetails.firstName">
               </td>
               <td>
                   <h4>Recipient Last Name</h4>
                   <input type="text" v-model="giftCardDetails.lastName">
               </td>
           </tr>
           <tr>
               <td>
                   <h4>Gift Card Value (INR)</h4>
                   <input type="text" v-on:change="calculateCommission" v-model="giftCardDetails.giftCardValue">
               </td>
               <td>
                   <h4>Amount Payable <h5>(5% commission inclusive)</h5></h4>
                   <input type="text" v-model="amountPayable" disabled>
               </td>
           </tr>
           <tr>
               <td>
                   <h4>Recipient Mobile Number</h4>
                   <input type="text" v-model="giftCardDetails.mobileNumber">
               </td>
               <td>
                   <h4>Address</h4>
                   <input type="text" v-model="giftCardDetails.address">
               </td>
           </tr>
           <tr>
               <td>
               </td>
               <td>
                   <button v-on:click="placeOrder">Place Order</button>
               </td>
           </tr>
       </table>
    </div>
</template>

<script>
import Header from "./Header.vue";

export default {
    name: 'GiftCardOrder',
    components: {
        'Header': Header
    },
    data: function(){
        return{
            amountPayable: 0,
            message: '',
            isSuccess: false,
            giftCardDetails: {
                userId: this.$route.params.userId,
                firstName: '',
                lastName: '',
                orderedDate: new Date().toLocaleDateString(),
                mobileNumber: '',
                address: '',
                giftCardValue: 0,
                commission: 0,
                status: 'New'
            }
        }
    },
    methods: {
        enterKeyPress: function(e){
            if(e.keyCode == 13){
                if(this.validate())
                    this.placeOrder();
                else
                    this.message = 'Please provide ALL fields';
            }
        },
        validate: function(){
            this.isSuccess = false;
            if(this.giftCardDetails.userId && this.giftCardDetails.firstName
                && this.giftCardDetails.lastName && this.giftCardDetails.orderedDate
                && this.giftCardDetails.mobileNumber && this.giftCardDetails.address
                && this.giftCardDetails.giftCardValue && this.giftCardDetails.commission
                && this.giftCardDetails.status)
                return true;
            else
                return false;
        },
        clearValues: function(){
            this.amountPayable = 0;
            this.giftCardDetails.userId = this.$route.params.userId;
            this.giftCardDetails.firstName = '';
            this.giftCardDetails.lastName = '';
            this.giftCardDetails.orderedDate = new Date().toLocaleDateString();
            this.giftCardDetails.mobileNumber = '';
            this.giftCardDetails.address = '';
            this.giftCardDetails.giftCardValue = 0;
            this.giftCardDetails.commission = 0;
            this.giftCardDetails.status = 'New';
        },
        placeOrder: function(){
            if(this.validate()){
                this.isSuccess = true;
                this.$http.post("http://localhost:3000/giftCardDetails", this.giftCardDetails)
                .then(res => {
                    console.log(res);
                    this.clearValues();
                    this.message = 'Order placed successfully';
                }, err => {
                    console.log(err);
                })
            }
        },
        calculateCommission: function(){
            this.giftCardDetails.commission = this.giftCardDetails.giftCardValue * (5/100);
            this.amountPayable = +this.giftCardDetails.giftCardValue + +this.giftCardDetails.commission;
        }
    }
}
</script>