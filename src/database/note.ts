import IndexedDB from './indexed-db'
import Note from '../model/note'

IndexedDB.openDB('kaizen', 'notes', 1)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: function (callback: Function) {
    // 延迟2s 因为还没打开
    setTimeout(() => {
      IndexedDB.searchAll('notes', (result: Note[]) => {
        result.sort((a, b) => b.createAt - a.createAt)
        callback(result)
      })
    }, 2000)
  },

  add(item: Note, callback: Function) {
    IndexedDB.add('notes', item, callback)
  },
  update(item: Note, callback: Function) {
    IndexedDB.update('notes', item, callback)
  },
  delete(id: number, callback: Function) {
    IndexedDB.delete('notes', id, callback)
  },
}
