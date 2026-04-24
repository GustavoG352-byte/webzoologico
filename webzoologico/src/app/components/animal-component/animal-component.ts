import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnimalService } from '../../services/animal-service.service';

@Component({
  selector: 'app-animal-component',
  imports: [CommonModule, DatePipe],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css'
})
export class AnimalComponent implements OnInit {
  animalList: any = [];

  constructor(
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef
  ) {}

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe({
      next: (data) => {
        console.log('Datos de la API:', data);
        this.animalList = data;
        this.cdr.markForCheck(); // Fuerza la actualización de la vista
      },
      error: (err) => {
        console.error('Error al llamar a la API:', err);
      }
    });
  }

  ngOnInit() {
    this.getAllAnimals();
  }
}
