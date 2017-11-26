import { Component, OnInit } from '@angular/core';
import {BlogserviceService} from "../blogservice/blogservice.service";

@Component({
  selector: 'app-favourite-blog',
  templateUrl: './favourite-blog.component.html',
  styleUrls: ['./favourite-blog.component.css']
})
export class FavouriteBlogComponent implements OnInit {

  favourite :any;
  favouriteBlogs: any[]=[];
  allBlogs: any[]=[];
  user:any;

  constructor(private request : BlogserviceService) { }

  ngOnInit() {
    this.favourite = JSON.parse(localStorage.getItem("user")).favourite;
    this.request.loadData()
      .subscribe((data) => {
        this.allBlogs = data;
        // console.log(this.allBlogs);
        this.getFavouriteBlogs();
      });
    console.log("Array is:"+this.favourite);

  }

  getFavouriteBlogs(){
    for(var j=0;j<this.favourite.length;j++){
      for(var i=0;i<this.allBlogs.length;i++){
        if(this.allBlogs[i].id === this.favourite[j]){
          this.favouriteBlogs.push(this.allBlogs[i]);
        }
      }
    }
    console.log("Fav blogs:"+this.favouriteBlogs);
  }

  unmarkBlog(title){
    var id;

    for(var i=0;i<this.allBlogs.length;i++){
      if(this.allBlogs[i].title === title){
        id = this.allBlogs[i].id;
        break;
      }
    }
    var arr = (JSON.parse(localStorage.getItem("user")).favourite);
    var index = arr.indexOf(id);
    if (index > -1) {
      arr.splice(index, 1);
    }

    let blog = {
      favourite: arr
    }

    var tempId = JSON.parse(localStorage.getItem("user")).id;
    this.request.postDataById(tempId, blog).subscribe((data) => {
      console.log(JSON.parse(localStorage.getItem("user")));
    });
    localStorage.clear();
    this.request.getUserData(tempId).subscribe(data => {
      console.log(data);
      this.user = data;
      localStorage.setItem("user", JSON.stringify(this.user));
    });

    arr=null;
    window.location.reload();
  }


}
