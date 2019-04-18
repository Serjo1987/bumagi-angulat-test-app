import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public executeRequest(method: string, url: string, queryParameters?: any, body?: any, header?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers: HttpHeaders = new HttpHeaders();

      if (header) {
        if (method === 'GET' || method === 'PATCH') {
          for (let _header of header) {
            headers = headers.append(_header.name, _header.value);
          }
        }

        if (method === 'POST') {
          for (let _header of header) {
            headers.append(_header.name, _header.value);
          }
        }
      }

      this.http.request(
        method,
        url,
        {
          body: body,
          headers: headers,
          observe: 'response'
        }
      ).subscribe(result => {
        if (result) resolve(result);
        else reject(result);
      }, error => {
        reject(error);
      });
    });
  }

  public get(url: string, queryParameters?: any, header?: any): Promise<any> {
    return this.executeRequest('GET', url, {}, queryParameters, header);
  }

  public post(url: string, bodyParameters?: any, header?: any): Promise<any> {
    return this.executeRequest('POST', url, {}, bodyParameters, header);
  }

  public patch(url: string, bodyParameters?: any, header?: any): Promise<any> {
    return this.executeRequest('PATCH', url, {}, bodyParameters, header);
  }
}
