function editor() {
  let caretIndex = 0
  let text = ''

  return {
    textBeforeCaret() {},
    textAfterCaret() {},
    generateHtml() {
      // returns text with html carot between textBefore | textAfter
    },
    deleteChar() {},
    addChar(c) {},
    moveLeft() {},
    moveRight() {},
  }
}

function updateHTML() {}

function init() {
  editor()
}

init()

/* 
 Hello there <span class='curosr-placeholder'>|</span>, how you doing.
*/
