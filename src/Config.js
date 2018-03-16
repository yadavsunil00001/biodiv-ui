import axios from 'axios';

import AuthUtils from './auth/AuthUtils.js';
import loginService from './auth/LoginService';
import { getNewAccessToken } from './auth/AuthActions';

export let ROOT_URL;
export let PAMBA_API_ROOT_URL;
export let API_ROOT_URL;

if(process.env.NODE_ENV=="development" ){
    ROOT_URL="http://hybrid.indiabiodiversity.org"
    API_ROOT_URL="http://hybrid.indiabiodiversity.org/biodiv-api"
    //ROOT_URL="https://hybrid.pamab.strandls.com"
    //API_ROOT_URL="https://hybrid.pamab.strandls.com"
    PAMBA_API_ROOT_URL="https://hybrid.pamab.strandls.com/biodiv-api";
}

if(process.env.NODE_ENV=="kk" ){
    ROOT_URL="http://indiabiodiversity.org";
    PAMBA_API_ROOT_URL="https://indiabiodiversity.org/biodiv-api";
    API_ROOT_URL="https://indiabiodiversity.org/biodiv-api";
}

if(process.env.NODE_ENV=="production" ){
    ROOT_URL="https://hybrid.pamba.strandls.com";
    PAMBA_API_ROOT_URL="https://hybrid.pamba.strandls.com/biodiv-api";
    API_ROOT_URL="https://hybrid.pamba.strandls.com/biodiv-api"
}

axios.defaults.baseURL = ROOT_URL;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(function (config) {

//    console.log('---------------------BEFORE REQUEST START------------------------');
    var accessToken = loginService.accessToken;
    if(accessToken) {
        //  console.log('Adding access token in axios header');
        //  config.headers = { 'X-AUTH-TOKEN' : accessToken};
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
//    console.log('---------------------BEFORE REQUEST END------------------------');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    //console.log('---------------------ON RESPONSE START------------------------');
    //console.log(response);
    //console.log('---------------------ON RESPONSE END------------------------');
    return response;
}, function(error) {
    console.log(error);
    if(error.response.status == 401) {
        /*        var credentials = loginService.getCredentials();
        var now = new Date().getTime();
        var brToken = credentials.getRefreshToken();
        var timeLeftForRToken = credentials.getLastLoginDate().getTime() + (30*24*60*60*1000) - now;//issued at+30 days - now

        //if only 5 days are left to get new refresh token we will
        //propmt the user to login again to progress his login window by another 30 days
        if(brToken == null || timeLeftForRToken <= 5) {
        } else {
            //get new accessToken with existing refreshtoken
            getNewAccessToken();
        }*/
        return Promise.reject(error);
    } else {
        return Promise.reject(error);
    }
});


/**
 * Default configuration
 */
export let Config = {
    api:{
        API_ROOT_URL : API_ROOT_URL,
        PAMBA_API_ROOT_URL : PAMBA_API_ROOT_URL,
        ROOT_URL : ROOT_URL,
        login : {
            default : {
                method : 'post',
                baseURL:'',
                url :  API_ROOT_URL+'/login/auth',
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
                data : {}
            },
            token : {
                method: 'post',
                baseURL:'',
                url : API_ROOT_URL+'/login/token'
            }
        },
        logout : {
            default : {
                method : 'get',
                url :  API_ROOT_URL+'/logout',
                data:{}
            }
        },
        register : {
            default : {
                method : 'post',
                    url : '/register'
            },
            forgotPassword :  {
            }
        },
        observation : {
            list : {
                method:'get',
                url:'/'
            },
            show : {
            },
            save : {
                method:'post',
                url:'/'
            }
        }
    }
}


if(process.env.NODE_ENV=="development" ) {
    Config.api.fbId = "115305755799166"
    Config.api.googleId = "317806372709-roromqiujiji1po5jh8adpcr5um895mb.apps.googleusercontent.com"
    Config.api.cookie = {domain : '.indiabiodiversity.org', path : '/'};
} else if(process.env.NODE_ENV=="kk" ){
    Config.api.fbId = "320284831369968"
    Config.api.googleId = "317806372709-tm8qc7j41enrblvqisd11b3mqrjdijfv.apps.googleusercontent.com"
    Config.api.cookie = {domain : '.indiabiodiversity.org', path : '/'};
} else if(process.env.NODE_ENV=="production" ){
    Config.api.fbId = "2008434629393838"
    Config.api.googleId = "317806372709-o80ff31oilqdcpujs8264u5ef9m5ejsd.apps.googleusercontent.com"
    Config.api.cookie = {domain : '.pamba.strandls.com', path : '/'};
}
