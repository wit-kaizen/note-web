import IndexedDB from './indexed-db.js';

IndexedDB.openDB('kaizen', 'notes', 1);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: function(callback) {
    // 延迟2s 因为还没打开
    setTimeout(() => {
      IndexedDB.searchAll('notes', result => {
        result.sort((a,b) => b.createAt - a.createAt)
        callback(result);
      })
    }, 2000)
  },

  add(item, callback) {
    IndexedDB.add('notes', item, callback);
  },
  update(item, callback) {
    IndexedDB.update('notes', item, callback);
  },
  delete(id, callback) {
    IndexedDB.delete('notes', id, callback);
  },
}