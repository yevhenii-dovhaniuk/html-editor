# HTML Editor
This is simple HTML editor that provides WYSIWYG capabilities.

> WYSIWYG stands for "What you see is what you get"

## Features
- source code side-by-side
- ability to paste any preformatted text (tag creation is handled by the browser)
- Cmd/Ctrl + Z works for text pasting but not for text editing
- Bold, Italic, Strikethrough and Paragraph capabilities are supported by far

## Run
```shell
npm start
```

## Test
```shell
npm test
```

## Contributing
The heart of this application lies in `src/HTMLEditor/HTMLEditor.tsx` and `src/HTMLEditor/EditorControls/EditorControls.tsx` files. Feel free to fork, clone or contribute.

The selection is maintained using [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection).

The live editing is achieved via [contentEditable](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/contenteditable) attribute