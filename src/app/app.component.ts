import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage, NgFor, NgClass, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgFor, NgClass, NgIf, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dalliClick';


  // Define the grid pieces state
  gridPieces = Array.from({ length: 12 }, () => ({ hidden: false }));

  // Array to hold image objects
  images: { index: number; path: string }[] = [];

  count = 1;

  constructor() {
    // Initialize images array
    this.loadImages();
  }

  // Function to initialize images array
  loadImages(): void {
    const imagePaths = [
      'assets/images/image_1.jpeg',
      'assets/images/image_2.jpg',
    ];

    this.images = imagePaths.map((path, index) => ({ index, path }));
  }



  // Function to reveal a piece
  revealPiece(index: number): void {
    this.gridPieces[index].hidden = true; // Set the piece as hidden to reveal background
  }
}
