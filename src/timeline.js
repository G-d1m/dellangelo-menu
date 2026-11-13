/*
 * Every timing in the site lives here (milliseconds).
 * Tweak a number, save, and Vite reloads the page.
 */

export const INTRO = {
  logoIn: 0,          // logo fades/pops in
  logoInDur: 1200,
  tagline: 1300,      // "In Wood We Trust" is written
  taglineDur: 1500,
  since: 2600,        // "~ Since 2002 ~" is written
  sinceDur: 1000,
  expand: 4000,       // text fades, logo zooms until its cream fills the screen
  expandDur: 2300,
  done: 6300,         // menu takes over
}

// Menu stage — times are relative to when a page starts playing.
export const MENU = {
  lines: 0,           // red underlines are written left → right
  linesDur: 1100,

  square: 700,        // starts before the lines finish
  squareDur: 1500,    // slides in from the left, rotates 270°
  tomatoes: 700,      // same moment as the square, from the right
  tomatoesDur: 1500,

  headings: 1100,     // red section titles, right after the lines
  headingsDur: 800,

  leaves: 2200,       // after the square/tomato period: grow from small
  leavesDur: 900,

  items: 1900,        // all other text, written row by row in every column
  itemsDur: 550,
  itemsStagger: 45,

  logo: 3700,         // pop: small → big → small
  logoDur: 800,

  small: 4500,        // descriptions & notes fade in from nothing
  smallDur: 1000,
}
export const PHONE = {
  logo: 200,          // pop
  logoDur: 800,
  square: 300,        // in from the left, 360° spin
  squareDur: 1400,
  tomatoes: 300,      // in from the right
  tomatoesDur: 1400,
  leaves: 1500,       // grow after the square lands
  leavesDur: 900,
  info: 1300,         // address / phones / hours fade in
  infoDur: 900,
  deal: 1700,         // the 10% line, a moment later

  // per section, from the moment it scrolls into view
  lines: 0,
  linesDur: 700,
  headings: 500,
  headingsDur: 600,
  items: 900,
  itemsDur: 500,
  itemsStagger: 40,
  itemsMaxRows: 14,   // long lists stop staggering after this many rows
  smallAfter: 300,    // descriptions fade in this long after the last row starts
  smallDur: 800,
}
