import { Component } from '@angular/core';

import { Observable, Subscription, from, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ItunesInterface } from './shared/interfaces/itunes-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _title: String = 'Hello Angular';

  private oneObservable: Observable<string> = of('a value');

  public constructor(
    private httpClient: HttpClient
  ) {
    const stream: Subscription = this.oneObservable.subscribe((observed: string) => {
      console.log('Je suis la valeur observée : ' + observed);
    }, (error) => {
      console.log('Something went wrong while subscription : ', error);
    },
    () => { // Plus aucune donnée émise par l'Observateur
      console.log('Process finished');
    });
    stream.unsubscribe();

    const arrayOfValues: number[] = [15, 30, 10, 9, 9];
    const observator: Observable<number> = from(arrayOfValues);
    observator.subscribe((observed: number) => {
      console.log('Hey : ', observed);
    },
    (error) => {
      console.log('Some errors while reading');
    },
    () => {
      console.log('No more digits in array...');
    });

    // Some other operators
    const stringObservator: Observable<string> = of("Jean-Luc");
    let originalValue: string;
    stringObservator.pipe(
      tap((value) => {
        console.log('Before : ', value);
        originalValue = value;
      }),
      map((value: string) => value.length),
      tap((value) => console.log('Après modification : ', value))
    ).subscribe((value: number) => {
      console.log('Value observed : ', value, " from ", originalValue);
    });
  }

  public get title(): String {
    return this._title;
  }

  public search(term: string): void {
    let apiURI: string = `${environment.apiRoot}?term=${term}&media=music&limit=20`;
    this.httpClient.get<any[]>(apiURI)
      .pipe(
        map((res: any) => { // Whole response
          return res.results.map((item: any): ItunesInterface => { // One item of the whole
            return {
              trackName: item.trackName,
              artistName: item.artistName,
              trackViewUrl: item.trackViewUrl,
              artistId: item.artistId
            } // For each item in the stream, one ITunesInterface item
          })
        })
      )
      .subscribe((results: ItunesInterface[]) => {
        console.log(`Results from Apple : ${JSON.stringify(results)}`);
      },
      (error: any) => {
        
      });
  }
}
