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
        localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }

    changeStatus(id: number, newStatus: "На распределении" | "В работе" | "Готово") {
        const tasksJson = localStorage.getItem(this.tasksKey);
        if (tasksJson) {
            let tasks: ITask[] = JSON.parse(tasksJson);
            const index = tasks.findIndex(task => task.id === id);

            if (index !== -1) {
                tasks[index].status = newStatus;
                localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
            }
        }
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
