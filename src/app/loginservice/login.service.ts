import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";

const BASE_URL = 'http://localhost:3000/users/';
const header = {headers: new Headers({'Content-Type': 'application/json'})}

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  loadData() {
    return this.http.get(BASE_URL).map(res => res.json())
  }

}
