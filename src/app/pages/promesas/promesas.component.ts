import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    this.contarTres().then (
      () => console.log('Terminó!')
    )
    .catch ( error => console.log('Error en la promesa', error));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    let promesa = new Promise<boolean>( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        if (contador === 3) {
          /* reject(); -- Cuando no se cumple con la condición*/
          reject( false );
          /* resolve() -- Cuando todo sale bien*/
          clearInterval(intervalo);
        }
      }, 1000);
    });
    return promesa;    
  }
}
