# Message Box Web Component

## Description

Thas is a Web Component's custom element to implement message box in HTML, CSS, and Javascript.

I didn't use any preprocessors, libraries, and frameworks in my Javascript code, so that I could use this dialog box wherever I want.

I used custom element to create my own dialog box, and shadow DOM for me to style my component without affecting any of the styles outside the shadow DOM. Although, I used a class name, I think that might be unique.

Because I used Web Components, Promise, async/await to implement the dialog box, this function might not work on older browsers.

The color scheme of dialog box can be light or dark depends on the color scheme of your system.

## Usage

### On HTML code

```HTML
<ti-msg-box data-title="Title goes here." data-content="Content goes here." data-type="alert" />
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
