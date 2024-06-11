import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PopupService} from "../../services/popup.service";
import {routes} from "../../app.routes";
import {DynamicHostDirective} from "../../directives/dynamic-host.directive";

@Component({
  selector: 'app-popup-screen',
  standalone: true,
  imports: [DynamicHostDirective],
  templateUrl: './popup-screen.component.html',
  styleUrl: './popup-screen.component.css'
})
export class PopupScreenComponent implements OnInit {
  @ViewChild(DynamicHostDirective, { static: true })
  dynamicHost!: DynamicHostDirective;

  constructor(
    private popupService: PopupService,
    private router: Router
  ) { }

  close() {
    this.setHide(true);

    this.router.navigate(["/"]);
  }

  setHide(hide: boolean) {
    this.popupService.setHide(hide);
  }

  getHide(): boolean {
    return this.popupService.getHide();
  }

  ngOnInit() {
    if (window.location.href.includes("popup")) {
      this.setHide(false);
    } else {
      this.setHide(true);
    }
    this.loadComponent();
  }

  loadComponent() {
    const component = this.getComponent();
    if (component) {
      this.dynamicHost.viewContainerRef.clear();
      this.dynamicHost.viewContainerRef.createComponent(component);
    }
  }

  getComponent() {
    const urlWithoutPopup = window.location.pathname.replace("/popup", "");
    // Get the component by the url
    const route = routes.find(r => r.path === urlWithoutPopup.replace("/", ""));
    if (route) {
      return route.component;
    } else {
      return null;
    }
  }
}
