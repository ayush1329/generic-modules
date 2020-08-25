import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class NavigationService {

    constructor(private router: Router) {

    }

    public navigateByUrl(url :string) {
        this.router.navigateByUrl(url);
    }
    
    public navigateTo(url : string) {
        this.router.navigate([url]);
    }
}