import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type PasswordStatus = bark.models.PasswordStatus;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://some.api.bark.com';

  constructor(private http: HttpClient) {}

  passwordChanged(password: string): Observable<PasswordStatus> {
    // we are going to cheat for now, modify the boolean values for different outcomes
    return of<PasswordStatus>({
      number: true,
      special: true,
    });

    // - something like this perhaps....
    // let httpParams = new HttpParams({ fromString: password });
    // return this.http.get<PasswordChangedResponse>(
    //   `${this.apiUrl}?${httpParams}`
    // );
  }
}
