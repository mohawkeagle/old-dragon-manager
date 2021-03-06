import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../../../authentication/authentication.service';
import { CampaignsService } from '../../shared/campaigns.service';

@Injectable()
export class CampaignOwnerGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private campaignsService: CampaignsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let campaign_id = next.parent.parent.parent.params['campaign_id'];
    return this.campaignsService.canActivateOwner(campaign_id);
  }
}
