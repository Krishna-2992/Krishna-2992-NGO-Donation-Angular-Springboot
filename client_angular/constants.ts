import { HttpHeaders } from "@angular/common/http";

const username = 'user';
    const password = '8roifwh98sHHUif8s9sjhfa98';
    const authHeader = 'Basic ' + btoa(username + ':' + password);

export const credential = btoa('user:1eb3ea8d-5fec-4d91-993c-2515f1b1d513');
export const headers = new HttpHeaders()
        .set('Authorization', authHeader)
        .set('Content-Type', 'application/json')