// Define the custom element class and use PascalCase for the class name
class TestComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "Hi I am a custom element created using Web Components!";
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

// Register the custom element and use kebob-case for the tag name
customElements.define("test-component", TestComponent);