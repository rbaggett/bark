import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CONSTANTS } from '../public-constants';
import { Subscription } from 'rxjs/internal/Subscription';

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

  public ngOnInit(): void {
    this.initializeForm();
    this.setBarListener();
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

  private setBars(password: string): void {
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
    if (CONSTANTS.SPECIAL_REGEX.test(password)) {
      this.passwordSpecialCharacter.setValue(true);
      score += 1;
    }

    // check for at least one digit
    if (CONSTANTS.DIGIT_REGEX.test(password)) {
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

  private setBarListener(): void {
    // listener for user input
    const subscription: Subscription = this.password?.valueChanges.subscribe(
      (controlValue: string) => this.setBars(controlValue)
    );
    this.subscriptions.push(subscription);
  }
}
