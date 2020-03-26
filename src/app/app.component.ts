import { Component, OnInit } from '@angular/core';
import { IsLoadingDirective, IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    
  title = 'MoneyMonitor';
  isLoading: Observable<boolean>

  constructor(private isLoadingService: IsLoadingService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = this.isLoadingService.isLoading$();

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          this.isLoadingService.add();
          return;
        }

        this.isLoadingService.remove();
      });

  }
}
