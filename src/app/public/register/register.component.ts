import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PasswordValidator } from '../register/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl(
      '',
      Validators.compose([PasswordValidator.validPassword(true)])
    ),
    passwordMinimumLength: new FormControl({ value: false, disabled: true }),
    passwordDigit: new FormControl({ value: false, disabled: true }),
    passwordSpecialCharacter: new FormControl({ value: false, disabled: true }),
  });
}
