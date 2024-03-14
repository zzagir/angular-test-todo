import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
    selector: 'app-add-task-dialog',
    standalone: true,
    imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatDatepickerModule, MatSelectModule, MatChipsModule, MatIconModule, MatButtonModule],
    templateUrl: './add-task-dialog.component.html',
    styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {
    taskForm!: FormGroup;
    performers: string[] = [];
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    announcer = inject(LiveAnnouncer);
    addOnBlur = true;
    public dialogRef = inject(MatDialogRef<AddTaskDialogComponent>);
    private readonly fb = inject(FormBuilder)

    ngOnInit(): void {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            deadline: [null, Validators.required],
            priority: ['', Validators.required],
            status: ['', Validators.required],
            performers: [this.performers]
        });
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.performers.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(performer: string): void {
        const index = this.performers.indexOf(performer);

        if (index >= 0) {
            this.performers.splice(index, 1);

            this.announcer.announce(`Removed ${performer}`)
        }
    }

    edit(performer: string, event: MatChipEditedEvent) {
        const value = event.value.trim();

        // Remove fruit if it no longer has a name
        if (!value) {
            this.remove(performer);
            return;
        }

        // Edit existing fruit
        const index = this.performers.indexOf(performer);
        if (index >= 0) {
            this.performers[index] = value;
        }
    }


    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {
        if (this.taskForm.valid) {
            const formData = {
                title: this.taskForm.value.title,
                description: this.taskForm.value.description,
                deadline: this.taskForm.value.deadline,
                priority: this.taskForm.value.priority,
                status: this.taskForm.value.status,
                performers: this.taskForm.value.performers
            };
            this.dialogRef.close(formData);
        }
    }
}
