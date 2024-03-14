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
        ...state,
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
    on(TasksActions.addTask, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(TasksActions.addTaskSuccess, (state, {data}) => ({
        ...state,
        data: [...(state.data || []), data],
        isLoading: false
    })),
    on(TasksActions.addTaskFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error: error
    })),
)

export function tasksReducer(state: State | undefined, action: Action) {
    return reducer(state, action)
}
