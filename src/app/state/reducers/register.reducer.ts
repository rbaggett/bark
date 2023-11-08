import { createReducer, on } from '@ngrx/store';
import { passwordChange, passwordChangeSuccess } from '../actions/actions';

export const initialState = {
  register: {
    password: {
      number: false,
      special: false,
    },
  },
};

// a reducer is how we update the store
// - subscribe to actions and update accordingly
export const registerReducer = createReducer(
  initialState,
  on(passwordChange, (state) => state),
  on(passwordChangeSuccess, (state, data: any) => ({
    ...state,
    register: { ...data.payload },
  }))
);
