import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  loginFlagSub = new BehaviorSubject(0);
  loginFlag = this.loginFlagSub.asObservable();

    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }
   mainUrl = 'http://localhost:3000/';
   constructor(private http : HttpClient){}

   postRegister(user:User): Observable<User> {
    return this.http.post<User>((this.mainUrl + 'loginDetails') , user, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
   }

   getUserDetails(){
      return this.http.get<User>(this.mainUrl + 'loginDetails');
   }

   getCardDetails() {
    return this.http.get<any>(this.mainUrl + 'products');
   }

   setLoginEvent(val:boolean) {
      if(val === true){
        this.loginFlagSub.next(1);
      }
      else {
        this.loginFlagSub.next(0);
      }
   }
   getLoginEvent() {
      return this.loginFlag;
   }

   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
