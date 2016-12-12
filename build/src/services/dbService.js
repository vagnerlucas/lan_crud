'use strict';

(function () {

    'use strict';

    function dbService(dbProvider) {
        var _this = this;

        var vm = this;

        vm.getById = function (model, id) {

            return dbProvider.dbPromise.then(function (dataBase) {

                var table = dataBase.getSchema().table(model);

                return dataBase.select().from(table).where(table.id.eq(id)).exec().then(function (r) {
                    return Promise.resolve(r);
                }, function (e) {
                    return Promise.reject(null);
                });
            });
        };

        vm.list = function (model) {

            return dbProvider.dbPromise.then(function (dataBase) {

                var table = dataBase.getSchema().table(model);

                return dataBase.select().from(table).exec().then(function (data) {
                    return Promise.resolve(data);
                }, function (err) {
                    return Promise.reject(err);
                });
            });
        };

        vm.add = function (model, data) {

            return dbProvider.dbPromise.then(function (dataBase) {
                var table = dataBase.getSchema().table(model);
                var row = table.createRow(data);

                return dataBase.insert().into(table).values([row]).exec().then(function () {
                    return _this;
                }, function (err) {
                    return Promise.reject(err);
                });
            });
        };

        vm.getSchema = function (model) {
            return dbProvider.dbPromise.then(function (dataBase) {
                return dataBase.getSchema().table(model);
            });
        };

        vm.executeQuery = function (model, query) {
            return dbProvider.dbPromise.then(function (dataBase) {
                return dataBase.select().from(model).where(query).exec().then(function (r) {
                    return Promise.resolve(r);
                }, function (e) {
                    throw e;
                });
            });
        };

        vm.del = function (model, id) {
            return dbProvider.dbPromise.then(function (dataBase) {
                var table = dataBase.getSchema().table(model);

                return dataBase.delete().from(table).where(table.id.eq(id)).exec().then(function () {
                    return _this;
                }, function (err) {
                    Promise.reject(err);
                });
            });
        };

        vm.update = function (model, id, data) {
            return dbProvider.dbPromise.then(function (dataBase) {
                var table = dataBase.getSchema().table(model);

                try {
                    for (var prop in table.K) {
                        dataBase.update(table).set(table.K[prop], data[table.K[prop].A]).where(table.id.eq(id)).exec();
                    }
                    return Promise.resolve(true);
                } catch (err) {
                    return Promise.reject(err);
                }
            });
        };

        vm.clearData = function () {

            return dbProvider.dbPromise.then(function (dataBase) {
                try {
                    ['Contact', 'Category', 'ContactCategory', 'User'].forEach(function (e, i) {
                        var table = dataBase.getSchema().table(e);
                        dataBase.delete().from(table).exec();
                    });
                } catch (e) {
                    console.error(e);
                } finally {
                    return Promise.resolve(dataBase);
                }
            }).then(function (db) {
                return setTimeout(function () {
                    return Promise.resolve(true);
                }, 100);
            });
        };
    }

    dbService.$inject = ['db'];

    require(['app'], function (app) {
        app.service('DBService', dbService);
    });

    define(['app', 'providers/dbProvider'], function () {
        return dbService;
    });
})();