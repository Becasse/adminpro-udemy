import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 

    this.subscription = this.regresaObservable().pipe( 
      /* retry(2)  Reintentos. La primera vez no la cuenta  */
    )
    .subscribe ( 
      /* Cuando se llama a un next */
      numero => console.log('Subs:', numero),
      /* Cuando hay un error */
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {  
      let contador = 0;    
      let intervalo = setInterval(() => {
        contador += 1;
        observer.next( contador );

/*         if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */

/*      if (contador === 2) {
         /*  clearInterval(intervalo);
          observer.error('Error ocurrido!');
        } */

      }, 1000);
    }).pipe(
      map( resp => resp),
      filter( (valor, index) => {
        
        if ( (valor % 2 === 1)) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    )
    ;
  }
}
