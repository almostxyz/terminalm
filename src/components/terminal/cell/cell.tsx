type Props = {
  symbol: string
  current: boolean
}

const renderSymbol = (symbol: string) => {
  if (symbol === '\n') {
    return '↴'
  }
  return symbol
}

export const Cell = (props: Props) => {
  return <div classList={{
    'whitespace-pre': true,
    'text-white bg-gray-500': props.current
  }}>
    {renderSymbol(props.symbol)}
  </div>
}
