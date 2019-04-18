import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import * as Components from './components/_index';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: Components.AuthComponent,
    data: { title: 'Bumagi - Authorization' }
  },
  {
    path: 'list',
    component: Components.ListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Bumagi - List of users' }
  },
  {
    path: '**',
    component: Components.PageNotFoundComponent,
    data: { title: 'Bumagi - Page not found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
