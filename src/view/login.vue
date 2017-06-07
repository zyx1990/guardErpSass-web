<template>
    <div class='wrap'>
        <div class='header'>
            <img :src="loginImg"/>
            <h1>锦医卫</h1>
        </div>
        <div class='main'>
            <div class='message'>
                <h2>Welcome back !</h2>
                <p>锦医卫专注于创建一套统一高效、互联互通、</p>
                <p>信息共享的系统化数字医院管理平台</p>
            </div>
            <div class='login'>
                <h2>锦医卫</h2>
                <h3>登陆</h3>
                <form action="" ref='formLogin'>
                    <div class="item" v-on:click.stop='show'>
                        <label for="">输入账号</label>
                        <input  v-model.lazy="name" v-on:blur='reset' class="userName" />
                        <em></em>
                        <strong></strong>
                    </div>
                    <div class="item" v-on:click.stop='show'>
                        <label for="">输入密码</label>
                        <input  v-model="password" type="password" v-on:blur='reset' class="password" />
                        <em></em>
                        <strong></strong>
                    </div>
                    <div>
                        <Checkbox v-model="single">记住账号</Checkbox>
                    </div>
                    <button type="button" v-on:click='handleSubmit'>登入</button>
                    <a href="javascritp:void(0);">忘记密码</a>
                </form>
            </div>
        </div>
    </div> 
</template>

