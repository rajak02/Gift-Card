<template>
    <div class="content">
        <Header isLogin='0' />
        <br />
        <div class="Registration">
            <div :class="isSuccess ? 'success': 'error'">{{ message }}</div>
            <h3>Username</h3>
            <input type="text" autofocus v-model="userDetail.userName">
            <br />
            <br />
            <button v-if="!isUserIdAvailable" v-on:click="checkUserAvailability"> Check User Availability </button>
            <div v-if="isUserIdAvailable">
                <h3>Password</h3>
                <input type="password" v-model="userDetail.password">
                <h3>Confirm Password</h3>
                <input type="password" v-model="confirmPassword">
                <h3>Email</h3>
                <input type="text" v-model="userDetail.email">
                <br />
                <br />
                <button v-on:click="register">Register</button>
                <br />
            </div>
        </div>
    </div>
</template>

<script>
import Header from "./Header.vue";

export default {
    name: 'Registration',
    components: {
        'Header': Header
    },
    data: function(){
        return{
            confirmPassword: '',
            message: '',
            isUserIdAvailable: false,
            isSuccess: false,
            userDetail: {
                id: 0,
                userName: '',
                password: '',
                email: ''
            }
        }
    },
    methods: {
        checkUserAvailability: function(){
            if(!this.userDetail.userName){
                this.isUserIdAvailable = false;
                this.message = 'Please provide user name';
                return
            }
            this.$http.get("http://localhost:3000/userDetails?userName=" + this.userDetail.userName)
            .then(res => {
                if(res.data.length == 0){
                    this.isUserIdAvailable = true;
                    this.message = '';
                }
                else{
                    this.isUserIdAvailable = false;
                    this.message = 'User name not available';
                }
            }, err => {
                console.log(err);
            })
        },
        validate: function(){
            this.isSuccess = false;
            if(this.userDetail.userName != '' && this.userDetail.password != ''
                && this.userDetail.confirmPassword != '' && this.userDetail.email != '')
                return true;
        },
        register: function(){
            if(!this.validate()){
                this.message = 'Please provide ALL fields';
                return;
            }
            if(this.userDetail.password != this.confirmPassword){
                this.message = 'Password mismatch';
                this.userDetail.password = this.confirmPassword = '';
                return;
            }
            this.$http.post("http://localhost:3000/userDetails/", this.userDetail)
            .then(res => {
                console.log(res);
                this.isSuccess = true;
                this.userDetail = [];
                this.confirmPassword = '';
                this.message = 'User registered successfully';
                this.isUserIdAvailable = false;
            }, err => {
                console.log(err);
            })
        }
    }
}
</script>