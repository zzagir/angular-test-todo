import {Injectable} from '@angular/core';
import {ITask} from "../store/tasks.models";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasksKey = 'tasksData';

    pushOne(task: ITask) {
        const tasks = this.get()
        tasks.push(task)
    }

    post(tasks: ITask[]): void {
        localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }

    get(): ITask[] {
        const tasksJson = localStorage.getItem(this.tasksKey);
        if (tasksJson) {
            return JSON.parse(tasksJson);
        }
        return [];
    }

}
