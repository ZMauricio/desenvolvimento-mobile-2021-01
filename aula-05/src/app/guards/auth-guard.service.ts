import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthLoginService } from 'src/app/services/auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private rota: Router, private authLogin: AuthLoginService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.authLogin.isUsuarioAutenticado()) {
      return true;
    }

    this.rota.navigate(['/login']);

    return false;
  }

}
