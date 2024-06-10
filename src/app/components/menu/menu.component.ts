import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router, private menuService: MenuService) {

  }

  navigate(url: string) {
    this.router.navigate([url])
    this.menuService.closeMenu();
  }

  close() {
    this.menuService.closeMenu();
  }
}
