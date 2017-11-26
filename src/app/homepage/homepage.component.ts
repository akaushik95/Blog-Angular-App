import { Component, OnInit } from '@angular/core';
import {BlogserviceService} from "../blogservice/blogservice.service";
import {LoginService} from "../loginservice/login.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  blogs: any[]=[];
  techBlog: any[]=[];
  nonTechBlog: any[]=[];
  myBlogsArr: any[]=[];
  myFavBlogsArr: any[]=[];
  isUserLoggedIn : boolean = localStorage.length!=0;
  edit : boolean = false;
  tempTitle :String;
  user:any;
  searchResult:any[]=[];

  constructor(private request: BlogserviceService) { }

  ngOnInit() {
    this.home();
  }

  home(){
    document.getElementById("all").style.display = "block";
    document.getElementById("tech").style.display = "none";
    document.getElementById("nonTech").style.display = "none";
    this.request.loadData()
      .subscribe((data) => {
        this.blogs = data;
        console.log(this.blogs);
      });
  }

  getTechBlogs(){
    for(var i=0;i<this.blogs.length;i++){
      if(this.blogs[i].category === "Technical"){
        this.techBlog.push(this.blogs[i]);
      }
    }
    // console.log(this.techBlog);
  }

  getNonTechBlogs(){
    for(var i=0;i<this.blogs.length;i++){
      if(this.blogs[i].category === "NonTechnical"){
        this.nonTechBlog.push(this.blogs[i]);
      }
    }
    // console.log(this.nonTechBlog);
  }

  getMyBlogs(){
    for(var i=0;i<this.blogs.length;i++){
      if(this.blogs[i].createdBy === JSON.parse(localStorage.getItem("user")).username){
        this.myBlogsArr.push(this.blogs[i]);
      }
    }
  }

  tech(){
    this.techBlog = [];
    this.nonTechBlog = [];
    this.myBlogsArr = [];
    document.getElementById("tech").style.display = "block";
    document.getElementById("all").style.display = "none";
    document.getElementById("nonTech").style.display = "none";
    document.getElementById("myblogs").style.display = "none";
    this.getTechBlogs();
  }

  nonTech(){
    this.nonTechBlog = [];
    this.techBlog = [];
    this.myBlogsArr = [];
    document.getElementById("all").style.display = "none";
    document.getElementById("tech").style.display = "none";
    document.getElementById("nonTech").style.display = "block";
    document.getElementById("myblogs").style.display = "none";
    this.getNonTechBlogs();
  }

  myBlogs(){
    this.nonTechBlog = [];
    this.myBlogsArr = [];
    this.techBlog = [];
    document.getElementById("all").style.display = "none";
    document.getElementById("tech").style.display = "none";
    document.getElementById("nonTech").style.display = "none";
    document.getElementById("myblogs").style.display = "block";
    this.getMyBlogs();

  }

  addBlog(title, body){
    let blog = {
      title: title,
      body: body,
      category: (<HTMLSelectElement>(document.getElementById("blogtype"))).value,
      createdBy: JSON.parse(localStorage.getItem("user")).username,
      createDate : new Date()
    };

    console.log(title);
    if(title == "" || body == "" || title == null || body == null){
      alert("!!! Please fill up the title and body !!!")
    }else{
      this.request.postData(blog).subscribe(data => {
        console.log(data);
        this.blogs.push(data);
      });
      window.location.reload();
    }
  }

  addUser(username, password){
    let user = {
      username: username,
      password: password,
      favourite:[]
    };

    this.request.postUserData(user).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

  editBlog(title, body){
    // console.log(title + " " + body);
    this.edit=true;
    (<HTMLInputElement>document.getElementById("title")).value = title;
    this.tempTitle = title;
    (<HTMLInputElement>document.getElementById("body")).value = body;
  }

  updateBlog(title, body){

    for(var i=0;i<this.blogs.length;i++){
      if(this.blogs[i].title === this.tempTitle) {

        let blog = {
          title: title != null ? title : (<HTMLInputElement>document.getElementById("title")).value,
          body: body != null ? body : (<HTMLInputElement>document.getElementById("body")).value,
          category: (<HTMLSelectElement>(document.getElementById("blogtype"))).value,
          createdBy: JSON.parse(localStorage.getItem("user")).username,
          createDate : new Date()
        };

        this.request.patchData(this.blogs[i].id, blog).subscribe(data => {
          console.log(data);
        });
        break;
      }
    }
    window.location.reload();
  }

  deleteBlog(title, body){
    for(var i=0;i<this.blogs.length;i++){
      if(this.blogs[i].title === title){
        this.request.deleteData(this.blogs[i].id).subscribe(data => {
          console.log(data);
        });
        break;
      }
    }
    window.location.reload();
  }

  favouriteBlog(title){
    if(localStorage.length==0){
      alert("Please login to mark favourites");
    }else {
      for (var i = 0; i < this.blogs.length; i++) {
        var arr = (JSON.parse(localStorage.getItem("user")).favourite);
        if (this.blogs[i].title === title) {
          if(!arr.includes(this.blogs[i].id)){
            arr.push(this.blogs[i].id);
          }
          let blog = {
            favourite: arr
          }

          var tempId = JSON.parse(localStorage.getItem("user")).id
          console.log(blog);
          this.request.postDataById(tempId, blog).subscribe((data) => {
            console.log(JSON.parse(localStorage.getItem("user")));
          });
          localStorage.clear();
          this.request.getUserData(tempId).subscribe(data => {
            console.log(data);
            this.user = data;
            localStorage.setItem("user", JSON.stringify(this.user));
          });
          arr = null;
          break;
        }
      }
      window.location.reload();
    }

  }

  getSearchBlogs(title){
    for(var i=0;i<this.blogs.length;i++){
      if(this.blogs[i].title.toLowerCase().includes(title)){
        this.searchResult.push(this.blogs[i]);
      }
    }
    console.log(this.searchResult);
  }

  search(){
    if(this.searchResult.length == 0){
      var searchValue = (<HTMLInputElement>(document.getElementById("search"))).value;
      this.getSearchBlogs(searchValue);
      document.getElementById("searchResultDiv").style.display = "block";
    }else{
      alert("!!! search results already shown, Press cancel to search again !!!");
    }
  }

  closeSearch(){
    this.searchResult = [];
    document.getElementById("searchResultDiv").style.display = "none";
    (<HTMLInputElement>(document.getElementById("search"))).value = "";
  }
}
