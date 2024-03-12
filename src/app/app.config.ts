import {ApplicationConfig} from "@angular/core";
import {appRoutes} from "./app.routes";
import {provideRouter} from "@angular/router";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(appRoutes),
    provideStore(),
    provideEffects(),
    provideAnimations()
]
}