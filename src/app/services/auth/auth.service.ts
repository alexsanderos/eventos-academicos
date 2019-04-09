import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  public token: string;
  public user;

  constructor(private router: Router) { }

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.token = localStorage.getItem('event.token');
    this.user = JSON.parse(localStorage.getItem('event.user'));

    if (!this.token) {
        this.router.navigate(['/auth/login'])
        return false;
    }

    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
        let claim = routeAc.data[0]['claim'];

        if (claim) {
            if (!this.user.claims) {
                this.router.navigate(['/acesso-negado']);
                return false;
            }
            
            let userClaims = this.user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
            if (!userClaims) {
                this.router.navigate(['/acesso-negado']);
                return false;
            }
        }
    }
  }
}
