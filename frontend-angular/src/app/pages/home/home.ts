import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesComponent } from '../../components/services/services';
import { FeaturesComponent } from '../../components/features/features';
import { PackagesComponent } from '../../components/packages/packages';
import { ContactComponent } from '../../components/contact/contact';
import { FooterComponent } from '../../components/footer/footer';
import { ReviewsComponent } from '../../components/reviews/reviews';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    FeaturesComponent,
    PackagesComponent,
    ContactComponent,
    FooterComponent,
    ReviewsComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
