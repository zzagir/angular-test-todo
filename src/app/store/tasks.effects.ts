import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import * as TasksActions from './tasks.actions'
import {of, switchMap} from 'rxjs'
import {TasksService} from "../service/tasks.service";


export const getTasks = createEffect(
    () => {
        const apiService = inject(TasksService)
        const actions$ = inject(Actions)
        return actions$.pipe(
            ofType(TasksActions.getTasks),
            switchMap(() => {
                const tasks = apiService.get()
                if (tasks) {
                    return of(TasksActions.getTasksSuccess({data: tasks}));
                } else {
                    return of(TasksActions.getTasksFailure({error: "No data found in localStorage"}));
                }

            }),
        )
    },
    {functional: true},
)

export const addTask = createEffect(
    () => {
        const apiService = inject(TasksService)
        const actions$ = inject(Actions)
        return actions$.pipe(
            ofType(TasksActions.addTask),
            switchMap(({data}) => {
                    if (data) {
                        apiService.pushOne(data)
                        return of(TasksActions.addTaskSuccess({data: data}));
                    } else {
                        return of(TasksActions.addTaskFailure({error: "No data found in localStorage"}));
                    }
                }
            ),
        )
    },
    {functional: true},
)

