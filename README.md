# Message Box Web Component

## Description

This is a Web Component's custom element to implement message box in HTML, CSS, and Javascript.

I didn't use any preprocessors, libraries, and frameworks in my Javascript code, so that I could use this dialog box wherever I want.

I used custom element to create my own dialog box, and shadow DOM for me to style my component without affecting any of the styles outside the shadow DOM. Although, I used a class name, I think that might be unique.

Because I used Web Components, Promise, async/await to implement the dialog box, this function might not work on older browsers.

The color scheme of dialog box can be light or dark depends on the color scheme of your system.

## Installation

I used **Typescript** transpiler in this project. These are needed to transpile the Typescript codes into Javascript codes.

1. First, to be able to use these libraries, **NodeJS** is required.
2. Install packages by running the command below on your Terminal:
```
yarn
```
3. If the installation is successful, run the command below on your Terminal:
```
yarn build
```
4. If building is successful, *dist* folder will be created. (By default I also included the folder)

## Usage

### On HTML code

Import the **ti-msg-box.js** file on your HTML file to get started.

```HTML
<script src="<directory-goes-here>/ti-msg-box-js"></script>
```

After the Javascript is imported, you may use Web Component like the codes below.

```HTML
<ti-msg-box data-title="Title goes here." data-content="Content goes here." data-type="alert"></ti-msg-box>
```

Message box is a custom element, so the ```<ti-msg-box>``` tag may just be explicitly called from HTML source code.

### On Javascript code

```Javascript
// Call the alert box
await TiMsgBox.alert("Content goes here.", "Title goes here. This is optional");

// Call the confirm box
await TiMsgBox.confirm("Content goes here.", "Title goes here. This is optional");

// Call the prompt box
await TiMsgBox.prompt("Content goes here.", "Title goes here. This is optional");
```

Adding ```await``` before calling the ```TiMsgBox.alert()```, ```TiMsgBox.confirm()```, ```TiMsgBox.prompt()``` function is important, so that the processes below the message box will not be executed, unless there was an action on the message box.

Keep note that you can't use ```await``` if the message box function call is not inside an ```async``` function. Below is the example:

```Javascript
// Inside a function
async function funcName() {
  await TiMsgBox.alert("Content goes here.");
  
  // Do another process here
}

// Inside an event function
elm.addEventListener("click", async function() {
  await TiMsgBox.alert("Content goes here.");
  
  // Do another process here
});
```

## Demo

Click on this link [Alert, Confirm, Prompt dialog box (modal) in Web Components](https://codepen.io/takaneichinose/pen/LYRrQmW) to see the actual demo of this component.
