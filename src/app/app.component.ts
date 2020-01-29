import { Component, OnInit } from '@angular/core';

import { Observable, Subscription, from, of } from 'rxjs';
import { tap, map, take, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ItunesInterface } from './shared/interfaces/itunes-interface';
import { ItunesService } from './shared/services/itunes.service';
import { Itunes } from './shared/interfaces/itunes';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _title: String = 'Hello Angular';

  private oneObservable: Observable<string> = of('a value');

  public results: Observable<Itunes[]>;

  public noResult: boolean = false;

  public searchForm: FormGroup;

  public constructor(
    private iTunesService: ItunesService,
    private formBuilder: FormBuilder
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

  public ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      term: [
        ''
      ]
    });

    // Listen to field changes...
    this.results = this.searchForm.controls.term.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.noResult = true),
        switchMap((result) => this.iTunesService.search(result)),
        tap(() => this.noResult = false)
      );
      
  }

  public get title(): String {
    return this._title;
  }

  public search(terms: string): void {
    this.results = this.iTunesService.search(terms)
  }

}