<script>
    export default {
        data() {
            return {
                isHQ: '',
                name: '',
                password: '',
                single: false,
                loginImg: require('assets/img/login.png')
            }
        },
        mounted: function(){    
        },
        methods: {
            reset: function(e) {
                if($(e.target).val().length == 0) {
                    $(e.target).siblings('label').stop(true).animate({"top" : '35px'}, 100)
                }
                $(e.target).siblings('em').stop(true).animate({"left" : '-100%'}, 100)
            },
            show: function(e) {
                if($(e.target).attr('class') != 'item') {
                    $(e.target).parent().find('label').stop(true).animate({"top" : '10px'}, 100)
                    $(e.target).parent().find('em').stop(true).animate({"left" : '0'}, 100)
                    $(e.target).parent().find('input').focus();
                }
            },
            handleSubmit: function() {
                var _vm = this;
                var userName = $(_vm .$refs.formLogin).find('.userName')
                var password = $(_vm .$refs.formLogin).find('.password')
                _vm .nameRule()
                _vm .passwordRule()
                // window.sessionStorage.setItem('userAccount', _vm .name);
                // _vm.$router.push('/desktop');
                if(_vm.nameRule() > 0 && _vm .passwordRule() > 0) {
                    _vm.$http.post({
                        url: 'guard-webManager/login/login.jhtml',
                        data: {account: _vm.name, password: _vm.password},
                        success: function(res){
                            if(res.status == 200 ){
                                var code = res.data.code;
                                if(code == 0){
                                     _vm.$token.setToken('adminToken', res.data.content.access_token);
                                    window.sessionStorage.setItem('userAccount', res.data.content.user.name);
                                    window.sessionStorage.setItem('hospId', res.data.content.user.hospitalid);
                                    if(res.data.content.user.hospitalid == 1) {
                                        _vm.isHQ = true
                                    } else {
                                        _vm.isHQ = false
                                    }
                                    window.sessionStorage.setItem('isHQ', _vm.isHQ);
                                    _vm.$router.push('/desktop');
                                }else{
                                    console.log(res.data);
                                    console.log(res.data.desc || '登录失败');
                                } 
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    }); 
                }
            },
            nameRule: function() {
                var userName = $(this.$refs.formLogin).find('.userName')
                if(this.name.length == 0) {
                    userName.css({
                        'borderColor' : "red"
                    })
                    userName.siblings('strong').html('用户名不能为空！')
                    return -1
                } else {
                    userName.css({
                        'borderColor' : "rgba(0,0,0,0.20)"
                    })
                    userName.siblings('strong').html('')
                    return 1
                }
            },
            passwordRule: function() {
                var password = $(this.$refs.formLogin).find('.password')
                if(this.password.length == 0) {
                    password.css({
                        'borderColor' : "red"
                    })
                    password.siblings('strong').html('密码不能为空！')
                    return -1
                } else {
                    password.css({
                        'borderColor' : "rgba(0,0,0,0.20)"
                    })
                    password.siblings('strong').html('')
                    return 1
                }
            }
        }
    }
</script>
<style scoped>
    html, 
    body {
        width: 100%;
        height: 100%;
    }
    .wrap {
        position: relative;
        width: 1170px;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
    }
    .header {
        height: 150px;
    }
    .header img {
        float: left;
        width: 47px;
        height: 50px;
        margin: 50px 35px 0 0;
    }
    .header h1 {
        float: left;
        font-size: 34px;
        line-height: 150px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 0;
    }
    .main {
        position: absolute;
        top: 150px;
        bottom: 0;
        left: 0;
        right: 0;
        min-height: 500px;
    }
    .message {
        position: absolute;
        top: 50%;
        left: 190px;
        height: 164px;
        margin-top: -157px;
        -webkit-animation: fadeInLeft 1s .2s ease both;
        -ms-animation: fadeInLeft 1s .2s ease both;
        -moz-animation: fadeInLeft 1s .2s ease both;
        animation: fadeInLeft 1s .2s ease both;
    }
    @-webkit-keyframes fadeInLeft{
        0% {
            opacity:0;
            -webkit-transform:translateX(-2000px);
        }
        100% {
            opacity:1;
            -webkit-transform:translateX(0);
        }
    }
    @-moz-keyframes fadeInLeft{
        0% {
            opacity:0;
            -moz-transform:translateX(-2000px);
        }
        100% {
            opacity:1;
            -moz-transform:translateX(0);
        }
    }
    @-ms-keyframes fadeInLeft{
        0% {
            opacity:0;
            -ms-transform:translateX(-2000px);
        }
        100% {
            opacity:1;
            -ms-transform:translateX(0);
        }
    }
    @keyframes fadeInLeft{
        0% {
            opacity:0;
            transform:translateX(-2000px);
        }
        100% {
            opacity:1;
            transform:translateX(0);
        }
    }
    .message h2 {
        margin-bottom: 35px;
        font-size: 45px;
        line-height: 63px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 0;
    }
    .message p {
        font-size: 24px;
        line-height: 33px;
        color: rgba(0,0,0,0.54);
        letter-spacing: 0;
    }
    .login {
        position: absolute;
        right: 5px;
        top: 50%;
        width: 350px;
        height: 490px;
        padding: 35px 25px 0;
        margin-top: -320px;
        -webkit-box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
        -moz-box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
        -ms-box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
        box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-animation: fadeInRight 1s .2s ease both;
        -moz-animation: fadeInRight 1s .2s ease both;
        -ms-animation: fadeInRight 1s .2s ease both;
        animation: fadeInRight 1s .2s ease both;
    }
    @-webkit-keyframes fadeInRight {
        0% {
            opacity:0;
            -webkit-transform:translateX(2000px);
        }
        100% {
            opacity:1;
            -webkit-transform:translateX(0);
        }
    }
    @-moz-keyframes fadeInRight {
        0% {
            opacity:0;
            -moz-transform:translateX(2000px);
        }
        100% {
            opacity:1;
            -moz-transform:translateX(0);
        }
    }
    @-ms-keyframes fadeInRight {
        0% {
            opacity:0;
            -ms-transform:translateX(2000px);
        }
        100% {
            opacity:1;
            -ms-transform:translateX(0);
        }
    }
    @keyframes fadeInRight {
        0% {
            opacity:0;
            transform:translateX(2000px);
        }
        100% {
            opacity:1;
            transform:translateX(0);
        }
    }
    .login h2 {
        margin-bottom: 35px;
        font-size: 34px;
        line-height: 48px;
        text-align: center;
        color: #5B8BEE;
        letter-spacing: 0;
    }
    .login h3 {
        font-size: 24px;
        font-weight: normal;
        line-height: 33px;
        text-align: center;
        color: rgba(0,0,0,0.87);
        letter-spacing: 0;
        margin-bottom: 25px;
    }
    .login form div {
        position: relative;
        overflow: hidden;
        padding-top: 20px;
    }
    .login form div strong {
        position: absolute;
        right: 0;
        bottom: 7px;
        color: red;
    }
    .login .item label {
        position: absolute;
        left: 10px;
        top: 35px;
        font-size: 14px;
        color: rgba(0,0,0,0.38);
        letter-spacing: 0;
    }
    .login .item em {
        position: absolute;
        left: -100%;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #5B8BEE;
    }
    .login input {
        width: 100%;
        height: 40px;
        padding: 15px 10px 0;
        border: 0;
        border-bottom: 1px solid rgba(0,0,0,0.20);
        outline: none;
        font-size: 14px;
    }
    .login button {
        display: block;
        width: 100%;
        height: 40px;
        border: 0;
        margin: 20px 0 70px;
        font-size: 14px;
        line-height: 40px;
        letter-spacing: 0;
        text-align: center;
        color: #FFF;
        background: #5B8BEE;
        cursor: pointer;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        outline: none;
    }
    @media all and (max-width: 1169px) {
        .wrap {
            width: 880px;
        }
        .message {
            left: 0;
        }
    }
    @media all and (max-width: 879px) {
        .wrap {
            width: 360px;
        }
        .message {
            display: none;
        }
    }
</style>
<style>
    .login .ivu-checkbox {
        margin-right: 10px;
    }
</style>
