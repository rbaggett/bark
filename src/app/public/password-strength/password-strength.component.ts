import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';

import { CONSTANTS } from '../public-constants';
import { passwordChange } from '../../state/actions/actions';
import { AppState } from 'src/app/state/app.state';
import { selectRegister } from 'src/app/state/selectors/selectors';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnInit {
  @Input() public form: FormGroup = new FormGroup({});

  private subscriptions: Subscription[] = [];

  private statuses = [
    { message: CONSTANTS.STATUS_WEAK, color: CONSTANTS.STATUS_COLOR_0 },
    { message: CONSTANTS.STATUS_OKAY, color: CONSTANTS.STATUS_COLOR_1 },
    { message: CONSTANTS.STATUS_GOOD, color: CONSTANTS.STATUS_COLOR_2 },
    { message: CONSTANTS.STATUS_BEST, color: CONSTANTS.STATUS_COLOR_3 },
  ];

  bar0!: string;
  bar1!: string;
  bar2!: string;
  bar3!: string;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.setPasswordListener();
    this.setStateListener();
  }

  private get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  private get passwordMinimumLength(): AbstractControl {
    return this.form.get('passwordMinimumLength') as AbstractControl;
  }

  private get passwordDigit(): AbstractControl {
    return this.form.get('passwordDigit') as AbstractControl;
  }

  private get passwordSpecialCharacter(): AbstractControl {
    return this.form.get('passwordSpecialCharacter') as AbstractControl;
  }

  private initializeForm(): void {
    // set bars to default status
    for (let i = 0; i <= 3; i++) {
      (this as any)[`bar${i}`] = CONSTANTS.STATUS_COLOR_D;
    }
    // set checkboxes to default status
    this.passwordMinimumLength?.setValue(false);
    this.passwordSpecialCharacter?.setValue(false);
    this.passwordDigit?.setValue(false);
  }

  private setStatus(register: any): void {
    const password = this.password.value;
    let score = 0;

    // set to initial state
    this.initializeForm();

    if (!password) {
      return;
    }

    // check minimum length
    if (password.length >= 8) {
      this.passwordMinimumLength.setValue(true);
      score += 1;
    }

    // check for at least one special character
    if (register.special) {
      this.passwordSpecialCharacter.setValue(true);
      score += 1;
    }

    // check for at least one digit
    if (register.number) {
      this.passwordDigit.setValue(true);
      score += 1;
    }

    // get the appropriate status
    let status = this.statuses[score];

    // set bars to reflect status
    for (let i = 0; i <= score; i++) {
      (this as any)[`bar${i}`] = status.color;
    }
  }

  private setPasswordListener(): void {
    // listener for user password input
    const subscription: Subscription = this.password?.valueChanges.subscribe(
      (password: string) => this.store.dispatch(passwordChange({ password }))
    );
    this.subscriptions.push(subscription);
  }

  private setStateListener() {
    // listener for state changes to the register slice
    const subscription: Subscription = this.store
      .select(selectRegister)
      .subscribe(({ register }) => {
        if (register) {
          this.setStatus(register);
        }
      });
    this.subscriptions.push(subscription);
  }
}
