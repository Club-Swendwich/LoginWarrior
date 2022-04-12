import { MutableRefObject } from 'react';

/**
 * Interface that rappresents a generic renderer, a components that draw a graph
 * on a specific html reference.
 * @template Settings the graphical preferences of the graph
 * @template RenderablePoints the structure that rappresents a collection of point that this
 * renderer is capable of render.
 */
export interface Renderer<Settings, RenderablePoints> {

  /**
   * Updates the graphical preferences of the render, does not trigger a
   * rerender of the graph
   * @param s the new Settings
   */
  updateSettings(s: Settings): void;

  /**
   * Updates the grap point that need to be render, does not trigger a render of
   * the graph
   * @param p the new points
   */
  updatePoints(p: RenderablePoints): void;

  /**
   * Perform the render of the graph on the specified html reference
   * @param ref the html reference
   */
  render(ref: MutableRefObject<HTMLDivElement>): void;
}
