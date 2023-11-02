import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CONSTANTS } from '../public-constants';

export class PasswordValidator {
  static validPassword(isRequired: boolean = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return isRequired ? { invalidPassword: `Password is required.` } : null;
      }
      if (control.value.length < 8) {
        return { invalidPassword: `Password must be at least 8 characters.` };
      }
      if (!CONSTANTS.SPECIAL_REGEX.test(control.value)) {
        return {
          invalidPassword: `Password requires at least one special character.`,
        };
      }
      if (!CONSTANTS.DIGIT_REGEX.test(control.value)) {
        return {
          invalidPassword: `Password requires at least one numeric character.`,
        };
      }

      return null;
    };
  }
}
