import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// here we specify a slice
export const selectRegisterState = createFeatureSelector<AppState>('register');

// a selector returns a slice of the store
export const selectRegister = createSelector(
  selectRegisterState,
  (register) => register
);
