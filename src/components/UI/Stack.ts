import {html, css, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";

type Align = "start" | "center" | "end" | "stretch";
type Justify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type Direction = "row" | "column";
type SpaceToken = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface StackProps {
  direction?: Direction;
  gap?: SpaceToken;
  align?: Align;
  justify?: Justify;
  paddingBlock?: SpaceToken;
  paddingInline?: SpaceToken;
}

@customElement("ui-stack")
export class UIStack extends LitElement {
  @property() direction?: Direction;
  @property() gap?: SpaceToken;
  @property() align?: Align;
  @property() justify?: Justify;
  @property() paddingBlock?: SpaceToken;
  @property() paddingInline?: SpaceToken;

  constructor(props: StackProps) {
    super();
    Object.assign(this, props);
  }

  static override styles = css`
    :host {
      display: flex;
      gap: var(--gap);
      flex-direction: var(--direction);
      align-items: var(--align);
      justify-content: var(--justify);
      padding-block: var(--padding-block);
      padding-inline: var(--padding-inline);
    }

    ::slotted(*) {
      margin: 0;
    }
  `;

  override render() {
    const {
      align,
      direction,
      gap,
      isConnected,
      justify,
      paddingBlock,
      paddingInline,
      style,
    } = this;
    if (isConnected && direction) style.setProperty("--direction", direction);
    if (isConnected && align) style.setProperty("--align", align);
    if (isConnected && justify) style.setProperty("--justify", justify);
    if (isConnected && gap) style.setProperty("--gap", `var(--space-${gap})`);
    if (isConnected && paddingBlock)
      style.setProperty("--padding-block", `var(--space-${paddingBlock})`);
    if (isConnected && paddingInline)
      style.setProperty("--padding-inline", `var(--space-${paddingInline})`);

    return html`<slot></slot>`;
  }
}
