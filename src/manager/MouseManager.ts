import {MouseHandler} from '../handlers/MouseHandler';

export class MouseManager {
  private handlers: MouseHandler[] = [];
  private events = {
    onPointerDown: 'pointerdown',
    onPointerMove: 'pointermove',
    onPointerUp: 'pointerup',
    onClick: 'click',
    onContextMenu: 'contextmenu',
  } as const;

  register(handler: MouseHandler) {
    this.handlers.push(handler);

    this.bindEvents(handler, true)
  }

  unregister(handler: MouseHandler) {
    this.handlers = this.handlers.filter(h => h !== handler);

    this.bindEvents(handler, false);
  }

  private bindEvents(
      handler: MouseHandler,
      add: boolean,
  ) {
    const target = this.getTarget(handler);

    for (const [method, event] of Object.entries(this.events)) {
      const callback = handler[method as keyof MouseHandler];

      if (typeof callback !== 'function') {
        continue;
      }

      if (add) {
        target.addEventListener(event, callback as EventListener);
      } else {
        target.removeEventListener(event, callback as EventListener);
      }
    }
  }

  private getTarget(handler: MouseHandler): Document|HTMLElement {
    if (handler.target === 'document') return activeDocument;

    return handler.target!;
  }
}