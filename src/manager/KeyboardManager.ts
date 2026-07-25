import {KeyboardHandler} from '../handlers/KeyboardHandler';

export class KeyboardManager {
  private handlers: KeyboardHandler[] = [];

  private events = {
    onKeyDown: 'keydown',
    onKeyUp: 'keyup',
  } as const;

  register(handler: KeyboardHandler) {
    this.handlers.push(handler);

    this.bindEvents(handler, true);
  }

  unregister(handler: KeyboardHandler) {
    this.handlers = this.handlers.filter(h => h !== handler);

    this.bindEvents(handler, false);
  }

  private bindEvents(
      handler: KeyboardHandler,
      add: boolean,
  ) {
    const target = handler.target;

    for (const [method, event] of Object.entries(this.events)) {
      const callback = handler[method as keyof KeyboardHandler];

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
}