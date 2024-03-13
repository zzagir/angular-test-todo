import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
    CdkDrag,
    CdkDropList,
} from '@angular/cdk/drag-drop';
import {ITask} from "../../store/tasks.models";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "../ui/add-task-dialog/add-task-dialog.component";
import {MatNativeDateModule} from "@angular/material/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TasksFacade} from "../../store/tasks.facade";
import {select, Store} from "@ngrx/store";
import {tasksDataSelector} from "../../store/tasks.selectors";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {TasksService} from "../../service/tasks.service";


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, CdkDropList, CdkDrag, MatButtonModule, MatDialogModule, MatNativeDateModule],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
    tasks$!: Observable<ITask[] | null>
    todo: ITask[] = [];
    atWork: ITask[] = [];
    done: ITask[] = [];
    private destroy$ = new Subject<void>()
    private task!: ITask
    private readonly store = inject(Store)
    private readonly tasksFacade = inject(TasksFacade)
    private readonly destroyRef = inject(DestroyRef);
    private readonly dialog = inject(MatDialog)
    private readonly apiService = inject(TasksService)

    ngOnInit(): void {
        this.tasksFacade.init()
        this.tasks$ = this.store.pipe(select(tasksDataSelector))
        this.initializeValues()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initializeValues() {
        this.tasks$
            .pipe(
                takeUntil(this.destroy$),
                map(tasks => tasks || []) // Защита от null
            )
            .subscribe(tasks => {
                this.todo = tasks.filter(task => task.status === "На распределении");
                this.atWork = tasks.filter(task => task.status === "В работе");
                this.done = tasks.filter(task => task.status === "Готово");
            });
    }

    drop(event: CdkDragDrop<ITask[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const item = event.previousContainer.data[event.previousIndex];
            switch (event.container.id) {
                case "doneList": {
                    this.apiService.changeStatus(item.id, 'Готово')
                    break
                }
                case "atWorkList": {
                    this.apiService.changeStatus(item.id, 'В работе')
                    break
                }
                case "todoList": {
                    this.apiService.changeStatus(item.id, 'На распределении')
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

    openAddTaskDialog(): void {
        const dialogRef = this.dialog.open(AddTaskDialogComponent, {
            width: '250px'
        });
        dialogRef.afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(result => {
                if (result) {
                    const newTaskData = {
                        id: Number(new Date()),
                        title: result.title,
                        description: result.description,
                        deadline: result.deadline,
                        priority: result.priority,
                        status: result.status,
                        performers: result.performers
                    };
                    this.tasksFacade.addTask(newTaskData)
                }
                console.log('The dialog was closed', result);
            })
    }
}
