import {ApplicationConfig, isDevMode} from "@angular/core";
import {appRoutes} from "./app.routes";
import {provideRouter} from "@angular/router";
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideAnimations} from '@angular/platform-browser/animations';
import * as tasksEffects from "./store/tasks.effects";
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {tasksReducer} from "./store/tasks.reducer";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideStore(),
        provideState({name: 'tasks', reducer: tasksReducer}),
        provideEffects(tasksEffects),
        provideAnimations(),
        provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()})
    ]
}