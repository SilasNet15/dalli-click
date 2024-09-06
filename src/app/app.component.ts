import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage, NgFor, NgClass, NgIf, NgStyle } from '@angular/common';
import { Title } from '@angular/platform-browser'; // Import Title service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgFor, NgClass, NgIf, NgStyle],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dalliClick';

  // Define the grid pieces state
  gridPieces = Array.from({ length: 12 }, () => ({ hidden: false }));

  // Array to hold image objects with name and path
  images: { index: number; path: string; imageName: string }[] = [];

  // Counter to track which image to display
  count: number = 0;

  // Flags to check if all pieces are revealed or hidden
  isAllRevealed: boolean = false;
  isAllHidden: boolean = true;

  constructor(private titleService: Title) { // Inject Title service
    // Initialize images array
    this.loadImages();
    this.setTitle();
  }

  // Function to initialize images array
  loadImages(): void {
    const imagePaths = [
      { path: 'assets/images/image_1.jpeg', imageName: 'Image 1' },
      { path: 'assets/images/image_2.jpg', imageName: 'Image 2' },
      { path: 'assets/images/image_3.webp', imageName: 'Image 3' },
      { path: 'assets/images/image_4.jpg', imageName: 'Image 4' },
      { path: 'assets/images/image_5.jpg', imageName: 'Image 5' },
    ];

    this.images = imagePaths.map((image, index) => ({ index, ...image }));
  }

  // Function to set the title to the current image name
  setTitle(): void {
    this.title = this.images[this.count]?.imageName || 'Dalli';
    this.titleService.setTitle(this.title); // Use Title service to set the document's title
  }

  // Function to reveal a piece
  revealPiece(index: number): void {
    this.gridPieces[index].hidden = true; // Set the piece as hidden to reveal background
    this.checkAllRevealed(); // Check if all pieces are revealed
    this.checkAllHidden(); // Check if all pieces are hidden
  }

  // Function to hide a piece
  hidePiece(index: number): void {
    this.gridPieces[index].hidden = false; // Set the piece as visible
    this.checkAllHidden(); // Check if all pieces are hidden
  }

  // HostListener to detect arrow key presses
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        console.log('Arrow Right pressed');
        if (this.isAllRevealed) {
          this.loadNextImage(); // Load the next image when all pieces are revealed
        } else {
          this.revealRandomPiece();
        }
        break;
      case 'ArrowLeft':
        console.log('Arrow Left pressed');
        if (this.isAllHidden) {
          if (this.count > 0) {
            this.loadPreviousImage(); // Load the previous image if we are not at the first image
          }
        } else {
          this.revokeReveal();
        }
        break;
      default:
        break;
    }
  }

  // Method to reveal a random grid piece
  revealRandomPiece(): void {
    const hiddenPieces = this.gridPieces.map((piece, index) => !piece.hidden ? index : -1).filter(index => index !== -1);
    if (hiddenPieces.length > 0) {
      const randomIndex = hiddenPieces[Math.floor(Math.random() * hiddenPieces.length)];
      this.revealPiece(randomIndex);
    }
  }

  // Method to revoke (hide) the last revealed grid piece
  revokeReveal(): void {
    const revealedPieces = this.gridPieces.map((piece, index) => piece.hidden ? index : -1).filter(index => index !== -1);
    if (revealedPieces.length > 0) {
      const lastRevealedIndex = revealedPieces[revealedPieces.length - 1];
      this.hidePiece(lastRevealedIndex);
    }
  }

  // Method to check if all grid pieces are revealed
  checkAllRevealed(): void {
    const allRevealed = this.gridPieces.every(piece => piece.hidden);
    this.isAllRevealed = allRevealed;
  }

  // Method to check if all grid pieces are hidden
  checkAllHidden(): void {
    const allHidden = this.gridPieces.every(piece => !piece.hidden);
    this.isAllHidden = allHidden;
  }

  // Method to load the next image and reset the grid
  loadNextImage(): void {
    this.count = (this.count + 1) % this.images.length; // Increment count and wrap around
    this.resetGridPieces(); // Reset grid pieces to hidden
    this.setTitle(); // Update the title to the new image name
    this.isAllRevealed = false; // Reset the flag
  }

  // Method to load the previous image and reset the grid
  loadPreviousImage(): void {
    this.resetGridPieces(); // Reset grid pieces to hidden first
    this.count = (this.count - 1 + this.images.length) % this.images.length; // Decrement count and wrap around
    this.setTitle(); // Update the title to the new image name
    this.isAllRevealed = false; // Reset the flag
  }

  // Method to reset all grid pieces to hidden
  resetGridPieces(): void {
    this.gridPieces = this.gridPieces.map(() => ({ hidden: false })); // Reset all pieces
    this.isAllHidden = true; // Set the flag to true after resetting
  }
}
