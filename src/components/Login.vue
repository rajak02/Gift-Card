<template>
    <div class="content">
        <Header isLogin='1' />
        <br />
        <div class="Login">
            <div class="error">{{ message }}</div>
            <div v-on:keypress="enterKeyPress">
                <h3>Username</h3>
                <input type="text" autofocus v-model="userName">
                <h3>Password</h3>
                <input type="password" v-model="password">
                <br />
                <br />
                <button v-on:click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "./Header.vue";

export default {
    name: 'Login',
    components: {
        'Header': Header
    },
    data: function(){
        return{
            message: '',
            userName: '',
            password: ''
        }
    },
    methods: {
        enterKeyPress: function(e){
            if(e.keyCode == 13){
                if(this.validate())
                    this.login();
                else
                    this.message = 'Please provide ALL fields';
            }
        },
        validate: function(){
            if(this.userName != '' && this.password != '')
                return true;
            else
                return false;
        },
        login: function(){
            if(!this.validate()){
                this.message = 'Please provide ALL fields';
                return;
            }
            else{
                 this.$http.get("http://localhost:3000/userDetails/", {
                     params: {
                         userName: this.userName,
                         password: this.password
                     }
                 })
                .then(res => {
                    console.log(res.data);
                    if(res.data.length == 1){
                        this.message = 'Success';
                        var id = res.data[0].id;
                        if(id == 1)
                            this.$router.push({path: 'OrderHistory/1'});
                        else
                            this.$router.push({path: 'NewOrder/' + id})
                    }
                    else
                        this.message = 'Invalid credentials';
                    this.userName = this.password = '';
                }, err => {
                    console.log(err);
                })
            }
        }
    }
}
</script>