import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskDialogComponent } from './edit-task-dialog.component';

describe('EditTaskDialogComponent', () => {
  let component: EditTaskDialogComponent;
  let fixture: ComponentFixture<EditTaskDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditTaskDialogComponent]
    });
    fixture = TestBed.createComponent(EditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});