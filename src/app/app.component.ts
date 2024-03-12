import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/layout/header/header.component";
import {of} from "rxjs";
import * as TasksActions from "./store/tasks.actions";
import {Store} from "@ngrx/store";
import {getTasks} from "./store/tasks.actions";

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
export class AppComponent implements OnInit {
    private readonly store = inject(Store)

    ngOnInit(): void {
        this.store.dispatch(getTasks())
    }
}
