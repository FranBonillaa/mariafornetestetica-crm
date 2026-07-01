import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesData {
  readonly PLACEHOLDER = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400';

  // Todos los servicios actuales
  services = [
    // Manos y Pies
    { category: 'Manos y Pies', name: 'Manicura', price: 10, image: '/images/manicura.jpg' },
    {
      category: 'Manos y Pies',
      name: 'Esmaltado semipermanente',
      price: 16,
      image: '/images/esmaltado_semipermanente.jpg',
    },
    {
      category: 'Manos y Pies',
      name: 'Esmaltado semipermanente con relleno',
      price: 25,
      image: '/images/esmaltado_semipermanente.jpg',
    },
    {
      category: 'Manos y Pies',
      name: 'Retirada semipermanente',
      price: 10,
      image: '/images/retirada_semipermanente.jpg',
    },
    { category: 'Manos y Pies', name: 'Pedicura', price: 25, image: '/images/pedicura.jpg' },
    {
      category: 'Manos y Pies',
      name: 'Pedicura + esmaltado semipermanente',
      price: 41,
      image: '/images/pedicura.jpg',
    },
    {
      category: 'Manos y Pies',
      name: 'Pedicura + esmaltado normal',
      price: 35,
      image: '/images/pedicura.jpg',
    },
    {
      category: 'Manos y Pies',
      name: 'Esmaltado semipermanente en pies',
      price: 16,
      image: '/images/esmalte_pies.jpg',
    },
    {
      category: 'Manos y Pies',
      name: 'Esmaltado normal en pies',
      price: 10,
      image: '/images/esmalte_pies.jpg',
    },
    {
      category: 'Manos y Pies',
      name: '1ª puesta uñas acrílicas',
      price: 35,
      image: '/images/unas_acrilicas.jpg',
    },
    {
      category: 'Manos y Pies',
      name: 'Relleno de uñas',
      price: 25,
      image: '/images/unas_acrilicas.jpg',
    },
    { category: 'Manos y Pies', name: 'Arreglo uña rota', price: 3, image: '/images/arreglo_una_rota.jpg' },

    // Depilación Facial y Corporal
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación cejas',
      price: 7,
      image: '/images/depilacion_cejas.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Tinte de cejas',
      price: 5,
      image: '/images/depilacion_cejas.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación cejas + tinte',
      price: 12,
      image: '/images/depilacion_cejas.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación labio superior',
      price: 3,
      image: '/images/depilacion_facial.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación labio inferior',
      price: 3,
      image: '/images/depilacion_facial.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación mentón',
      price: 4,
      image: '/images/depilacion_facial.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación pómulos',
      price: 4,
      image: '/images/depilacion_facial.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación nariz',
      price: 3,
      image: '/images/depilacion_facial.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación brazos completos',
      price: 14,
      image: '/images/depilacion_brazos.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación medios brazos',
      price: 7,
      image: '/images/depilacion_brazos.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación axilas',
      price: 8,
      image: '/images/depilacion_axilas.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación espalda',
      price: 15,
      image: '/images/depilacion_espalda.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación piernas completas',
      price: 18,
      image: '/images/depilacion_piernas.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación medias piernas',
      price: 9,
      image: '/images/depilacion_piernas.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación ingles normales',
      price: 8,
      image: '/images/depilacion_intima.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación ingles brasileñas',
      price: 12,
      image: '/images/depilacion_intima.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación pubis completo',
      price: 14,
      image: '/images/depilacion_intima.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación perianal',
      price: 5,
      image: '/images/depilacion_intima.jpg',
    },
    {
      category: 'Depilación Facial y Corporal',
      name: 'Depilación glúteos',
      price: 8,
      image: '/images/depilacion_intima.jpg',
    },

    // Tratamientos Faciales
    {
      category: 'Tratamientos Faciales',
      name: 'Higiene facial',
      price: 49.99,
      image: '/images/higiene_facial.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Collagen Booster',
      price: 90,
      image: '/images/collagen_booster.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Hyaluronic',
      price: 60,
      image: '/images/hyaluronic.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Glycolic + Vitamina C',
      price: 60,
      image: '/images/glycolic_vitamina_c.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Tratamiento pieles grasas',
      price: 60,
      image: '/images/tratamiento_pieles_grasas.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Lab Biotics - Probiotics',
      price: 60,
      image: '/images/lab_biotics_probiotics.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Tratamiento despigmentante',
      price: 60,
      image: '/images/tratamiento_despigmentante.jpg',
    },
    {
      category: 'Tratamientos Faciales',
      name: 'Bioceuticals - Tratamiento reparante',
      price: 60,
      image: '/images/tratamiento_reparante.jpg',
    },

    // Tratamientos Corporales
    {
      category: 'Tratamientos Corporales',
      name: 'Presoterapia',
      price: 10,
      image: '/images/presoterapia.jpg',
    },
    {
      category: 'Tratamientos Corporales',
      name: 'Presoterapia + masaje drenante (45 min)',
      price: 20,
      image: '/images/presoterapia.jpg',
    },
    {
      category: 'Tratamientos Corporales',
      name: 'Masaje relajante cuerpo completo 1h',
      price: 45,
      image: '/images/masaje_relajante.jpg',
    },
    {
      category: 'Tratamientos Corporales',
      name: 'Masaje relajante 30 min',
      price: 22,
      image: '/images/masaje_relajante.jpg',
    },

    // Lifting de Pestañas
    {
      category: 'Lifting de Pestañas',
      name: 'Lifting de pestañas',
      price: 40,
      image: '/images/lifting_pestanas.jpg',
    },
    {
      category: 'Lifting de Pestañas',
      name: 'Lifting de pestañas (promoción)',
      price: 36,
      image: '/images/lifting_pestanas.jpg',
    },
    // Tratamientos INDIBA
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Facial',
      price: 80,
      image: '/images/indiba_facial.jpg',
    },
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Piernas',
      price: 80,
      image: '/images/indiba_cartucheras.jpg',
    },
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Cartucheras (40 min)',
      price: 60,
      image: '/images/indiba_cartucheras.jpg',
    },
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Abdomen (40 min)',
      price: 60,
      image: '/images/indiba_abdomen_pecho.jpg',
    },
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Pecho (40 min)',
      price: 60,
      image: '/images/indiba_abdomen_pecho.jpg',
    },
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Glúteos (40 min)',
      price: 60,
      image: '/images/indiba_gluteos.jpg',
    },
    {
      category: 'Tratamientos INDIBA',
      name: 'INDIBA Brazos (40 min)',
      price: 60,
      image: '/images/indiba_brazos.jpg',
    },
  ];
}
