// import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { take } from "rxjs/operators";

// import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthInterceptorService implements HttpInterceptor {

//   constructor(
//     private authService: AuthService
//   ) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ) {
//     return this.authService.user.pipe(
//       take(1),

//     )
//   }
// }