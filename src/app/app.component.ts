import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/layout/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    HeaderComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-task-tracker';
}
