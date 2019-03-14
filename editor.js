function setupEditor() {
  const state = {
    caretIndex: 0,
    text: '',
  }
  const utils = {
    isLineBreak(text) {
      return /<br>\r/.test(text.substr(-5))
    },
    textBeforeCaret() {
      if (state.caretIndex === 0) {
        return ''
      } else {
        return state.text.substring(0, state.caretIndex)
      }
    },
    textAfterCaret() {
      if (state.caretIndex === state.text.length) {
        return ''
      } else {
        return state.text.substring(state.caretIndex)
      }
    },
  }
  return {
    ...movingLeft(state),
    ...movingRight(state),
    ...userType(state, { ...utils }),
    ...genHtml(state, { ...utils }),
    ...removingChar(state, { ...utils }),
  }
}

function removingChar(state, utils) {
  return {
    deleteChar: (i = 1) => {
      const leftTxt = utils.textBeforeCaret()
      const rightTxt = utils.textAfterCaret()
      if (leftTxt.length > 0) {
        if (utils.isLineBreak(leftTxt)) {
          i = 5
        }
        state.text = leftTxt.substring(0, leftTxt.length - i) + rightTxt
        state.caretIndex--
      }
    },
  }
}

function userType(state, utils) {
  return {
    addChar: (char, i = 1) => {
      const usertext = `${utils.textBeforeCaret()}${char}${utils.textAfterCaret()}`
      state.text = usertext
      state.caretIndex = state.caretIndex + i
    },
  }
}

function genHtml(state, utils) {
  return {
    generateHtml: () => {
      const cursor = "<span class='cursor-placeholder'>|</span>"
      const html = `${utils.textBeforeCaret()}${cursor}${utils.textAfterCaret()}`
      return html
    },
  }
}

function movingRight(state) {
  return {
    moveRight: () =>
      Boolean(state.caretIndex < state.text.length ? state.caretIndex++ : ''),
  }
}

function movingLeft(state) {
  return {
    moveLeft: () => Boolean(state.caretIndex > 0 ? state.caretIndex-- : ''),
  }
}

const editor = setupEditor()
const cursor = document.querySelector('.blinking-cursor')

const updateHtml = function updateHtml() {
  const html = editor.generateHtml()
  const editorNode = document.querySelector('#editor')
  editorNode.innerHTML = `${html}`

  const cursorPos = document.querySelector('.cursor-placeholder')

  const { top, left } = cursorPos.getBoundingClientRect()
  const cursorHeight = document.querySelector('.cursor-placeholder')
  const delta = cursorHeight.clientHeight / 5.0

  cursor.style.top = top
  cursor.style.left = left - delta
}

updateHtml()

addEventListener('keypress', e => {
  const c = String.fromCharCode(e.which)
  editor.addChar(c)
  updateHtml()
})

addEventListener('keydown', e => {
  switch (e.which) {
    // Enter
    case 13:
      editor.addChar('<br>', 5)
      break
    // Backspace
    case 8:
      editor.deleteChar()
      break
    // Arroy left
    case 37:
      editor.moveLeft()
      break
    case 39:
      editor.moveRight()
      break
    default:
    // not needed
  }
  updateHtml()
})
