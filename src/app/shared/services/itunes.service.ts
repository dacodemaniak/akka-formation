import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ItunesInterface } from '../interfaces/itunes-interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ItunesFactory } from '../helpers/itunes-factory';
import { Itunes } from '../interfaces/itunes';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {

  constructor(private httpClient: HttpClient) { }

  public search(term: string): Observable<Itunes[]> {
    let apiURI: string = `${environment.apiRoot}?term=${term}&media=music&limit=20`;
    if (term.length) {
      return this.httpClient.get<any[]>(apiURI)
        .pipe(
          map((res: any) => { // Whole response
            return res.results.map((item: any): Itunes => { // One item of the whole
              return ItunesFactory.getFullInstance(item) // For each item in the stream => one ITunesInterface item
            })
          })
        );
    }
    return of(null);
  }
}
