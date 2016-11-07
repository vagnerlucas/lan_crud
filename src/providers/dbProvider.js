(function () {

    'use strict'
    
    function db() {

        let vm = this

        const schemaBuilder = lf.schema.create('agenda', 1);

        vm.init = () => {

            console.info('creating initial schema')

            schemaBuilder.createTable('User').
            addColumn('id', lf.Type.INTEGER).
            addColumn('name', lf.Type.STRING).
            addPrimaryKey([{
                'name': 'id',
                'autoIncrement': false
            }])

            schemaBuilder.createTable('Contact').
            addColumn('id', lf.Type.INTEGER).
            addColumn('name', lf.Type.STRING).
            addColumn('email', lf.Type.STRING).
            addColumn('description', lf.Type.STRING).
            addColumn('birthdate', lf.Type.DATE_TIME).
            addColumn('starred', lf.Type.BOOLEAN).
            addColumn('picture', lf.Type.OBJECT).
            addNullable(['picture', 'description', 'birthdate', 'starred']).
            addPrimaryKey([{
                'name': 'id',
                'autoIncrement': true
            }]).
            addIndex('idx_contact', [{
                'name': 'name',
                'order': lf.Order.ASC
            }])

            schemaBuilder.createTable('Category').
            addColumn('id', lf.Type.INTEGER).
            addColumn('name', lf.Type.STRING).
            addColumn('description', lf.Type.STRING).
            addColumn('contact_id', lf.Type.INTEGER).
            addColumn('picture', lf.Type.OBJECT).
            addNullable(['picture', 'description']).
            addPrimaryKey([{
                'name': 'id',
                'autoIncrement': true
            }]).
            addUnique('uq_name', ['name']).
            addIndex('idx_category', [{
                'name': 'name',
                'order': lf.Order.ASC
            }]).
            addForeignKey('fk_contact', {
                local: 'contact_id',
                ref: 'Contact.id',
                action: lf.ConstraintAction.CASCADE,
                timing: lf.ConstraintAction.IMMEDIATE
            })
        }

        

        vm.$get = () => {
            return {
                dbPromise: Promise.resolve(schemaBuilder.connect()).then((db) => { return Promise.resolve(db) })
            }
        }
    }

    require(['app'], function (app) {
        app.provider('db', db)
    })

    define(['app'], function () {
        return db
    })

})()