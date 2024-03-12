import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import {ApiService} from '../../../service/auth.service'
import * as FeedActions from './tasks.actions'
import {catchError, map, of, switchMap} from 'rxjs'

import {HttpErrorResponse, HttpParams} from '@angular/common/http'
import {IFeed} from './tasks.models'

export const getFeed = createEffect(
    () => {
        const apiService = inject(ApiService)
        const actions$ = inject(Actions)
        return actions$.pipe(
            ofType(FeedActions.getFeed),
            switchMap(({url}) => {
                return apiService.get<IFeed>(url).pipe(
                    map((feed) => {
                        return FeedActions.getFeedSuccess({data: feed})
                    }),
                    catchError((error) => {
                        console.error('Error', error)
                        return of(
                            FeedActions.getFeedFailure({error: error.errors.message}),
                        )
                    }),
                )
            }),
        )
    },
    {functional: true},
)
