import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3000/blogs/';
const BASE_URL_USER = 'http://localhost:3000/users/';

const header = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class UnmarkService {

  constructor(private http: Http) { }

  postDataById(id, data) {
    return this.http.patch(BASE_URL_USER+id, data, header).map(res => res.json())
  }

  getUserData(id){
    return this.http.get(BASE_URL_USER+id, header).map(res => res.json());
  }

}
