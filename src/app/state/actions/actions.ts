import { createAction, props } from '@ngrx/store';
import { PasswordStatus } from 'src/app/public/services/api.service';

// to avoid hard-coded strings when re-using
export const PasswordChange: string = '[Password Strength Component] Change';
export const PasswordChangeSuccess: string =
  '[Password Strength Component] Change Success';
export const PasswordChangeFailure: string =
  '[Password Strength Component] Change Failure';

// actions are how we invoke flow in the redux pattern
// - kick off an action w/or/w/o props

export const passwordChange = createAction(
  PasswordChange,
  props<{ password: string }>()
);

export const passwordChangeSuccess = createAction(
  PasswordChangeSuccess,
  props<{ response: PasswordStatus }>()
);

export const passwordChangeFailure = createAction(
  PasswordChangeFailure,
  props<{ error: any }>()
);
