import React, {Component} from 'react';

import loginService from './LoginService';

/**
 * Auth utils class with static methods
 */
class AuthUtils {
    static isLoggedIn() {
      // console.log(loginService.getAccessToken());
        if(loginService.getAccessToken()) return true;
        else return false;
    }

    static getLoggedInUser(){
      if(this.isLoggedIn()){
        return loginService.getCurrentUser();
      }else{
        return null;
      }
    }

    static isUser() {
        return AuthUtils.currentUserHasRole('ROLE_USER');
    }

    static isAdmin(){
        return AuthUtils.currentUserHasRole('ROLE_ADMIN');
    }

    static isUserGroupFounder() {
      // console.log("isUserGroupFounder")
        return AuthUtils.currentUserHasRole('ROLE_USERGROUP_FOUNDER');
    }

    static isUserGroupExpert(){
      // console.log("isUserGroupExpert")
        return AuthUtils.currentUserHasRole('ROLE_USERGROUP_EXPERT');
    }

    static isUserGroupMember(){
        return AuthUtils.currentUserHasRole('ROLE_USERGROUP_MEMBER');
    }

    static isSpeciesAdmin(){
        return AuthUtils.currentUserHasRole('ROLE_SPECIES_ADMIN');
    }

    static isCepfAdmin(){
        return AuthUtils.currentUserHasRole('ROLE_CEPF_ADMIN');
    }

    static currentUserHasRole(role) {
      // console.log("currentUserHasRole")
        if(loginService.getAccessToken()) {
            if(loginService.hasRole(role))  { return true; }
            else { return false; }
        } else return false;
    }


    static getAuthHeaders() {
        return {
            'X-Requested-With' : 'XMLHttpRequest'
        }
        /*return {
        'X-Auth-Token' : loginService.getAccessToken(),
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288"
      }*/
    }
}

export default AuthUtils;
