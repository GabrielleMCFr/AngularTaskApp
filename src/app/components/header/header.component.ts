import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title : string = 'Task Tracker';
  showAddTask: boolean = false;
  // we use this because we want not only to catch the change so we can change the button but also toggle the add task component
  subscription: Subscription = new Subscription; 

  // we pass services as providers in the constructor
  constructor(private uiService: UiService, private router: Router) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    // return if the url is not on the index page to erase the add button if we're not on index page.
    return this.router.url === route
  }
}
