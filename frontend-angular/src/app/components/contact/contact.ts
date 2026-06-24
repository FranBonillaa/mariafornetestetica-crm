import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesData } from '../../services/services-data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements AfterViewInit {
  private dataSvc = inject(ServicesData);
  services = this.dataSvc.services;

  nombre = '';
  contacto = '';
  servicio = '';
  mensaje = '';

  enviarWhatsApp() {
    const texto = `Hola, soy ${this.nombre}. Me interesa: ${this.servicio}. Para contactarme: ${this.contacto}. ${this.mensaje ? 'Mensaje: ' + this.mensaje : ''}`;
    const url = `https://wa.me/34622699116?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }

  ngAfterViewInit() {
    gsap.from('.contact-content', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
      },
    });
  }
}
