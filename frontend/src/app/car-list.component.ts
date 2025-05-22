import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <ul *ngIf="cars.length">
      <li *ngFor="let car of cars">
        <strong>{{ car.modelo }}</strong> - {{ car.marca }} - {{ car.ano }} - {{ car.placa }}
      </li>
    </ul>
  `,
})
export class CarListComponent implements OnInit {
  cars: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://car-app:3000/car').subscribe((data) => {
      this.cars = data;
    });
  }
}
