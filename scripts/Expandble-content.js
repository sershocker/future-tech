import pxToRem from "./pxToRem.js";

const rootSelector = "[data-js-expandble-content]";

class ExpandbleContent {
  selectors = {
    root: rootSelector,
    button: "[data-js-expandble-content-button]",
  };

  stateClasses = {
    isExpanded: "is-expanded",
  };
  animationParams = {
    duration: 500,
    easing: "ease",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElement = this.rootElement.querySelector(this.selectors.button);
    this.bindEvents();
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement;

    this.rootElement.classList.add(this.stateClasses.isExpanded);
    this.rootElement.animate(
      [
        {
          maxHeight: `${pxToRem(offsetHeight)}rem`,
        },
        {
          maxHeight: `${pxToRem(scrollHeight)}rem`,
        },
      ],
      this.animationParams
    );
  }

  onButtonCLick = () => {
    this.expand();
  };

  bindEvents() {
    this.buttonElement.addEventListener("click", this.onButtonCLick);
  }
}

class ExpandbleContentCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ExpandbleContent(element);
    });
  }
}

export default ExpandbleContentCollection;
