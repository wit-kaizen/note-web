const Setting = {
  get(name: string) {
    return localStorage.getItem('note_' + name)
  },
  set(name: string, value: any) {
    return localStorage.setItem('note_' + name, value)
  },
}

export default Setting
