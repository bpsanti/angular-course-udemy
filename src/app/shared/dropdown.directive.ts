import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open')
  isDropdownOpen: boolean;

  ngOnInit(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('click')
  toggleOpen(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
