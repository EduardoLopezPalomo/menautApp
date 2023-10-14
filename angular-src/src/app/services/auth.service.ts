import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();


export function isTokenValid(token: string): boolean {
  try {
    const isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  } catch (error) {
    console.error('Error checking token:', error);
    return false;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user : any;

  constructor(private http: HttpClient ) { }

  registerUser(user:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers:headers}).pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  autheticateUser(user:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, {headers:headers}).pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  getProfile(){
    return localStorage.getItem("user");
  }

  storeUserData(token: any, user: any){
    localStorage.setItem("id_token",token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn(){
    return isTokenValid(this.authToken);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
