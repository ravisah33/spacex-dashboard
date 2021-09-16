import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private httpHeader = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) {}

  getAPI(path: string, requestObj?, config?): Observable<any> {
    let url = config?.externalURL ? path : `http://myurl.com${path}`;
    if (Array.isArray(requestObj?.params)) {
      requestObj.params.forEach((urlParam) => {
        url += `/${urlParam}`;
      });
    }
    return this.http.get(url).pipe(
      map((data) => {
        if (data['responseMessage']['message'] === 'SUCCESS') {
          return data['responseData'];
        }
      }, catchError(this.handleError))
    );
  }

  postAPI(path: string, requestObj?, config?): Observable<any> {
    const url = config?.externalURL ? path : `http://myurl.com${path}`;

    if (config?.headers) {
      this.httpHeader = new HttpHeaders(config?.headers);
    }

    return this.http
      .post<any>(url, requestObj, {
        headers: this.httpHeader,
        observe: 'response',
      })
      .pipe(
        map((data) => {
          if (data['body']['responseMessage']['message'] === 'SUCCESS') {
            return data['body']['responseData'];
          }
        }, catchError(this.handleError))
      );
  }

  putAPI(path: string, requestObj?, config?): Observable<any> {
    const url = config?.externalURL ? path : `http://myurl.com${path}`;

    if (config?.headers) {
      this.httpHeader = new HttpHeaders(config?.headers);
    }

    return this.http
      .put<any>(url, requestObj, {
        headers: this.httpHeader,
        observe: 'response',
      })
      .pipe(
        map((data) => {
          if (data['body']['responseMessage']['message'] === 'SUCCESS') {
            return data['body']['responseData'];
          }
        }, catchError(this.handleError))
      );
  }

  uploadFile(path, formdata, config?) {
    let url = config?.externalURL ? path : `http://myurl.com${path}`;
    return this.http.post<any>(url, formdata).pipe(
      map((data) => {
        if (data['responseMessage']['message'] === 'SUCCESS') {
          return data['responseData'];
        }
      }, catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
