import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AddComponent } from '../pages/add/add.component';


export class CanDeactivateGuardService implements CanDeactivate<AddComponent> {

    canDeactivate(component: AddComponent,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean> | boolean {
        return component.leaveTip();
    }
}
