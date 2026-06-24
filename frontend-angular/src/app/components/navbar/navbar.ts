import { Component, AfterViewInit, NgZone, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements AfterViewInit {
  activeSection = 'inicio';
  private zone = inject(NgZone);

  ngAfterViewInit(): void {
    const sections = ['inicio', 'servicios', 'bonos', 'contacto'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.zone.run(() => {
              this.activeSection = entry.target.id;
            });
          }
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  menuAbierto = false;

  // Interruptor de apagado y encendido
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
