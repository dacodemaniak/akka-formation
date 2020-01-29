import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ItunesInterface } from '../interfaces/itunes-interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {

  constructor(private httpClient: HttpClient) { }

  public search(term: string): Observable<ItunesInterface[]> {
    let apiURI: string = `${environment.apiRoot}?term=${term}&media=music&limit=20`;
    return this.httpClient.get<any[]>(apiURI)
      .pipe(
        map((res: any) => { // Whole response
          return res.results.map((item: any): ItunesInterface => { // One item of the whole
            return {
              trackName: item.trackName,
              artistName: item.artistName,
              trackViewUrl: item.trackViewUrl,
              artistId: item.artistId
            } // For each item in the stream => one ITunesInterface item
          })
        })
      );
  }
}
