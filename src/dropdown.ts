import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { state } from 'lit/decorators.js';


enum DropdownPositions {
  top='top',
  left='left',
  right='right',
  bottom='bottom',
}

/**
 * Dropdown element.
 *
 * @slot - Slot for the dropdown elements. Dropdown-item should be used as the child element.
 */
@customElement('dropdown-el')
export class Dropdown extends LitElement {

  /**
   * The label for the dropdown button.
   * Default value: Dropdown
   */
  @property({type: String})
  label = 'Dropdown'

  /** 
   * The position of the dropdown relative to the button.
   * Default value: bottom
  */
  @property({type: DropdownPositions})
  position = DropdownPositions.bottom

  @state()
  isDropdownOpen: boolean = false;

  _openDropdown = () : void => {
    this.isDropdownOpen = true
  }

  _handleClick = (event: Event) : void => {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  _handleOutsideClick = (event: Event) : void => {
    if (!event.composedPath().includes(this)) {
      this.isDropdownOpen = false;
    }
  }

  _closeDropdown = () => {
    this.isDropdownOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this._handleOutsideClick);
    super.disconnectedCallback();
  }



  render() {
    const classes = {
      open: this.isDropdownOpen,
      'position-top': this.position === DropdownPositions.top,
      'position-bottom': this.position === DropdownPositions.bottom,
      'position-left': this.position === DropdownPositions.left,
      'position-right': this.position === DropdownPositions.right
    };
    return html`
      <div>
        <button class="dropdown-button button" @click=${this._handleClick}>
          ${this.label}
        </button>
        <div class="dropdown-content ${classMap(classes)}">
          <slot @click=${this._closeDropdown}></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }
    .dropdown-content {
      position: absolute;
      display: none;
      background: #fefefe;
      min-width: 100%;
      z-index: 1;
    }
    .dropdown-button {
      border: solid 0.1rem #0e0e0e;
      background: #fefefe;
      border-radius: 0.5rem;
    }
    .dropdown-button:hover {
      background: #09BC8A;
    }
    .open {
      display: block;
    }
    .button {
      padding: 0.5rem;
    }

    .position-bottom {
      box-shadow: -3px 2px 8px 0px rgba(0,0,0,0.2);
      top: 110%;
    }

    .position-top {
      box-shadow: -3px 2px 8px 0px rgba(0,0,0,0.2);
      bottom: 110%;
    }

    .position-left {
      box-shadow: -3px 2px 8px 0px rgba(0,0,0,0.2);
      top: 0;
      right: 105%;
    }

    .position-right {
      box-shadow: -3px 2px 8px 0px rgba(0,0,0,0.2);
      top: 0;
      left: 105%;
    }
  `;
}


/** 
 * Dropdown-item
 * Should be used as the child element of the dropdown element.
*/
@customElement('dropdown-item')
export class DropdownItem extends LitElement {

  /** 
   * Set to true if the item is active.
   * Default value: false
  */
  @property({type: Boolean, attribute: "active"})
  isActive = false

  /** 
   * Set to false if the item is disabled.
   * Default value: false
  */
  @property({type: Boolean, attribute: "disabled"})
  isDisabled = false

  /** 
   * Href specifies the url the item links to. Is set, an <a> tag will be rendered.
   * Default value: null
  */
  @property({type: String, attribute: "href"})
  href = null

  render() {
    const classes = {active: this.isActive, disabled: this.isDisabled}
    return this.href ? html`
      <a href=${this.href}>
        <div class="item ${classMap(classes)}">
          <slot></slot>
        </div>
      </a>
    ` : html`
      <div class="item ${classMap(classes)}">
        <slot></slot>
      </div>
    `
  }

  static styles = css`
    a {
      text-decoration: none;
      color: inherit;
    }
    .item {
      padding: 0.5rem 1rem;
      text-align: left;
      text-wrap: nowrap;
      cursor: pointer;
    }
    .active {
      background-color: #09BC8A;
    }
    .disabled {
      background-color: #A7CDBD;
      color: grey;
      pointer-events: none;
    }
    .item:hover {
      background-color: #09BC8A;
    }
    .item:active {
      background-color: #09BC8A;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'dropdown-el': Dropdown,
    'dropdown-item': DropdownItem
  }
}
