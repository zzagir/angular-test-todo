import {createAction, props} from '@ngrx/store'
import {ITask} from "./tasks.models";

export const getTasks = createAction(
    '[Tasks/Get] Get Tasks'
)
export const getTasksSuccess = createAction(
    '[Tasks/Get] Get Tasks Success',
    props<{ data: ITask[] }>(),
)

export const getTasksFailure = createAction(
    '[Tasks/Get] Get Tasks Failure',
    props<{ error: any }>(),
)
