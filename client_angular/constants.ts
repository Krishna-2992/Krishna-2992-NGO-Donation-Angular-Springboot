import { HttpHeaders } from "@angular/common/http";

export const credential = btoa('user:1eb3ea8d-5fec-4d91-993c-2515f1b1d513');
export const headers = new HttpHeaders()
    .set('Authorization', `Basic ${credential}`)
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', 'http://localhost:4200');