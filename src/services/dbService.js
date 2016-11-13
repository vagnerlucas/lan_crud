(function () {
    
    'use strict'

    function dbService(dbProvider) {

        let vm = this

        vm.getById = (model, id) => {

            return dbProvider.dbPromise.then((dataBase) => { 
            
            const table = dataBase.getSchema().table(model)
                        
            return dataBase.select()
                    .from(table)
                    .where(table.id.eq(id))
                    .exec()
                    .then(
                        (r) => { return Promise.resolve(r) },
                        (e) => { return Promise.reject(null) }
                    )
            })
        }

        vm.list = (model) => {
            
            return dbProvider.dbPromise.then((dataBase) => {
                
                const table = dataBase.getSchema().table(model)
                
                return dataBase.select()
                               .from(table)
                               .exec()
                               .then(
                                   (data) => { return Promise.resolve(data) },
                                   (err) => { return Promise.reject(err) }
                               )
            })
        }

        vm.add = (model, data) => {

            return dbProvider.dbPromise.then((dataBase) => {
                const table = dataBase.getSchema().table(model)
                const row = table.createRow(data)
                
                return dataBase.insert()
                               .into(table)
                               .values([row])
                               .exec()
                               .then(
                                   () => { return this },
                                   (err) => { Promise.reject(err) }
                               )
            })
        }

        vm.del = (model, id) => {
            return dbProvider.dbPromise.then((dataBase) => {
                const table = dataBase.getSchema().table(model)
                
                return dataBase.delete()
                               .from(table)
                               .where(table.id.eq(id))
                               .exec()
                               .then(
                                   () => { return this },
                                   (err) => { Promise.reject(err) }
                               )
            })
        }

        vm.update = (model, id, data) => {
            return dbProvider.dbPromise.then((dataBase) => {
                const table = dataBase.getSchema().table(model)

                try {
                    for(let prop in table.K) {
                        dataBase.update(table).set(table.K[prop], data[table.K[prop].A]).where(table.id.eq(id)).exec()
                    }
                    return Promise.resolve(true)
                } catch (err) {
                    return Promise.reject(err)
                }                               
            })
        }

        vm.clearData = () => {
            
            return dbProvider.dbPromise.then((dataBase) => {
                try {
                        ['Contact', 'Category', 'ContactCategory', 'User'].forEach((e, i) => {
                            let table = dataBase.getSchema().table(e)
                            dataBase.delete().from(table).exec()
                        })
                    } 
                    catch (e) {
                        console.error(e)
                    }
                    finally {
                        return Promise.resolve(dataBase)
                    }
            })
            .then((db) => {
                return setTimeout(() => {
                    return Promise.resolve(true)
                }, 100)
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