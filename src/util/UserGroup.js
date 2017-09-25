import axios from 'axios';

import {ROOT_URL} from '../Config';

/**
 * Class to hold all userGroups ... singleton class
 * TODO: cache loaded values
 */
class UserGroup {

    constructor() {
    }

    fetch(callback) {
        const url=`${ROOT_URL}/group/list?max=95&format=json`;
        if(callback) {
            axios.get(url).then(response => callback(response.data));
            return;
        } else 
        
        return axios.get(url).then(response => response.data);
    }

    list(callback) {
        if(this.values) {
            if(callback) return callback(this.values);
            else return this.values;
        } else return this.fetch(callback);
    }
}

export default new UserGroup();
