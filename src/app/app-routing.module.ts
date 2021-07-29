import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {provideRouteNames, routeNames} from '../libs/core/routes';

const routes: Routes = [
  {
    path: routeNames.Public.Invitation,
    loadChildren: () => import('../libs/public-invitation').then(m => m.PublicInvitationModule),
  },
  {
    path: routeNames.Base,
    loadChildren: () => import('../libs/protected-content').then(m => m.ProtectedContentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideRouteNames(),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
