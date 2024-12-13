import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-home',
  standalone: true, // Standalone component
  imports: [CommonModule, RouterModule], // Importa os módulos necessários
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  firstRow = [
    {
      image: 'assets/images/games.jpg',
      title: 'Games',
      description: 'Explore our wide selection of games across all platforms.',
      link: '/games',
      buttonText: 'GAMES',
    },
    {
      image: 'assets/images/computers.jpg',
      title: 'Computers',
      description: 'Find the best high-performance computers and accessories.',
      link: '/computers',
      buttonText: 'COMPUTERS',
    },
    {
      image: 'assets/images/consoles.jpg',
      title: 'Consoles',
      description: 'Get the latest consoles for unbeatable gameplay.',
      link: '/consoles',
      buttonText: 'CONSOLES',
    },
  ];

  secondRow = [
    {
      image: 'assets/images/monitors.jpg',
      title: 'Monitors',
      description: 'Discover our range of high-performance monitors.',
      link: '/monitors',
      buttonText: 'MONITORS',
    },
    {
      image: 'assets/images/accessories.jpg',
      title: 'Accessories & Peripherals',
      description: 'Enhance your gaming experience with our accessories.',
      link: '/accessories',
      buttonText: 'ACCESSORIES',
    },
  ];
}
