import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './protected-content-wrapper.component.html',
  styleUrls: ['./protected-content-wrapper.component.css']
})
export class ProtectedContentWrapperComponent {

  menuItems = [
    {
      title: 'Pozivnice',
      route: '/invitation',
    },
    {
      title: 'Predloške',
      route: '/template',
    },
  ];

  constructor(
    private router: Router,
  ) {
  }

  isRouteActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
