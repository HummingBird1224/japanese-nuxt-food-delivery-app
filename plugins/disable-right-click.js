export default () => {
  document.oncontextmenu = () => { return false }
  document.onselectstart = () => { return false }
}
