export interface MouseHandler {
  target: HTMLElement|Document;

  onPointerDown?(event: PointerEvent): void;
  onPointerMove?(event: PointerEvent): void;
  onPointerUp?(event: PointerEvent): void;
  onClick?(event: MouseEvent): void;
  onContextMenu?(event: MouseEvent): void;
}