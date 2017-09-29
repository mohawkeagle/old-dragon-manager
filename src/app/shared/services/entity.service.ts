import { Observable } from 'rxjs/Observable';

import { Http, Headers } from '@angular/http';

import { AuthenticationService } from '../../authentication/authentication.service';

/**
 * Abstract class that contains useful methods and information for entity
 * managing services
 */
export abstract class EntityService<T> {

  protected headers: Headers;
  protected url: string = 'http://127.0.0.1:3000/api/v1';

  constructor(
    protected authService: AuthenticationService,
    protected http: Http
  ) { }

  private get options(): any {
    this.headers = this.authService.authHeaders;
    return { headers: this.headers };
  }

  protected responseToJson(response: any): any {
    return response.json();
  }

  /**
   * Entity insertion function
   * @param  {T}               params Entity parameters
   * @return {Observable<any>}        Response Observable
   */
  protected create(params: T): Observable<any> | T {
    return null;
  }

  /**
   * Entity removal function
   * @param  {number}          id Entity identification
   * @return {Observable<any>}    Response Observable
   */
  protected destroy(id: number): Observable<any> | T {
    return null;
  }

  /**
   * Query function for single entity results
   * @param  {number}          id Entity identification
   * @return {Observable<any>}    Response Observable
   */
  protected find(id: number): Observable<any> | T {
    return null;
  }

  /**
   * Query function for multiple entity results
   * @return {Observable<any>} Response Observable
   */
  protected list(): Observable<any> | T[] {
    return null;
  }

  /**
   * Entity update function
   * @param  {number}          id Entity identification
   * @param  {T}               params Entity parameters
   * @return {Observable<any>}        Response Observable
   */
  protected update(id: number, params: T): Observable<any> | T {
    return null;
  }

  /**
   * [_create description]
   * @param  {string} resource [description]
   * @return {[type]}          [description]
   */
  protected _create(resource: string) {
    return (params: any): Observable<any> => {
      let _params = JSON.stringify(params);
      return this.http.post(`${this.url}/${resource}`, _params, this.options)
        .map(this.responseToJson);
    }
  }

  /**
   * [_find description]
   * @param  {string} resource [description]
   * @param  {string} custom   [description]
   * @return {[type]}          [description]
   */
  protected _custom(resource: string, custom: string) {
    return (id: any): Observable<any> => {
      let customUrl = `${this.url}/${resource}/${id}/${custom}`;
      return this.http.get(customUrl, this.options).map(this.responseToJson);
    }
  }

  /**
   * [_destroy description]
   * @param  {string} resource [description]
   * @return {[type]}          [description]
   */
  protected _destroy(resource: string) {
    return (id: any): Observable<any> => {
      return this.http.delete(`${this.url}/${resource}/${id}`, this.options)
        .map(this.responseToJson);
    }
  }

  /**
   * [_find description]
   * @param  {string} resource [description]
   * @return {[type]}          [description]
   */
  protected _find(resource: string) {
    return (id: any): Observable<any> => {
      return this.http.get(`${this.url}/${resource}/${id}`, this.options)
        .map(this.responseToJson);
    }
  }

  /**
   * [_list description]
   * @param  {string} resource [description]
   * @return {[type]}          [description]
   */
  protected _list(resource: string) {
    return (): Observable<any> => {
      return this.http.get(`${this.url}/${resource}`, this.options)
        .map(this.responseToJson);
    }
  }

  /**
   * [_update description]
   * @param  {string} resource [description]
   * @return {[type]}          [description]
   */
  protected _update(resource: string) {
    return (id: any, params: any): Observable<any> => {
      let _params = JSON.stringify(params);
      return this.http.put(`${this.url}/${resource}/${id}`, _params, this.options)
        .map(this.responseToJson);
    }
  }

  protected getLorem() : string {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do '
      +'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim '
      +'ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '
      +'aliquip ex ea commodo consequat. Duis aute irure dolor in '
      +'reprehenderit in voluptate velit esse cillum dolore eu fugiat '
      +'nulla pariatur. Excepteur sint occaecat cupidatat non proident, '
      +'sunt in culpa qui officia deserunt mollit anim id est laborum.';
  }
}
