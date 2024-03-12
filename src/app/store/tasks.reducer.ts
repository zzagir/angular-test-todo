import {Action, createReducer, on} from '@ngrx/store'
import * as TasksActions from './tasks.actions'
import {ITask} from "./tasks.models";

export const tasksFeatureKey = 'tasks'

export interface State {
    data: ITask[] | null,
    isLoading: boolean,
    error: any
}

export const initialState: State = {
    data: null,
    isLoading: false,
    error: null
}

const reducer = createReducer(
    initialState,
    on(TasksActions.getTasks, (state) => ({
        data: null,
        isLoading: true,
        error: null
    })),
    on(TasksActions.getTasksSuccess, (state, {data}) => ({
        ...state,
        data: data,
        isLoading: false
    })),
    on(TasksActions.getTasksFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error: error
    })),
)

export function tasksReducer(state: State | undefined, action: Action) {
    return reducer(state, action)
}
