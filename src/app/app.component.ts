import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {PopupScreenComponent} from "./components/popup-screen/popup-screen.component";
import {MenuComponent} from "./components/menu/menu.component";
import {PopupService} from "./services/popup.service";
import {MenuService} from "./services/menu.service";
import {NotifierComponent} from "./components/notifier/notifier.component";
import {NotifierService} from "./services/notifier.service";
import {BottomNotifierComponent} from "./components/bottom-notifier/bottom-notifier.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupScreenComponent, MenuComponent, NotifierComponent, BottomNotifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'DisaggregatePowerWebApp';

  constructor(private router: Router, private popupService: PopupService, private menuService: MenuService, private notifierService: NotifierService) {
  }

  goToSettings() {
    this.router.navigate(["/popup/settings"])
    this.popupService.setHide(false);
  }

  openMenu() {
    this.menuService.openMenu();
  }

  isOpen() {
    return this.menuService.isOpen();
  }

  ngOnInit() {
    this.popupService.setHide(true);
    this.notifierService.loadListener();
    this.notifierService.loadListenerBottom();
  }
}
