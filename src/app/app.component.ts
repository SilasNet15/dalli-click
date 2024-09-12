import { Component, HostListener, OnInit } from '@angular/core';
import { NgOptimizedImage, NgFor, NgClass, NgIf, NgStyle } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { asGridPieceId, GridPiece, GridPieceId } from './grid-piece.type';
import { v4 } from "uuid";
import { IMAGE_INFO_LIST } from '../assets/image-info';
import { ImageInfo } from './image-info.type';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, NgClass, NgIf, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected title: string;
  protected gridPieceList: GridPiece[];
  protected imageList: ImageInfo[];
  protected currentImageIndex: number;

  constructor(
    private titleService: Title,
  ) {
    this.title = 'dalliClick';
    this.imageList = IMAGE_INFO_LIST;
    this.gridPieceList =  Array.from({ length: 12 }, () => ({
      revealed: false,
      id: asGridPieceId(v4()),
    }));
    this.currentImageIndex = 0;
  }

  public ngOnInit(): void {
    this.setTitle();
  }

  @HostListener('window:keydown', ['$event'])
  protected handleKeyDown(event: KeyboardEvent): void {
    console.log('handleKeyDown', event);
    switch (event.code) {
      case 'ArrowRight':
        console.log('Arrow Right pressed');
        if (this.isAllRevealed()) {
          this.loadNextImageAndResetPieceList(); // Load the next image when all pieces are revealed
        } else {
          this.revealRandomPiece();
        }
        break;
      case 'ArrowLeft':
        console.log('Arrow Left pressed', !this.isAllRevealed());
        if (!this.isAllHidden()) {
          this.revokeReveal();
        } else {
          this.loadPreviousImage();
        }
        break;
      case 'Space': {
        this.revealAllGridPieces();
        break;
      }
      case 'Backspace': {
        this.resetGridPieces();
        break;
      }
    }
  }

  private setTitle(): void {
    this.title = this.imageList[this.currentImageIndex]?.imageName || 'Dalli';
    this.titleService.setTitle(this.title); // Use Title service to set the document's title
  }

  private revealPiece(id: GridPieceId): void {
    const pieceToReveal = this.gridPieceList.find(gridPiece => gridPiece.id === id);

    if (pieceToReveal) {
      pieceToReveal.revealed = true;
    }
  }

  private revealRandomPiece(): void {
    const nonHiddenPieceList = this.gridPieceList.filter(piece => !piece.revealed);

    if (nonHiddenPieceList.length > 0) {
      const randomPiece = nonHiddenPieceList[Math.floor(Math.random() * nonHiddenPieceList.length)];
      this.revealPiece(randomPiece.id);
    }
  }

  private revokeReveal(): void {
    const revealedPiece = this.gridPieceList.find(piece => piece.revealed);

    if (revealedPiece) {
      revealedPiece.revealed = false;
    }
  }

  private loadNextImageAndResetPieceList(): void {
    if (this.currentImageIndex < this.imageList.length -1) {
      this.currentImageIndex++;
    }

    this.resetGridPieces();
    this.setTitle();
  }

  private loadPreviousImage(): void {
    this.revealAllGridPieces();

    if (this.currentImageIndex !== 0) {
      this.currentImageIndex--;
    }

    this.setTitle();
  }

  private resetGridPieces(): void {
    this.gridPieceList.forEach((gridPiece) => gridPiece.revealed = false); // Reset all pieces
  }

  private revealAllGridPieces(): void {
    this.gridPieceList.forEach((gridPiece) => gridPiece.revealed = true); // Reset all pieces
  }

  private isAllRevealed(): boolean {
    return this.gridPieceList.every(piece => piece.revealed);
  }

  private isAllHidden(): boolean {
    return this.gridPieceList.every(gridPiece => !gridPiece.revealed);
  }
}
