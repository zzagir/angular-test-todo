import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import * as TasksActions from './tasks.actions'
import {delay, of, switchMap, tap} from 'rxjs'


export const getTasks = createEffect(
    () => {
        const actions$ = inject(Actions)
        return actions$.pipe(
            ofType(TasksActions.getTasks),
            switchMap(() => {
                const dataString = localStorage.getItem('tasksData');
                if (dataString) {
                    const data = JSON.parse(dataString);
                    return of(TasksActions.getTasksSuccess({data: data}));
                } else {
                    return of(TasksActions.getTasksFailure({
                        error: 'No data found in localStorage'
                    }));
                }
            }),
        )
    },
    {functional: true},
)
