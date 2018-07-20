import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard!');

    let token = this._usuarioService.token;
    // atob() => Descodifica algo codificado en Base64
    let payload = JSON.parse( atob( token.split('.')[1] ));
    let expirado = this.expirado( payload.exp );
    
    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva( payload.exp );
  }

  // Verificamos si ya expiro el token
  expirado ( fechaExp: number ) {
    let ahora = new Date().getTime() / 1000;
    
    if ( fechaExp < ahora ) {
      // Si se ha expirado
      return true;
    } else {
      return false;
    }
  }

  // Verificamos si hay que renovar el token. TODAVIA NO HA EXPIRADO!!!
  verificaRenueva( fechaExp: number ): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date( fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000)); // Ampliamos 1 hora al token

      if ( tokenExp.getTime() < ahora.getTime() ) {
        resolve( true );
      } else {
        // El Token esta proximo a expirar
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve( true );
          }, () => {
            this.router.navigate(['/login']);
            reject( false );
          });
      }
      resolve( true );
    });
  }
}
