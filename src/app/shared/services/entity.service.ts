import { Observable } from 'rxjs/Observable';

import { Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';

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
   * @return {Observable<any>}        Observavel do request
   */
  protected create(params: T): Observable<any> | T {
    return null;
  }

  /**
   * Entity removal function
   * @param  {number}          id Entity identification
   * @return {Observable<any>}    Observavel do request
   */
  protected destroy(id: any): Observable<any> | T {
    return null;
  }

  /**
   * Entity child removal function
   * [destroy description]
   * @param  {any}             id [description]
   * @return {Observable<any>}    [description]
   */
  protected destroyChild(parentId: any, childId: any): Observable<any> | T {
    return null;
  }

  /**
   * Query function for single entity results
   * @param  {any}             id Entity identification
   * @return {Observable<any>}    Observavel do request
   */
  protected find(id: any): Observable<any> | T {
    return null;
  }

  /**
   * Query function for single child entity results
   * @param  {any}             parentId Id da entidade pai
   * @param  {any}             childId  Id da entidade filho
   * @return {Observable<any>}          [description]
   */
  protected findChild(parentId: any, childId: any): Observable<any> | T {
    return null;
  }

  /**
   * Query function for multiple entity results
   * @return {Observable<any>} Observavel do request
   */
  protected list(): Observable<any> | T[] {
    return null;
  }

  /**
   * Entity update function
   * @param  {any}             id Entity identification
   * @param  {T}               params Entity parameters
   * @return {Observable<any>}        Observavel do request
   */
  protected update(id: any, params: T): Observable<any> | T {
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
   * [_createChild description]
   * @param  {string} parentResource [description]
   * @param  {string} childResource  [description]
   * @return {[type]}                 [description]
   */
  protected _createChild(parentResource: string, childResource: string) {
    return (parentId: any, params: any): Observable<any> => {
      let _params = JSON.stringify(params);
      let url = `${this.url}/${parentResource}/${parentId}/${childResource}`;
      return this.http.post(url, _params, this.options)
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
    return (id: any, params?: URLSearchParams): Observable<any> => {
      let options = this.options;
      if (params) { /* Se tiver parâmetros de busca, extende objeto de opções */
        options = Object.assign(options, {params: params});
      }
      let customUrl = `${this.url}/${resource}/${id}/${custom}`;
      return this.http.get(customUrl, options).map(this.responseToJson);
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
   * [_destroyChild description]
   * @param  {string} parentResource [description]
   * @param  {string} childResource  [description]
   * @return {[type]}                [description]
   */
  protected _destroyChild(parentResource: string, childResource: string) {
    return (parentId: any, childId: any): Observable<any> => {
      let parentUrl = `${parentResource}/${parentId}`,
          childUrl = `${childResource}/${childId}`,
          url = `${this.url}/${parentUrl}/${childUrl}`;
      return this.http.delete(url, this.options).map(this.responseToJson);
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
   * [_findChildren description]
   * @param  {string}   parentResource [description]
   * @param  {string}   childResource  [description]
   * @return {function}                 [description]
   */
  protected _findChildren(parentResource: string, childResource: string) {
    return (parentId: any, childId: any): Observable<any> => {
      let parentUrl = `${parentResource}/${parentId}`;
      let childUrl = `${childResource}/${childId}`;
      let url = `${this.url}/${parentUrl}/${childUrl}`;
      return this.http.get(url, this.options)
        .map(this.responseToJson);
    }
  }

  /**
   * [_list description]
   * @param  {string} resource [description]
   * @return {[type]}          [description]
   */
  protected _list(resource: string) {
    return (search?: any): Observable<any> => {
      let params = new URLSearchParams('');
      for (let key in search) {
        params.set(key, search[key]);
      }

      let options = new RequestOptions();
      options.headers = this.options.headers;
      options.params = params;

      console.log('sending with', options);
      return this.http.get(`${this.url}/${resource}`, options)
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

  /**
   * [_updateChild description]
   * @param  {string} parentResource [description]
   * @param  {string} childResource  [description]
   * @return {[type]}                 [description]
   */
  protected _updateChild(parentResource: string, childResource: string) {
    return (parentId: any, childId: any, params: any): Observable<any> => {
      let _params = JSON.stringify(params);
      let parentUrl = `${parentResource}/${parentId}`;
      let childUrl = `${childResource}/${childId}`;
      let url = `${this.url}/${parentUrl}/${childUrl}`;
      return this.http.put(url, _params, this.options).map(this.responseToJson);
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
