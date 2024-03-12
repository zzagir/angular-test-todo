import {Action, createReducer, on} from '@ngrx/store'
import * as FeedActions from './tasks.actions'
import {IFeed} from './tasks.models'
import {IAuthError} from '../../../../auth/store/auth.models'

export const feedFeatureKey = 'feed'

export interface State {
    data: IFeed | null
    isLoading: boolean
    error: IAuthError | null
}

export const initialState: State = {
    data: null,
    isLoading: false,
    error: null,
}

const reducer = createReducer(
    initialState,
    on(FeedActions.getFeed, (state) => ({
        ...state,
        data: null,
        isLoading: true,
        error: null,
    })),
    on(FeedActions.getFeedSuccess, (state, {data}) => ({
        data: data,
        isLoading: false,
        error: null,
    })),
    on(FeedActions.getFeedFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error: error,
    })),
)

export function tasksReducer(state: State | undefined, action: Action) {
    return reducer(state, action)
}
