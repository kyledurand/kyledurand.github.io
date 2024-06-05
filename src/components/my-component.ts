import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("kyle-one")
export class Kyle extends LitElement {
  @property() name = "my-element";

  override render() {
    console.log("rendering");
    return html`<div>
      <button @click=${() => (this.name = this.name + "kyle")}>Click me</button>
      <p>Hello world! From ${this.name}</p>
    </div>`;
  }
}
