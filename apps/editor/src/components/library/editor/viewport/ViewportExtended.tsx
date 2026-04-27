import type { IViewportOptions } from "pixi-viewport";
import { Viewport } from "pixi-viewport";
import type { Application } from "pixi.js";

interface ViewportExtendedOptions extends Omit<IViewportOptions, "events"> {
  app: Application;
}

// Extends pixi-viewport to fix DOM element release on unmount
export class ViewportExtended extends Viewport {
  public app: Application;
  private renderedDOMElement?: HTMLElement;

  constructor({ app, ...options }: ViewportExtendedOptions) {
    super({ events: app.renderer.events, ...options } as IViewportOptions);
    this.app = app;
    this.lockDOMElement();
  }

  lockDOMElement(): this {
    this.renderedDOMElement = this.options.events.domElement as HTMLElement;
    return this;
  }

  patchEvents(): void {
    if (this.renderedDOMElement) {
      this.options.events.domElement = this.renderedDOMElement;
    }
  }

  releaseDOMElement(): void {
    this.renderedDOMElement = undefined;
  }

  update(elapsed: number): void {
    super.update(elapsed);
  }
}
