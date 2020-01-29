import { Component } from '@angular/core';
import { Observable, of, Subscription, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _title: String = 'Hello Angular';

  private oneObservable: Observable<string> = of('a value');

  public constructor() {
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
}
