export interface KeyboardHandler {
  target: Document|HTMLElement;

  onKeyDown?(event: KeyboardEvent): void;
  onKeyUp?(event: KeyboardEvent): void;
}