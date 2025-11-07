class BaseComponent {
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error("Base component is a abstract class");
    }
  }

  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop];
      },

      set: (target, prop, newValue) => {
        const oldValue = target[prop];
        target[prop] = newValue;
        if (newValue !== oldValue) {
          this.updateUI();
        }
        return true;
      },
    });
  }

  updateUI() {
    throw new Error("UpdateUI undefined");
  }
}

export default BaseComponent;
