import {LitElement, css, html} from "lit";
import {customElement, state} from "lit/decorators.js";

@customElement("ui-parachute")
export class UIParachute extends LitElement {
  private duration = 700;

  @state() private position = "-130dvh";
  @state() private status: "falling" | "landed" = "falling";

  constructor() {
    super();
    setTimeout(() => {
      this.position = "-50vh";
      this.deploy();
    }, 0);
  }

  deploy() {
    setTimeout(() => {
      this.position = "0px";
      this.land();
    }, this.duration);
  }

  land() {
    setTimeout(() => {
      this.status = "landed";
    }, this.duration);
  }

  static override styles = css`
    .wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: var(--space-3);
      background: var(--background);
      box-shadow: -5px -5px 7px 0px var(--background);
    }

    .logo {
      overflow: visible;
    }

    .logo.landed {
      animation: rotate 150ms ease-in-out forwards;
    }

    .parachute {
      transition-property: transform;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(90deg);
      }
    }
  `;

  override render() {
    return html`
    <div class="wrapper">
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        class="logo ${this.status}"
        style="transition-duration: ${this.duration}ms"
      >
        <g
          stroke="var(--highlight)"
          stroke-width="7"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
        >
          <path
            class="parachute"
            style="
            transition-timing-function: ${
              this.status === "landed" ? "ease-out" : "ease-in"
            };
            transform: translateY(${this.position}); 
            transition-duration: ${this.duration}ms;"
            d="M19 14.6813C19 6.02075 21.6863 4 25 4C28.3137 4 31 6.02075 31 14.6813L25 35L19 14.6813Z"
          >
            <animate
              attributeName="d"
              from="M19 14.6813C19 6.02075 21.6863 4 25 4C28.3137 4 31 6.02075 31 14.6813L25 35L19 14.6813Z"
              to="M4 19.6813C4 11.0208 13.402 4 25 4C36.598 4 46 11.0208 46 19.6813L25 35L4 19.6813Z"
              dur="${this.duration / 1.5}ms"
              fill="freeze"
              easing="ease-in"
              begin="${this.duration}ms"
            />
          </path>

          <path d="M20.0125 46H29.9875" opacity="0">
            <animate 
              attributeName="opacity"
              values="0;1" 
              dur="${this.duration}ms" 
              fill="freeze" 
              begin="${this.duration}ms"
            />
            <animate 
              attributeName="d"
              from="M20.0125 46H29.9875"
              to="M4.05237 46H45.9476" 
              dur="${this.duration}ms" 
              fill="freeze" 
              begin="${this.duration}ms"
            />
        </g>
      </svg>
    </div>
    `;
  }
}
