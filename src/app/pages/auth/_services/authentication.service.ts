import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
// import { environment } from '@environments/environment';
import { User } from    '../_models';
import { ok } from 'assert';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // private currentUserSubject: BehaviorSubject<User>;
    public currentUser: any;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    public get currentUserValue(): any {
        console.log('hey',localStorage.getItem('currentUser'));
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string) {
        let authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', '{"username": "'+username+'",'+'"authdata": "'+authdata+'"}');
        const a = {username:username};
        // this.currentUserSubject.next(a);
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        //         user.authdata = window.btoa(username + ':' + password);
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //         return user;
        //     }));
        
            

        
            
            // let  pass = Md5.hashStr(password)
            
            // // console.log(this.Obj);
      
            // return this.http.get<any>('http://20.188.110.129:3000/getlogin/'+username+'/'+pass).subscribe((res) => {
            //     if(res.result == true){
            //         localStorage.setItem('currentUser', '{username: username}');
            //         return ok({username: username, error: ''})
            //     }else{
            //         return {error: 'Username or password is incorrect'}
            //     }
            // })
      
         
      
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // this.currentUserSubject.next(null);
    }
}