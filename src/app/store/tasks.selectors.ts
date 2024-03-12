import { createSelector } from '@ngrx/store'
import { IFeedState } from '../types/feed.interface'

export const feedFeatureSelector = (state: IFeedState) => state.feed

export const feedIsLoadingSelector = createSelector(
	feedFeatureSelector,
	(state) => state.isLoading,
)

export const feedDataSelector = createSelector(
	feedFeatureSelector,
	(state) => state.data,
)

export const feedErrorSelector = createSelector(
	feedFeatureSelector,
	(state) => state.error,
)
