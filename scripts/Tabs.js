const rootSelector = "[data-js-tabs]";
class Tabs {
  selectors = {
    root: rootSelector,
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
  };
  stateClasses = {
    isActive: "is-active",
  };
  stateAttributes = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
  };
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
    this.limitTabsIndex = this.buttonElements.length - 1;

    this.state = {
      activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => {
        buttonElement.classList.contains(this.stateClasses.isActive);
      }),
    };

    this.bindEvents();
  }
  updateUI() {
    const activeTabIndex = this.state.activeTabIndex;
    console.log(activeTabIndex);
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabIndex;
      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? "0" : "-1");
    });

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === activeTabIndex;
      contentElement.classList.toggle(this.stateClasses.isActive, index === activeTabIndex);
    });
  }

  activeTab(newTabIndex) {
    this.onButtonClick(newTabIndex);
    this.buttonElements[newTabIndex].focus();
  }
  previousTab = () => {
    const newTabIndex = this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1;
    this.activeTab(newTabIndex);
  };
  nextTab = () => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1;
    this.activeTab(newTabIndex);
  };
  firstTab = () => {
    this.activeTab(0);
  };
  lastTab = () => {
    this.activeTab(this.limitTabsIndex);
  };

  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex;
    this.updateUI();
  }

  onKeyDown = (event) => {
    const { code, metaKey } = event;
    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code];

    const isMacHomeKey = metaKey && code === "ArrowLeft";
    if (isMacHomeKey) {
      this.firstTab();
      return;
    }

    const isMacEndKey = metaKey && code === "ArrowRigth";
    if (isMacEndKey) {
      this.lastTab();
      return;
    }

    action?.();
  };

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener("click", () => this.onButtonClick(index));
    });

    this.rootElement.addEventListener("keydown", this.onKeyDown);
  }
}

class TabsCollectiion {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element);
    });
  }
}

export default TabsCollectiion;
