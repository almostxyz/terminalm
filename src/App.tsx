import { Component, createEffect, createSignal, For } from 'solid-js';

import './App.module.css';
import { Row } from './components';

const MOVEMENT_KEYS = {
  UP: ['ArrowUp', 'k'],
  DOWN: ['ArrowDown', 'j'],
  LEFT: ['ArrowLeft', 'h'],
  RIGHT: ['ArrowRight', 'l'],
}

const App: Component = () => {
  const [text, setText] = createSignal(`\
      import type { Component } from 'solid-js';

      import logo from './logo.svg';
      import styles from './App.module.css';

      const App: Component = () => {
      const [text, setText] = createSignal("")
      return (
          <div class={styles.App}>

          </div>
          );
      };

      export default App;
  `)
  const [position, setPosition] = createSignal<[number, number]>([0, 0])

  const splittedText = () => text().split('\n').map((t) => `${t}\n`)
  const rowByIndex = (index: number) => splittedText()[index]

  /*
      FIXME:
        [x] на [0, 0] нажать влево, уйдешь в [0, -1]
        [х] если текущая колонка больше, чем символов в строке (после вертикального)
            передвижения, то нужно передвинуться налево на х символов прежде чем
            мы попадем на нужные (не уверен что пофиксил)

      TODO: рефактор
  */
  const handleKeyDown = (e: KeyboardEvent) => {
    const [row, column] = position()
      if (MOVEMENT_KEYS.RIGHT.includes(e.key)) {
        if (column >= rowByIndex(row).length - 1 && row !== splittedText().length - 1) {
          return setPosition([row + 1, 0])
        }
        return setPosition([row, column + 1])
      }
      if (MOVEMENT_KEYS.LEFT.includes(e.key)) {
        if (column === 0 && row === 0) {
          return
        }
        let newColumn = column - 1
        let newRow = row
        const length = rowByIndex(row).length
        if (newColumn >= length - 1) {
          newColumn = length - 1
        }
        if (newColumn === 0) {
          newColumn = rowByIndex(row - 1).length - 1
          newRow = row - 1
        }
        return setPosition([newRow, newColumn])
      }
      if (MOVEMENT_KEYS.UP.includes(e.key)) {
        if (row === 0) {
          return
        }
        return setPosition([row - 1, column])
      }
      if (MOVEMENT_KEYS.DOWN.includes(e.key)) {
        if (row === splittedText().length - 1) {
          return
        }
        return setPosition([row + 1, column])
      }
  }

  let textarea: HTMLTextAreaElement | undefined = undefined

  return (
    <div class="bg-gray-900 h-screen text-center" onClick={() => textarea?.focus()}>
      current position: {position()}
      <For each={splittedText()}>
      {(row, index) => {
        console.log(position())
        return <Row column={index() === position()[0] ? position()[1] : undefined} row={row}/>
      }}
      </For>
      <textarea ref={textarea} onKeyDown={handleKeyDown}/>
    </div>
  );
};

export default App;
