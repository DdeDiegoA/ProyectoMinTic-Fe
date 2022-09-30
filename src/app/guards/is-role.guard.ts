import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsRoleGuard implements CanActivate {
  
  constructor(
    private router:Router,
    private authService: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.hasPermission(route.data['roles'] as string[]))
      return true;
    else
      return this.router.navigate(['user-info'])
  }
  
}