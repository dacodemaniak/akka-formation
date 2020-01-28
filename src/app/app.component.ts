import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _title: String = 'Hello Angular';

  public get title(): String {
    return this._title;
  }
}
