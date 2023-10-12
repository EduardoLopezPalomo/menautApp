import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){}

  onLogoutClick(){
    this.authService.logout();
    this.toastr.success("You are logged out");
    this.router.navigate(['/login']);
    return false;
  }
}
