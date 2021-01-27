import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';
import { NavItem } from 'src/utils/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  navList: Array<NavItem>;
  showTop: boolean = true;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navList = [
      {
        text: 'Login',
        url: '/login'
      },
      {
        text: 'Signup',
        url: '/signup'
      }
    ];

    this.subscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  logout(): void {
    this.authService.logout();
  }
}
