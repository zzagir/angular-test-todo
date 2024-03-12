import {Component, inject, OnInit} from '@angular/core';
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
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "../ui/add-task-dialog/add-task-dialog.component";
import {MatNativeDateModule} from "@angular/material/core";


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, CdkDropList, CdkDrag, MatButtonModule, MatDialogModule, MatNativeDateModule],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    tasks: ITask[] = tasks
    todo: ITask[] = tasks.filter(task => task.status === "На распределении")
    atWork: ITask[] = tasks.filter(task => task.status === "В работе")
    done: ITask[] = tasks.filter(task => task.status === "Готово")
    private readonly dialog = inject(MatDialog)


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
                case "atWorkList": {
                    item.status = 'В работе'
                    break
                }
                case "todoList": {
                    item.status = 'На распределении'
                    break
                }
            }
            console.log("Todo list: ", this.todo)
            console.log("At work list: ", this.atWork)
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

    openAddTaskDialog(): void {
        const dialogRef = this.dialog.open(AddTaskDialogComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        })
    }
}
