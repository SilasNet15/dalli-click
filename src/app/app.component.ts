import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dalliClick';
  // Define the grid pieces state
  gridPieces = Array.from({ length: 12 }, () => ({ hidden: false }));

  // Function to reveal a piece
  revealPiece(index: number): void {
    this.gridPieces[index].hidden = true; // Set the piece as hidden to reveal background
  }
}
