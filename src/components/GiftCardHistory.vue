<template>
    <div class="content" style="height:100%">
        <Header :userId="userId" />
        <table>
           <tr>
               <th>Order Id</th>
               <th>Recipient's Name</th>
               <th>Order date</th>
               <th>Gift Card Value</th>
               <th>Commission (5%)</th>
               <th>Delivery Status</th>
               <th v-if="userId == 1">Action</th>
           </tr>
           <tr v-if="orders.length == 0">
               No Records found.
           </tr>
           <tr v-for="(order, index) in orders" v-bind:key="index">
               <td>
                   <div style="float:left">GF00{{ order.id }}</div>
               </td>
               <td>
                   <div style="float:left">{{ order.firstName }} {{ order.lastName }}</div>
               </td>
               <td>
                   <div style="float:left">{{ order.orderedDate | formatted-date }}</div>
               </td>
               <td>
                   <div style="float:right">INR. {{ order.giftCardValue }}</div>
               </td>
               <td>
                   <div style="float:right">INR. {{ order.commission | trim-decimal }}</div>
               </td>
               <td>
                   <b>{{ order.status }}</b>
               </td>
               <td v-if="userId == 1">
                   <button :class="(order.status=='New' ? 'Deliver' : (order.status=='Out for Delivery' ? 'Delivered' : (order.status=='Delivered' ? 'Redeemed' : 'Renew')))" v-on:click="changeStatus(order)" :disabled = "getActionText(order.status) == 'Renew it'" >{{ getActionText(order.status) }} </button>
               </td>
           </tr>
       </table>
    </div>
</template>

<style scoped>
.Deliver{
    background-color: rgb(38,124,236);
}
.Delivered{
    background-color: lightsalmon;
}
.Redeemed{
    background-color: green;
}
.Renew{
    background-color: lightslategray;
}
.Renew:hover{
    cursor: default;
}
</style>

<script>
import Header from "./Header.vue";

export default {
    name: 'GiftCardHistory',
    components: {
        'Header': Header
    },
    data: function(){
        return{
            orders: [],
            userId: this.$route.params.userId
        }
    },
    created: function(){
        this.getOrders();
    },
    methods: {
        getOrders: function(){
            var url = "http://localhost:3000/giftCardDetails";
            if(this.userId != 1)
                url += "?userId=" + this.userId;
            this.$http.get(url)
                .then(res => {
                    this.orders = res.data;
                }, err => {
                    console.log(err);
                })
        },
        changeStatus: function(order){
            var status = 'New';
            var currentStatus = order.status;

            if(currentStatus == 'New')
                status = 'Out for Delivery';
            else if(currentStatus == 'Out for Delivery')
                status = 'Delivered';
            else if(currentStatus == 'Delivered')
                status = 'Redeemed';

            this.$http.patch("http://localhost:3000/giftCardDetails/" + order.id, {
                status: status
            })
                .then(res => {
                    console.log(res);
                    this.getOrders();
                }, err => {
                    console.log(err);
                })
        },
        getActionText: function(status){
            var actionText = 'Renew it';

            if(status == 'New')
                actionText = 'Deliver it';
            else if(status == 'Out for Delivery')
                actionText = 'Mark Delivered';
            else if(status == 'Delivered')
                actionText = 'Mark Redeemed';
            
            return actionText;
        }
    }
}
</script>