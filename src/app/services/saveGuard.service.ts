import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DialogService } from './dialog.service';
import { HomePageComponent } from '../views/home/homeChildren/home-page/home-page.component';

@Injectable({
  providedIn: 'root',
})
export class SaveGuard implements CanDeactivate<HomePageComponent> {

  constructor(private dialogService: DialogService) { }

  canDeactivate(
    component: HomePageComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (component.canDeactivate()) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('确认不保存这些数据?');
  }
}