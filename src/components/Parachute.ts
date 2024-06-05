import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("ui-parachute")
export class Parachute extends LitElement {
  private duration = 700;

  @state() private position = "-90px";
  @state() private status: "falling" | "landed" = "falling";

  constructor() {
    super();
    setTimeout(() => {
      this.position = "0px";
      this.deploy();
    }, this.duration);
  }

  deploy() {
    setTimeout(() => {
      this.position = "64px";
      this.land();
    }, this.duration);
  }

  land() {
    setTimeout(() => {
      this.status = "landed";
    }, this.duration);
  }

  static override styles = css`
    .logo {
      transform-origin: center 100px;
    }

    .logo.landed {
      animation: rotate 150ms ease-out forwards;
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
    return html` <svg
      width="44"
      height="116"
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
          stroke-linejoin="round"
          class="parachute"
          style="
            transition-timing-function: ${this.status === "landed"
            ? "ease-out"
            : "ease-in"};
            transform: translateY(${this.position}); 
            transition-duration: ${this.duration}ms;"
          d="M13 7.44C15.785 5.147 18.755 4 21.91 4c3.155 0 6.126 1.147 8.91 3.44l-8.91 27.084L13 7.44Z"
        >
          <animate
            attributeName="d"
            from="M13 7.44C15.785 5.147 18.755 4 21.91 4c3.155 0 6.126 1.147 8.91 3.44l-8.91 27.084L13 7.44Z"
            to="M4.442 19.159c0-8.528 8.019-15.44 17.91-15.44 9.892 0 17.911 6.912 17.911 15.44l-17.91 15.083-17.91-15.083Z"
            dur="${this.duration / 1.5}ms"
            fill="freeze"
            easing="ease-in"
            begin="${this.duration * 1.75}ms"
          />
        </path>

        <path d="M4.045 111.95h35.91" />
      </g>
    </svg>`;
  }
}
