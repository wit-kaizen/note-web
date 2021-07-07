export default class Note {
  /*
    category: Array
    content: String
    createAt: Number
    done: Boolean
  */
  id?: number
  category: string[]
  content: string
  createAt: number
  done: boolean
  constructor(category: string[], content: string, createAt: number) {
    this.category = category
    this.content = content
    this.createAt = createAt
    this.done = false
  }

  static createFromText(input: string) {
    let match = input.match(/^#(.+)#\s{1,}(\d{4}-\d{2}-\d{2})?\s?([\w\W]+)$/)
    let text = input
    let createAt = null
    let category = 'n/a'

    if (match) {
      category = match[1]
      text = match[3]
      createAt = match[2] ? match[2] : null
    }
    let time = createAt ? new Date(createAt).getTime() : new Date().getTime()

    return new Note([category], text, time)
  }
}
