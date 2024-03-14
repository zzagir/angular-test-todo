import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {TasksService} from "../../service/tasks.service";
import {ITask} from "../../store/tasks.models";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {tasks} from "../../data";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../ui/edit-task-dialog/edit-task-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TasksFacade} from "../../store/tasks.facade";

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule, MatLegacyChipsModule, MatButtonModule],
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
    id!: number;
    task!: ITask | undefined
    private route = inject(ActivatedRoute);
    private unsubscribe$ = new Subject<void>();
    private apiService = inject(TasksService)
    private readonly tasksFacade = inject(TasksFacade)
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialog = inject(MatDialog)

    ngOnInit(): void {
        this.route.paramMap.pipe(
            takeUntil(this.unsubscribe$) // Автоматическая отписка при уничтожении компонента
        ).subscribe(params => {
            this.id = Number(params.get('id'));
        });

        this.task = this.apiService.getById(this.id)
        console.log(this.task)
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(); // Отправляем сигнал для отписки
        this.unsubscribe$.complete(); // Закрываем Subject
    }

    openEditDialog(task: ITask): void {
        const dialogRef: MatDialogRef<EditTaskDialogComponent> = this.dialog.open(EditTaskDialogComponent, {
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                status: task.status,
                performers: task.performers
            },
            width: '250px'
        });

        dialogRef.afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(result => {
                if (result) {
                    const newTaskData: ITask = {
                        id: task.id,
                        title: result.title,
                        description: result.description,
                        deadline: result.deadline,
                        priority: result.priority,
                        status: result.status,
                        performers: result.performers
                    };
                    console.log(newTaskData)
                    this.apiService.editTask(newTaskData);
                    this.task = this.apiService.getById(this.id)
                }
            });

    }
}