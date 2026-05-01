import type { IViewportOptions } from "pixi-viewport";
import { Viewport } from "pixi-viewport";
import type { Application, Container } from "pixi.js";

interface ViewportExtendedOptions extends Omit<IViewportOptions, "events"> {
  app: Application;
}

export interface RawFilterParams {
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  pixelate: number;
  red: number;
  green: number;
  blue: number;
}

// Extends pixi-viewport to fix DOM element release on unmount
export class ViewportExtended extends Viewport {
  public app: Application;
  public filterContainer: Container | null = null;
  public rawFilterParams: RawFilterParams | null = null;
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
