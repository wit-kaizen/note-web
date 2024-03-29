var db: any = null
const IndexedDB = {
  indexedDB: window.indexedDB,

  openDB(dbname: string, objectStoreName: string, version: number) {
    var request = this.indexedDB.open(dbname, version || 1)

    request.onerror = function (event: any) {
      console.log('IndexedDB数据库打开错误')
    }

    request.onsuccess = function (event: any) {
      db = event.target.result
      // if (callback && typeof callback === 'function') {
      //   callback(db)
      // }
      if (db != null) {
        console.log('数据库打开成功')
      }
    }

    request.onupgradeneeded = function (event: any) {
      console.log('数据库版本变化')
      console.log('创建数据库' + dbname)
      db = event.target.result

      if (!db.objectStoreNames.contains(objectStoreName)) {
        // 创建对象仓库，并设置主键自增
        var objectStore = db.createObjectStore(objectStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        })

        // 创建索引（根据需要创建）
        objectStore.createIndex('createAt', 'createAt', {
          unique: true,
        })
        objectStore.createIndex('category', 'category', {
          unique: false,
        })
      }
    }

    return request
  },

  add(objectStoreName: string, argument: any, callback: Function) {
    if (db != null) {
      // console.log(db, argument)
      // 执行事务，添加数据到对象仓库（表）
      const { id, ...item } = argument
      var request = db
        .transaction([objectStoreName], 'readwrite')
        .objectStore(objectStoreName)
        .add(item)

      request.onsuccess = function (event: any) {
        // console.log('数据写入成功', event: any);
        callback(event.target.result)
      }

      request.onerror = function (event: any) {
        console.log('数据写入失败')
      }
    }
  },
  foreach: function (objectStoreName: string) {
    if (db != null) {
      // console.log(db)

      // 执行事务，从对象仓库（表）中获取所有数据
      var request = db
        .transaction([objectStoreName], 'readwrite')
        .objectStore(objectStoreName)
        .openCursor()

      // 数据获取失败
      request.onerror = function (event: any) {
        console.log('事务失败')
      }

      //数据获取成功
      request.onsuccess = function (event: any) {
        let cursor = request.result
        if (cursor) {
          // 遍历打印所有数据
          console.log(cursor)
          console.log(cursor.key)
          console.log(cursor.value)
          cursor.continue()
        } else {
          console.log('未获得数据记录')
        }
      }
    }
  },

  searchAll: function (
    objectStoreName: string,
    callback: Function /*, index, data*/,
  ) {
    if (db != null) {
      // console.log(db)

      // 执行事务，从对象仓库（表）中获取所有数据
      var request = db
        .transaction([objectStoreName], 'readonly')
        .objectStore(objectStoreName)
        .getAll() //.index(index).getAll(data)

      // 数据获取失败
      request.onerror = function (event: any) {
        console.log('事务失败')
      }

      //数据获取成功
      request.onsuccess = function (event: any) {
        if (request.result) {
          // 遍历打印所有数据
          // console.log(request.result)
          // console.log("callback, result:", request.result)
          callback(request.result)
        } else {
          console.log('未获得数据记录')
        }
      }
    }
  },

  delete(objectStoreName: string, id: number, callback: Function) {
    if (db != null) {
      // console.log(db)

      // 执行事务，从对象仓库（表）中获取所有数据
      var request = db
        .transaction([objectStoreName], 'readwrite')
        .objectStore(objectStoreName)
        .delete(id)

      // 数据获取失败
      request.onerror = function (event: any) {
        console.log('事务失败')
      }

      //数据获取成功
      request.onsuccess = function (event: any) {
        callback()
        if (request.result) {
          // 遍历打印所有数据
          console.log(request.result)
        } else {
          console.log('未获得数据记录')
        }
      }
    }
  },

  update: function (
    objectStoreName: string,
    argument: any,
    callback: Function,
  ) {
    if (db != null) {
      // console.log(db)

      // 执行事务，添加数据到对象仓库（表）
      var request = db
        .transaction([objectStoreName], 'readwrite')
        .objectStore(objectStoreName)
        .put(argument)

      request.onsuccess = function (event: any) {
        callback()
        console.log('数据更新成功')
      }

      request.onerror = function (event: any) {
        console.log('数据更新失败')
      }
    }
  },
}

export default IndexedDB
