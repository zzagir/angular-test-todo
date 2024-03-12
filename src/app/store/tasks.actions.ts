import {createAction, props} from '@ngrx/store'
import {IFeed} from './tasks.models'
import {IAuthError} from '../../../../auth/store/auth.models'

export const getFeed = createAction(
    '[Feed/Get] Get Feed',
    props<{ url: string }>(),
)
export const getFeedSuccess = createAction(
    '[Feed/Get] Get Feed Success',
    props<{ data: IFeed }>(),
)

export const getFeedFailure = createAction(
    '[Feed/Get] Get Feed Failure',
    props<{ error: IAuthError }>(),
)
