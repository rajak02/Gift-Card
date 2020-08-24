<template>
    <div style="display:flex">
        <img class="logo" src="../images/Logo.png" />
        <nav>
            <ul>
                <li v-if="isLogin == 0" v-on:click="Redirect(1)">Login</li>
                <li v-if="isLogin == 1" v-on:click="Redirect(2)">Register</li>
                <li v-if="userId > 1" v-on:click="Redirect(3)">New Order</li>
                <li v-if="userId >= 1" v-on:click="Redirect(4)">Order History</li>
                <li v-if="userId == 1" v-on:click="Redirect(5)">Monthly Report</li>
                <li v-if="userId > 0" v-on:click="Redirect(1)">Logout</li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        isLogin: String,
        userId: String
    },
    methods: {
        Redirect: function(value){
            var redirectPath = '/Login';
            var currentPath = this.$route.path;

            if(value == 1)
                redirectPath = '/Login';
            else if(value == 2)
                redirectPath = '/Registration';
            else if(value == 3)
                redirectPath = '/NewOrder/' + this.userId;
            else if(value == 4)
                redirectPath = '/OrderHistory/' + this.userId;
            else if(value == 5)
                redirectPath = '/MonthlyReport';

            if(currentPath != redirectPath)
                this.$router.push({path: redirectPath});
        }
    }
}
</script>

<style src="../style.css" />