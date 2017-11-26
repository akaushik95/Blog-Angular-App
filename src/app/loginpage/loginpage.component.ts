import { Component, OnInit } from '@angular/core';
import {LoginService} from "../loginservice/login.service";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  users: any[]=[];
  loggedin: boolean = false;
  loggedout: boolean = true;
  name: string;

  constructor(private request: LoginService) { }

  ngOnInit() {
    if(localStorage.length!=0){
      this.loggedin = true;
      this.loggedout = false;
      this.name = JSON.parse(localStorage.getItem("user")).username;
    }

    this.request.loadData()
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
    });
  }

  verifyUser(name, password){
    var i=0;
    for(i=0;i<this.users.length;i++){
      if(this.users[i].username === name && this.users[i].password === password){
        console.log("volla user found");
        this.name = this.users[i].username;
        localStorage.setItem("user", JSON.stringify(this.users[i]));
        this.loggedin = true;
        this.loggedout = false;
        window.location.reload();
        break;
      }
    }
    if(i==this.users.length){
      alert("Invalid username or password");
    }
  }

  logoutUser(){
    localStorage.clear();
    // (<HTMLInputElement>document.getElementById("username")).value = "";
    // (<HTMLInputElement>document.getElementById("password")).value = "";
    window.location.reload();
  }
}
