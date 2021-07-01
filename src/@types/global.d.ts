interface EventEmitter {
  listen(name: string, callback: Function)
  emit(name: string, param: any)
}

interface Window {
  mb: EventEmitter
}
