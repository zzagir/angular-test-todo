import {inject, Injectable} from "@angular/core";
import {ITask} from "./tasks.models";
import {Store} from "@ngrx/store";
import * as TasksActions from "./tasks.actions";

@Injectable({providedIn: "root"})
export class TasksFacade {
    private readonly store = inject(Store)

    init() {
        this.store.dispatch(TasksActions.getTasks());
    }

    addTask(data: ITask) {
        this.store.dispatch(TasksActions.addTask({data}));
    }

    editTask(data: ITask) {
        this.store.dispatch(TasksActions.editTask({data}));
    }
}