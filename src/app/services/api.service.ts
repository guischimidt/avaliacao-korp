import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Person } from '../models/person';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly url = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    getPersons(): Observable<any> {
        return this.httpClient
            .get<any>(`${this.url}user`)
            .pipe(catchError(this.handleError));
    }

    savePerson(person: Person): Observable<Person> {
        return this.httpClient
            .post<Person>(`${this.url}user`, person, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    updatePerson(userId: any, person: Person): Observable<Person> {
        return this.httpClient
            .put<Person>(`${this.url}user/${userId}`, person, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    deletePerson(userId: any): Observable<any> {
        return this.httpClient
            .delete<any>(`${this.url}user/${userId}`)
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

    saveTransaction(values: any): Observable<any> {
        return this.httpClient
            .post<any>(
                `${this.url}account/${values.accountId}/${values.transactionType}`,
                values,
                this.httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    getTransactions(accountId: any): Observable<any> {
        return this.httpClient
            .get<any>(`${this.url}account/${accountId}/transactions`)
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        errorMessage = error.error.error;
        return throwError(() => new Error(errorMessage));
    }
}
