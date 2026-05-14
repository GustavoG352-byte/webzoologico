import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimalService } from '../../services/animal-service.service';

@Component({
  selector: 'app-animal-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css'
})
export class AnimalComponent implements OnInit {
  animalList: any[] = [];
  currentAnimal: any = { nombre: '', edad: null, tipo: 'Mamífero' };
  isEditing = false;

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
        this.cdr.detectChanges(); // Forzamos la detección de cambios
      },
      error: (err) => {
        console.error('Error al llamar a la API:', err);
      }
    });
  }

  saveAnimal() {
    if (this.isEditing) {
      this.animalService.updateAnimal(this.currentAnimal._id, this.currentAnimal).subscribe({
        next: () => {
          this.getAllAnimals();
          this.resetForm();
        }
      });
    } else {
      this.animalService.createAnimal(this.currentAnimal).subscribe({
        next: () => {
          this.getAllAnimals();
          this.resetForm();
        }
      });
    }
  }

  editAnimal(animal: any) {
    this.currentAnimal = { ...animal };
    this.isEditing = true;
  }

  deleteAnimal(id: string) {
    if (confirm('¿Estás seguro de eliminar este animal?')) {
      this.animalService.deleteAnimal(id).subscribe({
        next: () => this.getAllAnimals()
      });
    }
  }

  resetForm() {
    this.currentAnimal = { nombre: '', edad: null, tipo: 'Mamífero' };
    this.isEditing = false;
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