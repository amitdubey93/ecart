import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../auth/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenStorageService.getToken();
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token,
      },
    });
    /* if (token != null) {  
      //alert('huha');
      authReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      }); */
    return next.handle(clonedRequest);
  }
}

export const HttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptorService,
    multi: true,
  },
];
