var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TiMsgBoxElement extends HTMLElement {
    constructor() {
        super();
        this.build();
    }
    build() {
        this.attachShadow({ mode: "open" });
        const modalWindow = document.createElement("div");
        modalWindow.classList.add("ti-msg-box-modal");
        const dialogElm = document.createElement("div");
        const dialogHeaderElm = document.createElement("div");
        const dialogBodyElm = document.createElement("div");
        const dialogFooterElm = document.createElement("div");
        dialogElm.classList.add("ti-msg-box-dialog");
        dialogHeaderElm.classList.add("ti-msg-box-dialog-header");
        dialogBodyElm.classList.add("ti-msg-box-dialog-body");
        dialogFooterElm.classList.add("ti-msg-box-dialog-footer");
        dialogBodyElm.append(document.createElement("p"));
        dialogElm.append(dialogHeaderElm, dialogBodyElm, dialogFooterElm);
        modalWindow.append(dialogElm);
        const style = document.createElement("style");
        style.textContent = this.setStyle();
        this.shadowRoot.append(style, modalWindow);
        this.setDefault();
    }
    setStyle() {
        const padding = "1em";
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
    setDefault() {
        let content = this.dataset.content;
        let title = this.dataset.title;
        let type = this.dataset.type;
        if (typeof content === "undefined" || typeof type === "undefined") {
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
    createDialog(content, title) {
        const dialogHeaderElm = this.shadowRoot.querySelector(".ti-msg-box-dialog-header");
        const dialogBodyElm = this.shadowRoot.querySelector(".ti-msg-box-dialog-body > p");
        dialogBodyElm.innerHTML = content;
        if (title === null) {
            dialogHeaderElm.remove();
        }
        else {
            dialogHeaderElm.innerHTML = title;
        }
    }
    disposeDialog() {
        const self = this;
        const dialogElm = self.shadowRoot.querySelector(".ti-msg-box-dialog");
        dialogElm.classList.add("ti-msg-box-dialog-hide");
        dialogElm.addEventListener("animationend", function dialogElmAnimationEnd(evt) {
            if (evt.animationName === "msg-box-dialog-hide") {
                dialogElm.removeEventListener("animationend", dialogElmAnimationEnd);
                self.remove();
            }
        });
    }
    setAlert(content, title) {
        const self = this;
        self.createDialog(content, title);
        const dialogFooterElm = self.shadowRoot.querySelector(".ti-msg-box-dialog-footer");
        const dialogConfirmBtn = document.createElement("button");
        dialogConfirmBtn.classList.add("ti-msg-box-dialog-button");
        dialogConfirmBtn.innerText = "OK";
        dialogFooterElm.append(dialogConfirmBtn);
        dialogConfirmBtn.focus();
        return new Promise(function (resolve) {
            dialogConfirmBtn.addEventListener("click", function dialogConfirmBtnClick() {
                dialogConfirmBtn.removeEventListener("click", dialogConfirmBtnClick);
                self.disposeDialog();
                resolve(true);
            });
        });
    }
    setConfirm(content, title) {
        const self = this;
        self.createDialog(content, title);
        const dialogFooterElm = self.shadowRoot.querySelector(".ti-msg-box-dialog-footer");
        const dialogCancelBtn = document.createElement("button");
        const dialogConfirmBtn = document.createElement("button");
        dialogCancelBtn.classList.add("ti-msg-box-dialog-button");
        dialogCancelBtn.innerText = "Cancel";
        dialogConfirmBtn.classList.add("ti-msg-box-dialog-button");
        dialogConfirmBtn.innerText = "OK";
        dialogFooterElm.append(dialogCancelBtn, dialogConfirmBtn);
        dialogCancelBtn.focus();
        return new Promise(function (resolve) {
            dialogCancelBtn.addEventListener("click", function dialogCancelBtnClick() {
                this.removeEventListener("click", dialogCancelBtnClick);
                self.disposeDialog();
                resolve(false);
            });
            dialogConfirmBtn.addEventListener("click", function dialogCancelBtnClick() {
                this.removeEventListener("click", dialogCancelBtnClick);
                self.disposeDialog();
                resolve(true);
            });
        });
    }
    setPrompt(content, title) {
        const self = this;
        self.createDialog(content, title);
        const dialogBodyElm = self.shadowRoot.querySelector(".ti-msg-box-dialog-body");
        const dialogMessageTextBoxContainer = document.createElement("p");
        const dialogMessageTextBox = document.createElement("input");
        dialogMessageTextBox.classList.add("ti-msg-box-dialog-textbox");
        dialogMessageTextBox.type = "text";
        dialogMessageTextBoxContainer.append(dialogMessageTextBox);
        dialogBodyElm.append(dialogMessageTextBoxContainer);
        const dialogFooterElm = self.shadowRoot.querySelector(".ti-msg-box-dialog-footer");
        const dialogCancelBtn = document.createElement("button");
        const dialogConfirmBtn = document.createElement("button");
        dialogCancelBtn.classList.add("ti-msg-box-dialog-button");
        dialogCancelBtn.innerText = "Cancel";
        dialogConfirmBtn.classList.add("ti-msg-box-dialog-button");
        dialogConfirmBtn.innerText = "OK";
        dialogFooterElm.append(dialogCancelBtn, dialogConfirmBtn);
        dialogMessageTextBox.focus();
        function dialogMessageTextBoxKeyPress(evt) {
            if (evt.key === "Enter") {
                dialogConfirmBtn.click();
            }
        }
        dialogMessageTextBox.addEventListener("keypress", dialogMessageTextBoxKeyPress);
        return new Promise(function (resolve) {
            dialogCancelBtn.addEventListener("click", function dialogCancelBtnClick() {
                this.removeEventListener("click", dialogCancelBtnClick);
                dialogMessageTextBox.removeEventListener("keypress", dialogMessageTextBoxKeyPress);
                self.disposeDialog();
                resolve(null);
            });
            dialogConfirmBtn.addEventListener("click", function dialogCancelBtnClick() {
                this.removeEventListener("click", dialogCancelBtnClick);
                dialogMessageTextBox.removeEventListener("keypress", dialogMessageTextBoxKeyPress);
                self.disposeDialog();
                resolve(dialogMessageTextBox.value);
            });
        });
    }
}
customElements.define("ti-msg-box", TiMsgBoxElement);
class TiMsgBox {
    static alert(content, title = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogBox = document.createElement("ti-msg-box");
            document.body.appendChild(dialogBox);
            return yield dialogBox.setAlert(content, title);
        });
    }
    static confirm(content, title = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogBox = document.createElement("ti-msg-box");
            document.body.appendChild(dialogBox);
            return yield dialogBox.setConfirm(content, title);
        });
    }
    static prompt(content, title = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogBox = document.createElement("ti-msg-box");
            document.body.appendChild(dialogBox);
            return yield dialogBox.setPrompt(content, title);
        });
    }
}
//# sourceMappingURL=ti-msg-box.js.map