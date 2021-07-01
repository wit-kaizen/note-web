class EventEmitter {
  m = {}

  listen(name, handler) {
    this.m[name] = this.m[name] || []
    this.m[name].push(handler)
  }
  emit(name, data) {
    if (this.m[name]) {
      this.m[name].forEach((h) => {
        h(data)
      })
    }
  }
}
export default EventEmitter
