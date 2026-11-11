import { MENU } from '../timeline.js'

/* timing helpers → inline CSS custom properties */
export const at = (delay, dur) => ({ '--d': `${delay}ms`, '--dur': `${dur}ms` })
const itemAt = (row) => at(MENU.items + row * MENU.itemsStagger, MENU.itemsDur)
const smallAt = () => at(MENU.small, MENU.smallDur)

/* Each section gets its own row counter so all sections write in parallel. */
export function rowCounter() {
  let i = 0
  return () => i++
}

/* Red title + red underline */
export function Heading({ title, aside }) {
  return (
    <div className="heading">
      <h2 className="heading__title write" style={at(MENU.headings, MENU.headingsDur)}>
        <span>{title}</span>
        {aside && (
          <span className="heading__aside">
            {aside.label} <b>{aside.size}</b>
          </span>
        )}
      </h2>
      <div className="heading__rule write" style={at(MENU.lines, MENU.linesDur)} />
    </div>
  )
}

/* Sub-title inside a section, written like the items */
export function SubHeading({ text, extra, row, className = '' }) {
  return (
    <h3 className={`subheading write ${className}`} style={itemAt(row)}>
      {text}
      {extra && <span className="subheading__extra"> {extra}</span>}
    </h3>
  )
}

export function Item({ item, row, numbered = true }) {
  return (
    <li className="item">
      <div className="item__line write" style={itemAt(row)}>
        {numbered && <span className="item__num">{item.n}</span>}
        <span className="item__name">
          {item.name}
          {item.extra && <span className="item__extra"> {item.extra}</span>}
        </span>
        <span className="item__leader" aria-hidden="true" />
        <span className="item__price">{item.price}</span>
      </div>
      {item.desc && (
        <p className={`item__desc appear ${numbered ? '' : 'item__desc--flush'}`} style={smallAt()}>
          {item.desc}
        </p>
      )}
    </li>
  )
}

export function ItemList({ items, row, numbered = true, className = '' }) {
  return (
    <ul className={`items ${className}`}>
      {items.map((it, i) => (
        <Item key={i} item={it} row={row()} numbered={numbered} />
      ))}
    </ul>
  )
}

export function Notes({ notes, className = '' }) {
  return (
    <div className={`notes appear ${className}`} style={smallAt()}>
      {notes.map((n, i) => {
        const text = typeof n === 'string' ? n : n.text
        const indent = typeof n === 'object' && n.indent
        return (
          <p key={i} className={indent ? 'notes__indent' : undefined}>
            {text}
          </p>
        )
      })}
    </div>
  )
}
