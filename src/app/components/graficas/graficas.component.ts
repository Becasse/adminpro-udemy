import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: []
})
export class GraficasComponent implements OnInit {

  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
