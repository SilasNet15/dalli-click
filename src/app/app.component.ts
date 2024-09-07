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
      { path: 'assets/images/bild_1.jpg', imageName: 'Bild 1' },
      { path: 'assets/images/bild_2.jpg', imageName: 'Bild 2' },
      { path: 'assets/images/bild_3.jpg', imageName: 'Bild 3' },
      { path: 'assets/images/bild_3a.jpg', imageName: 'Bild 3a' },
      { path: 'assets/images/bild_4.jpg', imageName: 'Bild 4' },
      { path: 'assets/images/bild_4a.jpg', imageName: 'Bild 4a' },
      { path: 'assets/images/bild_5.jpg', imageName: 'Bild 5' },
      { path: 'assets/images/bild_5a.jpg', imageName: 'Bild 5a' },
      { path: 'assets/images/bild_6.jpg', imageName: 'Bild 6' },
      { path: 'assets/images/bild_7.jpg', imageName: 'Bild 7' },
      { path: 'assets/images/bild_8.jpg', imageName: 'Bild 8' },
      { path: 'assets/images/bild_9.jpg', imageName: 'Bild 9' },
      { path: 'assets/images/bild_10.jpg', imageName: 'Bild 10' },
      { path: 'assets/images/bild_11.jpg', imageName: 'Bild 11' },
      { path: 'assets/images/bild_12.jpg', imageName: 'Bild 12' },
      { path: 'assets/images/bild_12a.jpg', imageName: 'Bild 12a' },
      { path: 'assets/images/bild_13.jpg', imageName: 'Bild 13' },
      { path: 'assets/images/bild_14.jpg', imageName: 'Bild 14' },
      { path: 'assets/images/bild_15.jpg', imageName: 'Bild 15' },
      { path: 'assets/images/bild_16.jpg', imageName: 'Bild 16' },
      { path: 'assets/images/bild_17.jpg', imageName: 'Bild 17' },
      { path: 'assets/images/bild_17a.jpg', imageName: 'Bild 17a' },
      { path: 'assets/images/bild_17b.jpg', imageName: 'Bild 17b' },
      { path: 'assets/images/bild_18.jpg', imageName: 'Bild 18' },
      { path: 'assets/images/bild_19.jpg', imageName: 'Bild 19' },
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
