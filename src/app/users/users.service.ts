import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Md5 } from 'ts-md5/dist/md5';

import { AuthenticationService } from '../authentication/authentication.service';
import { EntityService } from '../shared/services/entity.service';
import { User } from '../shared/entities/user';

@Injectable()
export class UsersService extends EntityService<User> {

  constructor(auth: AuthenticationService, http: Http) {
    super(auth, http);
  }

  /**
   * Generates the link to gravatar using the user email address
   * @param  {string} email User email address
   * @return {string}       Link to gravatar
   */
  avatarHash(email: string): string | Int32Array {
    if (!email) {
      return '';
    }
    let emailMd5 = Md5.hashStr(email);
    return `https://www.gravatar.com/avatar/${emailMd5}?s=512`;
  }

  /**
   * [create description]
   * @param  {User}            params [description]
   * @return {Observable<any>}        [description]
   */
  create(params: User): Observable<any> {
    return super._create("users")({user: params});
  }

  /**
   * [destroy description]
   * @param  {number}          id [description]
   * @return {Observable<any>}    [description]
   */
  destroy(id: number): Observable<any> {
    return super._destroy("users")(id);
  }

  /**
   * [find description]
   * @param  {number}          id [description]
   * @return {Observable<any>}    [description]
   */
  find(id: number): Observable<any> {
    return super._find("users")(id);
  }

  /**
   * [list description]
   * @return {Observable<any>} [description]
   */
  list(): Observable<any> {
    return super._list("users")();
  }

  /**
   * [update description]
   * @param  {number}          id     [description]
   * @param  {User}            params [description]
   * @return {Observable<any>}        [description]
   */
  update(id: number, params: User): Observable<any> {
    // console.log(params);
    return super._update("users")(id, {user: params});
  }

}