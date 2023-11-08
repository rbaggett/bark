import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/public/services/api.service';
import * as actions from '../actions/actions';

@Injectable()
export class AppEffects {
  passwordChanged$ = createEffect(() =>
    this.actions$.pipe(
      // wire this effect up to this particular action
      ofType(actions.passwordChange),
      switchMap((action) =>
        this.apiService.passwordChanged(action.password).pipe(
          // successful response
          map((response) => {
            // debugger;
            return {
              type: actions.PasswordChangeSuccess,
              payload: response,
            };
          }),
          // erroneous response
          catchError((error) => {
            // debugger;
            return of({
              type: actions.PasswordChangeFailure,
              error,
            });
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
