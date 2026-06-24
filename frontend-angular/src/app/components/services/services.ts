import { UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { ServicesData } from '../../services/services-data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  imports: [UpperCasePipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements AfterViewInit {
  private dataSvc = inject(ServicesData);

  categories = [
    'Manos y Pies',
    'Depilación Facial y Corporal',
    'Tratamientos Faciales',
    'Tratamientos Corporales',
    'Lifting de Pestañas',
    'Tratamientos INDIBA',
  ];

  activeCategory = 'Manos y Pies';

  // Todas las categorias de un servicio en concreto
  get filteredServices() {
    return this.dataSvc.services.filter((s) => s.category === this.activeCategory);
  }

  // Cambio de categoria
  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  ngAfterViewInit() {
    gsap.from('.service-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.service-card',
        start: 'top 80%',
      },
    });
  }
}
