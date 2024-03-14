import {Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AddTaskDialogComponent} from "../../ui/add-task-dialog/add-task-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {TasksFacade} from "../../../store/tasks.facade";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatDialogModule, MatNativeDateModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    private readonly dialog = inject(MatDialog)
    private readonly destroyRef = inject(DestroyRef);
    private readonly tasksFacade = inject(TasksFacade)

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
