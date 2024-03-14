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

export const addTask = createAction(
    '[Tasks/Put] Add Task', props<{ data: ITask }>()
)
export const addTaskSuccess = createAction(
    '[Tasks/Put] Add Task Success',
    props<{ data: ITask }>(),
)

export const addTaskFailure = createAction(
    '[Tasks/Put] Add Task Failure',
    props<{ error: any }>(),
)

export const editTask = createAction(
    '[Tasks/Put] Edit Task', props<{ data: ITask }>()
)