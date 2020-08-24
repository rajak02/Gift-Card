<template>
    <div class="content" style="height:100%">
        <Header userId="1" />
        <table style="width: 35%">
           <tr>
               <th>Order Id</th>
               <th>username</th>
               <th>Gift Card Value</th>
               <th>Commission</th>
           </tr>
           <tr v-if="orders.length == 0">
               No Records found.
           </tr>
           <tr v-for="order in orders" v-bind:key="order.id">
               <td>
                   {{ order.id }}
               </td>
               <td>
                   {{ getUserName(order) }}
               </td>
               <td>
                   {{ order.giftCardValue }}
               </td>
               <td>
                   {{ order.commission }}
               </td>
           </tr>
           <tr>
               <td></td>
               <td></td>
               <td><b>Total Commission</b></td>
               <td>{{ totalCommission }}</td>
           </tr>
       </table>
    </div>
</template>

<script>
import Header from "./Header.vue";

export default {
    name: 'MonthlyReport',
    components: {
        'Header': Header
    },
    data: function(){
        return{
            orders: [],
            userDetails: []
        }
    },
    created: function(){
        this.$http.get("http://localhost:3000/giftCardDetails")
            .then(res => {
                this.orders = res.data;
            }, err => {
                console.log(err);
            })
        this.$http.get("http://localhost:3000/userDetails")
            .then(res => {
                this.userDetails = res.data;
            }, err => {
                console.log(err);
            })
    },
    computed: {
        totalCommission: function(){
            let commission = 0;
            for(let i=0; i < this.orders.length; i++){
                commission += this.orders[i].commission;
            }
            return commission;
        }
    },
    methods: {
        getUserName: function(order){
            var userName = '';
            for(let i=0; i < this.userDetails.length; i++){
                if(this.userDetails[i].id == order.userId)
                    userName = this.userDetails[i].userName;
            }
            return userName;
        }
    }
}
</script>