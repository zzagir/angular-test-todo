import {Route} from "@angular/router";

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import("./components/tasks/tasks.component").then(c => c.TasksComponent)
    }
];
