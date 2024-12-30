import { Component } from '@angular/core';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  isOpen = false;
}
