import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal-service.service';

@Component({
  selector: 'app-animal-component',
  imports: [CommonModule],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css'
})
export class AnimalComponent implements OnInit {
  animalList: any[] = [];

  constructor(
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllAnimals();
  }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe({
      next: (data) => {
        this.animalList = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al llamar a la API:', err);
      }
    });
  }

  get tiposDistintos(): number {
    return new Set(this.animalList.map(a => a.tipo)).size;
  }

  get edadPromedio(): number {
    if (!this.animalList.length) return 0;
    const suma = this.animalList.reduce((acc, a) => acc + (a.edad || 0), 0);
    return Math.round(suma / this.animalList.length);
  }

  getTipoClass(tipo: string): string {
    const map: Record<string, string> = {
      'Mamífero': 'tipo-mamifero',
      'Reptil':   'tipo-reptil',
      'Ave':      'tipo-ave',
      'Anfibio':  'tipo-anfibio',
    };
    return map[tipo] ?? 'tipo-default';
  }
}