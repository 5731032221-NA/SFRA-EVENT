// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// class Book {
//   constructor(public id,
//     public firstName,
//     public lastName,
//     public username
//   ) { }
// }


export abstract class SmartTableData {
  //abstract getData(): any[];
  // public books: FirebaseListObservable<Book[]>;
  // public checkin: AngularFireList<any>;
  // constructor(private db: AngularFireDatabase) {
  //   this.checkin = db.list('/book');
  //  }
  abstract getData(): any[];

  //  getData(){
  //    return this.checkin
  //  }




}
