import { controls } from "./elements.js";
import * as actions from "./actions.js";
import * as el from "./elements.js";
import state from "./state.js";
import * as timer from "./timer.js";

export function registerControls() {
  controls.addEventListener("click", (event) => {
    const action = event.target.dataset.action;

    if (typeof actions[action] !== "function") {
      return;
    }

    actions[action]();
  });
}

export function setMinutes() {
  el.minutes.addEventListener("focus", (event) => {
    el.minutes.textContent = "";
  });

  el.minutes.onkeydown = (event) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight'];
    const isNumber = /\d/.test(event.key);
    
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  
    if (el.minutes.textContent.length > 1 && isNumber) {
      event.preventDefault();
    }
  }

  el.minutes.addEventListener("blur", (event) => {
    let time = event.currentTarget.textContent;
    console.log(event)
    time = time > 24 ? 24 : time;
    state.minutes = time;
    state.seconds = 0;
    timer.updateDisplay();
    el.minutes.removeAttribute("contenteditable");
  });
}
