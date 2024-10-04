import { HttpClient } from "@angular/common/http";
import { Book } from "../Models/book";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class BookService{
    baseUrl = "https://localhost:7291/api/Library";
    constructor(private http:HttpClient){}

    //GetAllBooks
    getAllBooks():Observable<Book[]>{
        return this.http.get<Book[]>(this.baseUrl);
    }
}