import { Component, Input, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

import { NavItem } from 'src/utils/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showTop: boolean = true;
  navList: Array<NavItem>;
  private URL_HIDDEN_NAV = ['/signup', '/login'];

  constructor(
    private router: Router
  ) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     this.showTop = this.URL_HIDDEN_NAV.indexOf(event.url) === -1;
    //   }
    // });
  }

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
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
