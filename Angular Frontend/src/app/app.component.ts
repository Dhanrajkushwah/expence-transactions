import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any|string;
  isSidenavOpened = true;
  public isAuthenticated = false;
  boardId = '1'; 
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {


  }

  onSignIn() {
    this.router.navigate(['/loginform']);
  }

  onSignUp() {
    this.router.navigate(['/signupform']);
  }

  onLogout() {
 // Call the logout method in the service
    this.router.navigate(['/loginform']);
  }

  onSettings() {
    // Logic for Settings
  }

  onThemes() {
    // Logic for changing themes
  }
}
