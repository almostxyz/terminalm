import { For } from "solid-js"
import { Cell } from "../cell/cell"

type Props = {
  row: string
  column?: number
}

const isCurrent = ({
      column,
      index,
      length
    } : {
      column?: number,
      index: number,
      length: number
    }) => {
  if (column === undefined) {
    return false
  }
  if (column > length - 1) {
    return index === length - 1
  }
  return column === index
}

/*
  TODO: группировать слова
*/
export const Row = (props: Props) => {
  return (
      <div class="flex flex-row whitespace-pre text-green-500">
      <For each={props.row.split('')} >
        {(symbol, index) => (
          <Cell
            current={isCurrent({
              column: props.column,
              index: index(),
              length: props.row.length
            })}
            symbol={symbol}
          />
        )}
      </For>
      </div>
  )
}
