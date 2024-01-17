import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentUrl: any = undefined;
  
  //Holds the last valid previous URL
	private latestPreviousUrl: string = '';
  constructor(
    private router: Router
  ) { 
    this.currentUrl = router.url;
		router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.setPreviousUrl(this.currentUrl);
				this.currentUrl = event.url;
			};
		});
  }

  setPreviousUrl(url: string|null, remove = false) {

		if (remove) {
			sessionStorage.removeItem('previousUrl');
			return;
		}
		if (url && url != this.latestPreviousUrl) {
				sessionStorage.setItem('previousUrl', url);
		}
	}

  getPreviousUrl() {
		return sessionStorage.getItem('previousUrl');
	}

  goBack(defaultUrl: any) {
		let backUrl:any = this.getPreviousUrl();
		if (backUrl && backUrl != '/' && this.currentUrl != backUrl)
			return this.router.navigate(backUrl);
		return this.router.navigate(defaultUrl);
	}
}
