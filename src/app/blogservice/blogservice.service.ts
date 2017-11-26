import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";

const BASE_URL = 'http://localhost:3000/blogs/';
const BASE_URL_USER = 'http://localhost:3000/users/';

const header = {headers: new Headers({'Content-Type': 'application/json'})}


@Injectable()
export class BlogserviceService {

  constructor(private http: Http) { }

  loadData() {
    return this.http.get(BASE_URL).map(res => res.json())
  }

  postDataById(id, data) {
    return this.http.patch(BASE_URL_USER+id, data, header).map(res => res.json())
  }

  postData(data){
    return this.http.post(BASE_URL, data, header).map(res => res.json());
  }

  deleteData(data){
    return this.http.delete(BASE_URL+data, header).map(res => res.json());
  }

  patchData(id, data){
    return this.http.patch(BASE_URL+id, data, header).map(res => res.json());
  }

  postUserData(data){
    return this.http.post(BASE_URL_USER, data, header).map(res => res.json());
  }

  getUserData(id){
    return this.http.get(BASE_URL_USER+id, header).map(res => res.json());
  }

}
