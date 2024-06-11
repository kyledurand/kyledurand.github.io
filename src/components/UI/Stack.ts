import {html, css, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("ui-stack")
export class UIStack extends LitElement {
  @property() direction?: "row" | "column";
  @property() gap?: number;
  @property() align?: "start" | "center" | "end" | "stretch";
  @property() justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";

  static override styles = css`
    :host {
      display: flex;
      gap: var(--gap);
      flex-direction: var(--direction);
      align-items: var(--align);
      justify-content: var(--justify);
    }

    ::slotted(*) {
      margin: 0;
    }
  `;

  override render() {
    const {direction, gap, isConnected, style, align, justify} = this;
    if (isConnected && gap) style.setProperty("--gap", `${gap}px`);
    if (isConnected && direction) style.setProperty("--direction", direction);
    if (isConnected && align) style.setProperty("--align", align);
    if (isConnected && justify) style.setProperty("--justify", justify);

    return html`<slot />`;
  }
}
