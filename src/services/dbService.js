(function () {
    
    'use strict'

    function dbService(dbProvider) {

        let vm = this

        vm.getById = (model, id) => {

            const schema = dbProvider.schema
            let dataBase

            return schema.connect().then((db) => {
                    dataBase = db
                    let table = db.getSchema().table(model)
                    return dataBase.select().from(table).where(table.id.eq(id)).exec()
                })
                .then((r) => {
                    dataBase.close()
                    return Promise.resolve(r)
                }, (e) => {
                    dataBase.close()
                    return Promise.reject(null)
                })
        }

        vm.list = (model) => {
            
            const schema = dbProvider.schema
            let dataBase

            return schema.connect().then((db) => {
                dataBase = db
                let table = db.getSchema().table(model)
                return db.select().from(table).exec()
            }).then((data) => {
                dataBase.close()
                return Promise.resolve(data)
            }, (e) => { 
                dataBase.close()
                return Promise.reject(e)
            })
        }

        vm.add = (model, data) => {

            const schema = dbProvider.schema
            let dataBase

            return schema.connect().then((db) => {
                    dataBase = db
                    let table = db.getSchema().table(model)
                    let row = table.createRow(data)
                        // let row = userTable.createRow({
                        //     'id': 1,
                        //     'name': user.trim()
                        // })
                    return db.insert().into(table).values([row]).exec()
                })
                .then(() => {
                    dataBase.close()
                    return this
                }, (e) => {
                    dataBase.close()
                    return Promise.reject(e)
                })
        }

        vm.del = (id) => {

        }

        vm.update = (model, id, data) => {

        }

        vm.clearData = () => {
            const schema = dbProvider.schema

            return schema.connect().then((db) => {
                try {
                    try {
                        ['Contact', 'Category', 'User'].forEach((e, i) => {
                            let table = db.getSchema().table(e)
                            db.delete().from(table).exec()
                        })
                    } catch (e) {
                        console.error(e)
                    } finally {
                        return Promise.resolve(db)
                    }
                } catch (e) {
                    console.error(e)
                    throw e
                }
            }).then((db) => {
                return setTimeout(() => {
                    db.close()
                    return Promise.resolve(true)
                }, 500)
                
            })
        }
    }

    dbService.$inject = ['db']

    require(['app'], function (app) {
        app.service('DBService', dbService)
    })

    define(['app', 'providers/dbProvider'], function () {
        return dbService
    })

})()