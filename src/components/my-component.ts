import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  constructor() {
    super();

    this.name = "my-components";
    console.log(this.name);
  }

  @property() name = "my-component";

  override render() {
    return html`<div>
      <button @click=${() => (this.name = this.name + " component")}>
        Click me
      </button>
      <p>Hello world! From ${this.name}</p>
    </div>`;
  }
}
