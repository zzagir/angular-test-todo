import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
    CdkDrag,
    CdkDropList,
} from '@angular/cdk/drag-drop';
import {ITask} from "../../store/tasks.models";
import {tasks} from "../../data";


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, CdkDropList, CdkDrag],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    tasks: ITask[] = tasks
    todo: ITask[] = tasks.filter(task => task.status === "На распределении")
    done: ITask[] = tasks.filter(task => task.status === "Готово")


    drop(event: CdkDragDrop<ITask[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const item = event.previousContainer.data[event.previousIndex];
            switch (event.container.id) {
                case "doneList": {
                    item.status = 'Готово'
                    break
                }
                case "todoList": {
                    item.status = 'На распределении'
                    break
                }
            }
            console.log("Todo list: ", this.todo)
            console.log("Done list: ", this.done)
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    itemTrackBy(index: number, item: ITask) {
        return item.id
    }

    ngOnInit(): void {
        console.log(tasks)
        console.log(this.todo)
        console.log(this.done)
    }
}
