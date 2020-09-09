import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly SHOPPING: string = 'shopping';
  readonly RECIPE: string = 'recipe';

  @Output()
  selectedNavBar = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectNavBarFn(selectedNavBar: string) {
    this.selectedNavBar.emit(selectedNavBar);
  }
}
