import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'


@customElement('root-el')
export class App extends LitElement {

  render() {
    return html`
      <div>
        <h1>Dropdown</h1>
        <dropdown-el position="bottom">
          <dropdown-item @click=${()=>{console.log('item 1 clicked')}}>Item 1</dropdown-item>
          <dropdown-item href="#item-2">Item 2</dropdown-item>
          <dropdown-item href="#item-3" active="true">Item 3 active</dropdown-item>
          <dropdown-item href="/item-4">Item 4</dropdown-item>
          <dropdown-item disabled="true">Item 5 disabled</dropdown-item>
        </dropdown-el>
      </div>
    `
  }

  static styles = css`
    :host {
      padding: 1rem;
      margin: auto;
      text-align: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'root-el': App,
  }
}
