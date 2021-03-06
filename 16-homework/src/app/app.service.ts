import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class MyHttpService {
  constructor(public http : Http) {

  }
  getMyData(url : string) : Observable<Response> {
    return this.http.get(url);
  }
}
