import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthenticationService } from '../../../authentication/authentication.service';
import { EntityService } from '../../../shared/services/entity.service';
import { Campaign, CampaignPage } from '../../../shared/models';
import { CharactersService } from '../../shared/characters.service';

@Injectable()
export class CampaignsService extends EntityService<Campaign> {

  resource: string = 'campaigns';

  constructor(
    authenticationService: AuthenticationService,
    http: Http,
    private charactersService: CharactersService
  ) {
    super(authenticationService, http);
  }

  canActivateOwner(id: number): Observable<boolean> {
    return this.find(id).map((campaign) => {
      return this.authenticationService.isCurrentUser(campaign.dungeonMaster);
    });
  }

  create(params: Campaign): Observable<any> {
    return super._create(this.resource)({campaign: params});
  }

  find(id: number): Observable<Campaign> {
    return super._find(this.resource)(id);
  }

  /**
   * Identifica se o registro deve ser criado ou atualizado e direciona para a
   * função de tratamento correta
   * @param  {any}             params Informações do registro
   * @return {Observable<any>}        Observavel de retorno do request
   */
  handle(params: any): Observable<any> {
    if (params.id) {
      return this.update(params.id, params);
    }
    return this.create(params);
  }

  list(): Observable<Campaign[]> {
    return super._list(this.resource)();
  }

  update(id: number, params: Campaign): Observable<any> {
    return super._update(this.resource)(id, {campaign: params});
  }
}
