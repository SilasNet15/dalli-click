
export interface GridPieceId extends String {
  gridPieceId: never;
}

export const asGridPieceId = (id: unknown): GridPieceId => <GridPieceId>id;

export interface GridPiece {
  id: GridPieceId;
  revealed: boolean;
}
