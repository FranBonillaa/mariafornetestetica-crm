import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-packages',
  imports: [],
  templateUrl: './packages.html',
  styleUrl: './packages.css',
})
export class PackagesComponent implements AfterViewInit {
  ngAfterViewInit() {
    gsap.from('.package-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.package-card',
        start: 'top 80%',
      },
    });
  }
}
