import { ErrorHandler, Injectable, NgZone  } from '@angular/core';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: any): void {
   // console.log('Error custom');

   this.zone.run(() => {
     alert('Error custom')
   })
  }
}
