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
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TasksFacade} from "../../store/tasks.facade";
import {select, Store} from "@ngrx/store";
import {tasksDataSelector} from "../../store/tasks.selectors";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {TasksService} from "../../service/tasks.service";
import {EditTaskDialogComponent} from "../ui/edit-task-dialog/edit-task-dialog.component";
import {RouterLink} from "@angular/router";


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, CdkDropList, CdkDrag, MatButtonModule, MatDialogModule, MatNativeDateModule, RouterLink],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
    tasks$!: Observable<ITask[] | null>
    todo: ITask[] = [];
    atWork: ITask[] = [];
    done: ITask[] = [];
    private destroy$ = new Subject<void>()
    private readonly store = inject(Store)
    private readonly apiService = inject(TasksService)

    ngOnInit(): void {
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
}
