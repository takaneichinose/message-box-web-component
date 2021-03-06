/**
 * Message Box web component
 */
class TiMsgBoxElement extends HTMLElement {
  /**
   * Constructor
   * build() method will be called from here
   */
  constructor() {
    super();
    
    this.build();
  }
  
  /**
   * Build the web component
   */
  build(): void {
    this.attachShadow({ mode: "open" });
    
    //---------- Build the modal window
    const modalWindow: HTMLDivElement = document.createElement("div");
    
    modalWindow.classList.add("ti-msg-box-modal");
    
    //---------- Build the dialog window
    const dialogElm: HTMLDivElement = document.createElement("div");
    const dialogHeaderElm: HTMLDivElement = document.createElement("div");
    const dialogBodyElm: HTMLDivElement = document.createElement("div");
    const dialogFooterElm: HTMLDivElement = document.createElement("div");
    
    dialogElm.classList.add("ti-msg-box-dialog");
    dialogHeaderElm.classList.add("ti-msg-box-dialog-header");
    dialogBodyElm.classList.add("ti-msg-box-dialog-body");
    dialogFooterElm.classList.add("ti-msg-box-dialog-footer");
    
    dialogBodyElm.append(document.createElement("p"));
    
    dialogElm.append(dialogHeaderElm, dialogBodyElm, dialogFooterElm);
    
    modalWindow.append(dialogElm);
    
    //---------- Styling
    const style: HTMLStyleElement = document.createElement("style");
    
    style.textContent = this.setStyle();
    
    this.shadowRoot.append(style, modalWindow);
    
    //---------- Set default
    this.setDefault();
  }
  
  /**
   * Create the styling
   */
  setStyle(): string {
    const padding: string = "1em";
    
    return `
      .ti-msg-box-modal {
        font-family: inherit;
        font-size: inherit;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
        position: fixed;
        top: 0;
        left: 0;
      }
      
      .ti-msg-box-dialog {
        width: calc(100% - 2em);
        max-width: 400px;
        overflow: hidden;
        box-sizing: border-box;
        box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.5);
        border-radius: 0.3em;
        animation: msg-box-dialog-show 265ms cubic-bezier(0.18, 0.89, 0.32, 1.28)
      }
      
      .ti-msg-box-dialog.ti-msg-box-dialog-hide {
        opacity: 0;
        animation: msg-box-dialog-hide 265ms ease-in;
      }
      
      @keyframes msg-box-dialog-show {
        0% {
          opacity: 0;
          transform: translateY(-100%);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes msg-box-dialog-hide {
        0% {
          opacity: 1;
          transform: translateX(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-50%);
        }
      }
      
      .ti-msg-box-dialog-header {
        color: inherit;
        background-color: rgba(0, 0, 0, 0.05);
        padding: ${padding};
        border-bottom: solid 1px rgba(0, 0, 0, 0.15);
      }
      
      .ti-msg-box-dialog-body {
        color: inherit;
        padding: ${padding};
      }
      
      .ti-msg-box-dialog-body > p {
        color: inherit;
        padding: 0;
        margin: 0;
      }
      
      .ti-msg-box-dialog-footer {
        color: inherit;
        display: flex;
        justify-content: stretch;
      }
      
      .ti-msg-box-dialog-button {
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        background-color: rgba(0, 0, 0, 0);
        width: 100%;
        padding: 1em;
        border: none;
        border-top: solid 1px rgba(0, 0, 0, 0.15);
        outline: 0;
        border-radius: 0px;
        transition: background-color 225ms ease-out;
      }
      
      .ti-msg-box-dialog-button:focus {
        background-color: rgba(0, 0, 0, 0.05);
      }
      
      .ti-msg-box-dialog-button:active {
        background-color: rgba(0, 0, 0, 0.15);
      }
      
      .ti-msg-box-dialog-textbox {
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        width: 100%;
        padding: 0.5em;
        border: solid 1px rgba(0, 0, 0, 0.15);
        margin-top: ${padding};
        outline: 0;
        box-sizing: border-box;
        border-radius: 0;
        box-shadow: 0 0 0 0 rgba(13, 134, 255, 0.5);
        transition: box-shadow 125ms ease-out, border 125ms ease-out;
      }
      
      .ti-msg-box-dialog-textbox:focus {
        border: solid 1px rgba(13, 134, 255, 0.8);
        box-shadow: 0 0 0.1em 0.2em rgba(13, 134, 255, 0.5);
      }
      
      @media (prefers-color-scheme: dark) {
        .ti-msg-box-modal {
          background-color: rgba(31, 31, 31, 0.5);
        }
        
        .ti-msg-box-dialog {
          color: #f2f2f2;
          background-color: #464646;
        }
        
        .ti-msg-box-dialog-textbox {
          background-color: #2f2f2f;
        }
      }
      
      @media (prefers-color-scheme: light) {
        .ti-msg-box-modal {
          background-color: rgba(221, 221, 221, 0.5);
        }
        
        .ti-msg-box-dialog {
          color: #101010;
          background-color: #ffffff;
        }
      }
    `;
  }
  
