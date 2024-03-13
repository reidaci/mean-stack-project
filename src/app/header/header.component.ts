import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userisAuthenticated = false
  private authListenerSubs: Subscription
  constructor(private authService: AuthService) {

  }
  ngOnInit() {
    this.userisAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userisAuthenticated = isAuthenticated
    })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {

  }


}
