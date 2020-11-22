import { Component,Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {


  data = [{
    faceId: 1,
    firstName: 'Mark',
    lastName: '08:05',
    username: '17.00',
  }, {
    id: 2,
    firstName: 'Jacob',
    lastName: '08:05',
    username: '17.00',
  }, {
    faceid: 3,
    firstName: 'Larry',
    lastName: '08:07',
    username: '17.00',
  }, {
    faceId: 4,
    name: 'John',
    checkin: '08:14',
    checkout: '17.00',
  }, {
    faceId: 5,
    firstName: 'Jack',
    lastName: '08:16',
    username: '17.00',
  }, {
    faceId: 6,
    firstName: 'Ann',
    lastName: '08:32',
    username: '17.00',
  }, {
    id: 7,
    firstName: 'Barbara',
    lastName: '09:05',
    username: '17.00',
  }, {
    id: 8,
    firstName: 'Sevan',
    lastName: '10.11',
    username: '17.00',
  }, {
    id: 9,
    firstName: 'Ruben',
    lastName: '10.11',
    username: '17.00',
  }, {
    id: 10,
    firstName: 'Karen',
    lastName: '10.12',
    username: '17.00',

  }];

 


  getData() {
    return this.data;
  }
}