  /**
   * Set the default value of the dialog box
   */
  setDefault(): void {
    let content: string = this.dataset.content;
    let title: string = this.dataset.title;
    let type: string = this.dataset.type;
    
    if (typeof content === "undefined" || typeof type === "undefined") {
      // Dialog will be built if these two datatypes are existing
      // as HTML attributes. This is to prevent calling the dialog
      // builders twice when the dialog was call from javascript.
      
      return;
    }
    
    if (typeof title === "undefined") {
      title = null;
    }
    
    switch (type) {
      case "alert":
        this.setAlert(content, title);
        
        break;
      case "confirm":
        this.setConfirm(content, title);
        
        break;
      case "prompt":
        this.setPrompt(content, title);
        
        break;
    }
  }
  
  /**
   * Put the title and the content of the dialog box.
   */
  createDialog(content: string, title: string): void {
    const dialogHeaderElm: HTMLDivElement = this.shadowRoot.querySelector(".ti-msg-box-dialog-header");
    const dialogBodyElm: HTMLDivElement = this.shadowRoot.querySelector(".ti-msg-box-dialog-body > p");
    
    dialogBodyElm.innerHTML = content;
    
    if (title === null) {
      dialogHeaderElm.remove();
    }
    else {
      dialogHeaderElm.innerHTML = title;
    }
  }
  
  /**
   * Execute "animationend" event of the dialog, then dispose
   */
  disposeDialog(): void {
    const self: TiMsgBoxElement = this;
    const dialogElm: HTMLDivElement = self.shadowRoot.querySelector(".ti-msg-box-dialog");
    
    dialogElm.classList.add("ti-msg-box-dialog-hide");
    
    dialogElm.addEventListener("animationend", function dialogElmAnimationEnd(evt: AnimationEvent): void {
      if (evt.animationName === "msg-box-dialog-hide") {
        dialogElm.removeEventListener("animationend", dialogElmAnimationEnd);
        
        self.remove();
      }
    });
  }
  
  /**
   * Creates the alert dialog element
   */
  setAlert(content: string, title: string): Promise<boolean> {
    const self: TiMsgBoxElement = this;
    
    self.createDialog(content, title);
    
    const dialogFooterElm: HTMLDivElement = self.shadowRoot.querySelector(".ti-msg-box-dialog-footer");
    const dialogConfirmBtn: HTMLButtonElement = document.createElement("button");
    
    dialogConfirmBtn.classList.add("ti-msg-box-dialog-button");
    dialogConfirmBtn.innerText = "OK";
    
    dialogFooterElm.append(dialogConfirmBtn);
    
    dialogConfirmBtn.focus();
    
    return new Promise(function(resolve): void {
      dialogConfirmBtn.addEventListener("click", function dialogConfirmBtnClick(): void {
        dialogConfirmBtn.removeEventListener("click", dialogConfirmBtnClick);
        
        self.disposeDialog();
        
        resolve(true);
      });
    });
  }
  
  /**
   * Creates the confirm dialog element
   */
  setConfirm(content: string, title: string): Promise<boolean> {
    const self: TiMsgBoxElement = this;
    
    self.createDialog(content, title);
    
    const dialogFooterElm: HTMLDivElement = self.shadowRoot.querySelector(".ti-msg-box-dialog-footer");
    const dialogCancelBtn: HTMLButtonElement = document.createElement("button");
    const dialogConfirmBtn: HTMLButtonElement = document.createElement("button");
    
    dialogCancelBtn.classList.add("ti-msg-box-dialog-button");
    dialogCancelBtn.innerText = "Cancel";
    
    dialogConfirmBtn.classList.add("ti-msg-box-dialog-button");
    dialogConfirmBtn.innerText = "OK";
    
    dialogFooterElm.append(dialogCancelBtn, dialogConfirmBtn);
    
    dialogCancelBtn.focus();
    
    return new Promise(function(resolve): void {
      dialogCancelBtn.addEventListener("click", function dialogCancelBtnClick(): void {
        this.removeEventListener("click", dialogCancelBtnClick);
        
        self.disposeDialog();
        
        resolve(false);
      });
      
      dialogConfirmBtn.addEventListener("click", function dialogCancelBtnClick(): void {
        this.removeEventListener("click", dialogCancelBtnClick);
        
        self.disposeDialog();
        
        resolve(true);
      });
    });
  }
  
