class EventEmitter {
  m: any = {}

  listen(name: string, handler: Function) {
    this.m[name] = this.m[name] || []
    this.m[name].push(handler)
  }
  emit(name: string, data: any) {
    if (this.m[name]) {
      this.m[name].forEach((h: Function) => {
        h(data)
      })
    }
  }
}
export default EventEmitter
