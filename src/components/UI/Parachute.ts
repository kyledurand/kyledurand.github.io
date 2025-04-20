import {LitElement, css, html} from "lit";
import {customElement, state} from "lit/decorators.js";

@customElement("ui-parachute")
export class UIParachute extends LitElement {
  private duration = 700;

  @state() private position = "-130dvh";
  @state() private status: "falling" | "landed" = "falling";
  @state() private doingTrick = false;
  private konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  private konamiIndex = 0;

  constructor() {
    super();
    setTimeout(() => {
      this.position = "-50vh";
      this.deploy();
    }, 0);
  }

  connectedCallback() {
    super.connectedCallback();
    // Add event listener for Konami code when component is connected to DOM
    window.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up event listener when component is removed
    window.removeEventListener("keydown", this.handleKeydown.bind(this));
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

  handleClick() {
    if (this.status === "landed" && !this.doingTrick) {
      this.doTrick();
    }
  }

  handleKeydown(event: KeyboardEvent) {
    // Check if the pressed key matches the next key in the Konami sequence
    if (event.key === this.konamiSequence[this.konamiIndex]) {
      this.konamiIndex++;

      // If the full sequence is entered
      if (this.konamiIndex === this.konamiSequence.length) {
        this.doTrick();
        this.konamiIndex = 0; // Reset for next time
      }
    } else {
      this.konamiIndex = 0; // Reset on wrong key
    }
  }

  doTrick() {
    if (this.doingTrick) return;

    this.doingTrick = true;

    // Reset after animation completes
    setTimeout(() => {
      this.doingTrick = false;
    }, 1500);
  }

  static override styles = css`
    .wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: var(--space-3);
      background: var(--background);
      box-shadow: -5px -5px 7px 0px var(--background);
      cursor: pointer;
    }

    .logo {
      overflow: visible;
    }

    .logo.landed {
      animation: rotate 150ms ease-in-out forwards;
    }

    .logo.trick {
      animation: loopDiLoop 1.5s ease-in-out forwards;
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

    @keyframes loopDiLoop {
      0% {
        transform: rotate(90deg) scale(1);
      }
      25% {
        transform: rotate(180deg) scale(1.2);
      }
      50% {
        transform: rotate(270deg) scale(1.5);
      }
      75% {
        transform: rotate(360deg) scale(1.2);
      }
      100% {
        transform: rotate(450deg) scale(1);
      }
    }

    button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  `;

  override render() {
    return html`
    <div class="wrapper">
      <button @click="${this.handleClick}">
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          class="logo ${this.status} ${this.doingTrick ? "trick" : ""}"
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
        </button>
    </div>
    `;
  }
}
