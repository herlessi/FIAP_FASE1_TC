// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    inicial: {
        client: 'postgresql',
        connection: {
            host:     'banco',
            port:     5432,
            database: 'postgres',
            user:     'postgres',
            password: 'admin'
        },
        pool: {
        min: 2,
        max: 10
        },
        migrations: {
        tableName: 'knex_migrations'
        }
    },
    desenvolvimento: {
        client: 'postgresql',
        connection: {
            host:     'banco',
            port:     5432,
            database: 'fiap_loja',
            user:     'postgres',
            password: 'admin'
        },
        pool: {
        min: 2,
        max: 10
        },
        migrations: {
        tableName: 'knex_migrations'
        }
    }

};
