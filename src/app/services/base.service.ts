import {Injectable} from '@angular/core';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AppError} from '../models/error.model';

@Injectable()
export abstract class BaseService {
  constructor() {

  }

  protected getApiUrl(path: string): string {
    return `https://falcon.amalyze.com/0.2.2/${path}`;
  }

  protected handleHttpError<T>(fallbackData?: any): any {
    return (error: any): Observable<T> => {

      console.log('Error is follow ', error);

      if (fallbackData) {
        return new Observable<T>(observer => {
          observer.error(error);
          console.log('fallback data given', fallbackData);
          observer.next(fallbackData);
          observer.complete();
        });
      } else {
        return this.throwFriendlyError(error);
      }
    };
  }

  protected throwFriendlyError(error): any {
    console.log('No fallback data');

    const friendlyError = new AppError();
    friendlyError.error = error;

    if (error instanceof HttpErrorResponse) {

      console.log('This is HttpError ');
      friendlyError.httpStatus = error.status;

      // common errors processing

      if (error.status === 0) {
        friendlyError.message = 'It seems like the server is down. Please, try again later ';

      } else {

        if (error.error) {
          const container = error.error;

          if (container.message) {
            friendlyError.message = container.message;
          }

          // 401: invalid access token: throw this error

          // fieldErrors processing
          if (error.status === 422) {
            if (container.details && container.details.messages) {
              friendlyError.formErrors = container.details.messages;
            }
          }
        }
      }

      console.log(friendlyError);
    } else if (error instanceof TimeoutError) {
      friendlyError.httpStatus = 504;
      friendlyError.message = 'Timeout error occurred ';

    } else {
      friendlyError.httpStatus = 0;
      friendlyError.message = error.message;
    }

    console.log('throw ');
    return throwError(friendlyError);
  }
}
