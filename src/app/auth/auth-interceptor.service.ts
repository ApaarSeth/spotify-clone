import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         
        // if (req.url.toString().includes("/login")) {
        //     var apiReq = req.clone({ url: `https://accounts.spotify.com/${req.url}` });
        //     console.log(apiReq)
        // }
        return next.handle(req);

    }


}