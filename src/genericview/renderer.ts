import { MutableRefObject } from 'react';

/**
 * Interface that represents a generic renderer, a components that draw a graph
 * on a specific html reference.
 * @template Settings the graphical preferences of the graph
 * @template Renderable the structure that represents something that this
 * renderer is capable of render.
 */
export interface Renderer<Settings, Renderable> {

  /**
   * Updates the graphical preferences of the render, does not trigger a
   * rerender of the graph
   * @param s the new Settings
   */
  updateSettings(s: Settings): void;

  /**
   * Updates the graph point that need to be render, does not trigger a render of
   * the graph
   * @param p the new renderable
   */
  updatePoints(p: Renderable): void;

  /**
   * Perform the render of the graph on the specified html reference
   * @param ref the html reference
   */
  render(ref: MutableRefObject<HTMLDivElement>): void;
}
