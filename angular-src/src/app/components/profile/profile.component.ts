import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

 ngOnInit(): void {
  const userString = this.authService.getProfile();
  if(userString != null){
    const jsonObject = JSON.parse(userString);
    this.user = jsonObject;
  }else{
    console.log("the user is not reachable")
  }
 }
}
