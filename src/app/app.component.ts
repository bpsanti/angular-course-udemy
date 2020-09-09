import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly SHOPPING: string = 'shopping';
  readonly RECIPE: string = 'recipe';

  title = 'angular-course-udemy';
  currentNavView;

  ngOnInit() {
    this.currentNavView = this.RECIPE;
  }

  updateNavView(ev) {
    this.currentNavView = ev;
  }
}
