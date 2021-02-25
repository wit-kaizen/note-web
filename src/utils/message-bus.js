// import EventEmitter from 'eventemitter3';

class EventEmitter {
  constructor() {
    this.m = {}
  }

  addListener(name, handler) {
    this.m[name] = this.m[name] || [];
    this.m[name].push(handler);
  }
  emit(name, data) {
    if (this.m[name]) {
      this.m[name].forEach(h => {
        h(data);
      })
    }
  }0
}

if (!window.mb) {
  window.mb = new EventEmitter();
}
