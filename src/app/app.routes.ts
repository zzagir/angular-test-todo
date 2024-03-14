import {Route} from "@angular/router";

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import("./components/tasks/tasks.component").then(c => c.TasksComponent)
    },
    {
        path: "task/:id",
        loadComponent: () => import("./components/task/task.component").then(c => c.TaskComponent)
    },
    {
        path: '**',
        redirectTo: '',
    }
];
