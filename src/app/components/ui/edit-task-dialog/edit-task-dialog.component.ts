import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ITask} from "../../../store/tasks.models";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
    selector: 'app-edit-task-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatChipsModule, MatDatepickerModule, MatIconModule, MatOptionModule, MatSelectModule],
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {
    public readonly taskForm: FormGroup;
    public readonly dialogRef = inject(MatDialogRef<EditTaskDialogComponent>);
    public data: ITask = inject(MAT_DIALOG_DATA);
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    addOnBlur = true;
    private formBuilder = inject(FormBuilder);

    constructor() {
        this.taskForm = this.formBuilder.group({
            title: [this.data.title, Validators.required],
            description: [this.data.description, Validators.required],
            deadline: [this.data.deadline, Validators.required],
            priority: [this.data.priority, Validators.required],
            status: [this.data.status, Validators.required],
            performers: [this.data.performers]
        });
    }

    save(): void {
        if (this.taskForm.valid) {
            const editData = {
                title: this.taskForm.value.title,
                description: this.taskForm.value.description,
                deadline: this.taskForm.value.deadline,
                priority: this.taskForm.value.priority,
                status: this.taskForm.value.status,
                performers: this.taskForm.value.performers
            };
            this.dialogRef.close(editData);
        }
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = (event.value || '').trim();

        if (value) {
            // Создаем новый массив, включая все предыдущие значения и добавляем новое
            const newPerformers = [...this.taskForm.value.performers, value];
            // Обновляем значение в форме
            this.taskForm.patchValue({performers: newPerformers});
        }

        // Очищаем поле ввода
        if (input) {
            input.value = '';
        }
    }

    remove(performer: string): void {
        const performers = this.taskForm.value.performers;
        const newPerformers = performers.filter((p: string) => p !== performer);

        this.taskForm.patchValue({performers: newPerformers});
    }

    edit(performer: string, event: MatChipEditedEvent): void {
        const value = event.value.trim();
        const performers = this.taskForm.value.performers;

        if (!value) {
            this.remove(performer);
            return;
        }

        const index = performers.indexOf(performer);
        if (index >= 0) {
            // Создаем копию массива и заменяем значение
            const newPerformers = [...performers];
            newPerformers[index] = value;
            this.taskForm.patchValue({performers: newPerformers});
        }
    }
}
