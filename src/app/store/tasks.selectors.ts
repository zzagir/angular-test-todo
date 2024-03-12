import {createSelector} from '@ngrx/store'
import {State} from './tasks.reducer'

export interface ITasksState {
    tasks: State
}


export const tasksFeatureSelector = (state: ITasksState) => state.tasks

export const tasksIsLoadingSelector = createSelector(
    tasksFeatureSelector,
    (state) => state.isLoading,
)

export const tasksDataSelector = createSelector(
    tasksFeatureSelector,
    (state) => state.data,
)

export const tasksErrorSelector = createSelector(
    tasksFeatureSelector,
    (state) => state.error,
)
