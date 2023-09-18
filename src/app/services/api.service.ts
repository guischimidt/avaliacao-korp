import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    url = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    savePerson(person: Person): Observable<Person> {
        return this.httpClient
            .post<Person>(`${this.url}user`, person, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    getPersons(): Observable<any> {
        return this.httpClient
            .get<any>(`${this.url}user`)
            .pipe(catchError(this.handleError));
    }

    saveAccount(values: any): Observable<any> {
        return this.httpClient
            .post<any>(
                `${this.url}account/${values.userId}`,
                values,
                this.httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    getAccounts(): Observable<any> {
        return this.httpClient
            .get<any>(`${this.url}account`)
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        errorMessage = error.error.error;
        return throwError(() => new Error(errorMessage));
    }
}
