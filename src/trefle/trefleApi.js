export {TrefleApi}

import {Api} from './api.js';

class TrefleApi{
    static buildUrl(url){
        return `${Api.baseUrl()}${url}`;
    }

    static async plantCount(){
        return Api.get(TrefleApi.buildUrl('/'));
    }

    static async search(query){
        return Api.get(TrefleApi.buildUrl(`/plants/search?q=${query}`));
    }

    static async getMoreInfo(id){
        return Api.get(TrefleApi.buildUrl(`/plant/${id}`));
    }
}