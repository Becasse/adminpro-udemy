import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor( 
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarHospitales());
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
  }

  borrarHospital( hospital: Hospital) {
    swal({
      title: '¿Está seguro que desea borrar el hospital?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if ( borrar ) {

        this._hospitalService.borrarHospital( hospital._id)
          .subscribe( borrado => {
            this.cargarHospitales();
          });
      }
    });  
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal( 'hospitales', id);
  }

  crearHospital() {
    swal('Introduzca el nombre del hospital:', {
      content: 'input',
    })
    .then((value) => {
      this._hospitalService.crearHospital( value )
        .subscribe( () => this.cargarHospitales() );
    });
  }
}