  /**
   * Creates the prompt dialog element
   */
  setPrompt(content: string, title: string): Promise<string> {
    const self: TiMsgBoxElement = this;
    
    self.createDialog(content, title);
    
    // Create Textbox and put into the dialog body.
    const dialogBodyElm: HTMLDivElement = self.shadowRoot.querySelector(".ti-msg-box-dialog-body");
    const dialogMessageTextBoxContainer: HTMLParagraphElement = document.createElement("p");
    const dialogMessageTextBox: HTMLInputElement = document.createElement("input");
    
    dialogMessageTextBox.classList.add("ti-msg-box-dialog-textbox");
    dialogMessageTextBox.type = "text";
    
    dialogMessageTextBoxContainer.append(dialogMessageTextBox);
    
    dialogBodyElm.append(dialogMessageTextBoxContainer);
    
    // Create buttons, and put into the dialog footer.
    const dialogFooterElm: HTMLDivElement = self.shadowRoot.querySelector(".ti-msg-box-dialog-footer");
    const dialogCancelBtn: HTMLButtonElement = document.createElement("button");
    const dialogConfirmBtn: HTMLButtonElement = document.createElement("button");
    
    dialogCancelBtn.classList.add("ti-msg-box-dialog-button");
    dialogCancelBtn.innerText = "Cancel";
    
    dialogConfirmBtn.classList.add("ti-msg-box-dialog-button");
    dialogConfirmBtn.innerText = "OK";
    
    dialogFooterElm.append(dialogCancelBtn, dialogConfirmBtn);
    
    dialogMessageTextBox.focus();
    
    // Prompt message textbox KeyPress event
    function dialogMessageTextBoxKeyPress(evt: KeyboardEvent): void {
      if (evt.key === "Enter") {
        // If Enter key has been pressed

        dialogConfirmBtn.click();
      }
    }
    
    dialogMessageTextBox.addEventListener("keypress", dialogMessageTextBoxKeyPress);
    
    return new Promise(function(resolve): void {
      dialogCancelBtn.addEventListener("click", function dialogCancelBtnClick(): void {
        this.removeEventListener("click", dialogCancelBtnClick);
        
        dialogMessageTextBox.removeEventListener("keypress", dialogMessageTextBoxKeyPress);
        
        self.disposeDialog();
        
        resolve(null);
      });
      
      dialogConfirmBtn.addEventListener("click", function dialogCancelBtnClick(): void {
        this.removeEventListener("click", dialogCancelBtnClick);
        
        dialogMessageTextBox.removeEventListener("keypress", dialogMessageTextBoxKeyPress);
        
        self.disposeDialog();
        
        resolve(dialogMessageTextBox.value);
      });
    });
  }
}

// Define the custom element as a web component
customElements.define("ti-msg-box", TiMsgBoxElement);

/**
 * Show message box
 */
class TiMsgBox {
  static async alert(content: string, title: string = null): Promise<boolean> {
    const dialogBox: TiMsgBoxElement = document.createElement("ti-msg-box") as TiMsgBoxElement;
    
    document.body.appendChild(dialogBox);

    return await dialogBox.setAlert(content, title);
  }
  
  static async confirm(content: string, title: string = null): Promise<boolean> {
    const dialogBox: TiMsgBoxElement = document.createElement("ti-msg-box") as TiMsgBoxElement;
    
    document.body.appendChild(dialogBox);

    return await dialogBox.setConfirm(content, title);
  }
  
  static async prompt(content: string, title: string = null): Promise<string> {
    const dialogBox: TiMsgBoxElement = document.createElement("ti-msg-box") as TiMsgBoxElement;
    
    document.body.appendChild(dialogBox);

    return await dialogBox.setPrompt(content, title);
  }
}
