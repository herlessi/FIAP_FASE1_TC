const iniciarDB = async () => {

    const config = require('../../knexfile.js');
    const dbinicial = require('knex')(config.inicial);

    await dbinicial.raw(`CREATE DATABASE fiap_loja`)
    .then((resp) => {
        console.log(resp)
        console.log('Banco de dados criado com sucesso!');
        dbinicial.destroy();
    }).catch((err) => {
        console.log(err.message);
        if(err?.message.includes('database "fiap_loja" already exists')) {
            console.log('Banco Existente')
        }else{
            console.error('Erro ao criar o banco de dados:', err);
        }
        dbinicial.destroy();
    })


    const dbdev = require('knex')(config.desenvolvimento);
    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public."costumer" (
                        id serial NOT NULL,
                        name varchar NULL,
                        email varchar NULL,
                        cpf varchar NULL,
                        dt_created timestamptz NULL,
                        status varchar NULL,
                        CONSTRAINT costumer_unique UNIQUE (id)
                    );
                    CREATE INDEX IF NOT EXISTS costumer_id_idx ON public."costumer" (id) ;
                    CREATE INDEX IF NOT EXISTS costumer_cpf_idx ON public."costumer" (cpf);
                    CREATE INDEX IF NOT EXISTS costumer_nome_idx ON public."costumer" (name,email);


            `)

    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public."user" (
                        id serial NOT NULL,
                        "name" varchar NULL,
                        email varchar NULL,
                        "password" varchar NULL,
                        dt_created timestamp DEFAULT now() NULL,
                        fl_status boolean DEFAULT true NULL,
                        CONSTRAINT user_unique UNIQUE (id)
                    );

            `)


    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public."order" (
                        id serial NOT NULL,
                        user_id int4 NOT NULL,
                        dt_created timestamptz DEFAULT now() NULL,
                        fl_status int4 not NULL,
                        place_number varchar NULL,
                        CONSTRAINT order_unique UNIQUE (id)
                    );
                    CREATE INDEX IF NOT EXISTS order_user_id_idx ON public."order" (user_id);
                    CREATE INDEX IF NOT EXISTS order_fl_status_idx ON public."order" (fl_status);

            `) 


    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public.category (
                            id serial NOT NULL,
                            "name" varchar NULL,
                            dt_created timestamptz DEFAULT now() NULL,
                            fl_status boolean DEFAULT true NULL,
                            CONSTRAINT category_unique UNIQUE (id)
                        );


            `)


    await dbdev.raw(`INSERT INTO category(name)
                    SELECT 'Lanche' WHERE NOT EXISTS (SELECT id FROM category WHERE name = 'Lanche')
                    union all 
                    SELECT 'Acompanhamento' WHERE NOT EXISTS (SELECT id FROM category WHERE name = 'Acompanhamento')
                    union all 
                    SELECT 'Bebida' WHERE NOT EXISTS (SELECT id FROM category WHERE name = 'Bebida')
                    union all 
                    SELECT 'Sobremesa' WHERE NOT EXISTS (SELECT id FROM category WHERE name = 'Sobremesa');
                    `)


    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public.product (
                            id serial NOT NULL,
                            category_id int4 NOT NULL,
                            "name" varchar NULL,
                            dt_created timestamp DEFAULT now() NULL,
                            fl_status boolean DEFAULT true NULL,
                            CONSTRAINT product_unique UNIQUE (id),
                            CONSTRAINT product_category_fk FOREIGN KEY (id) REFERENCES public.category(id)
                        );


            `)


    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public.order_payments (
                            id serial NOT NULL,
                            order_id int4 NOT NULL,
                            fl_status int4 NULL,
                            payment_data text NULL,
                            CONSTRAINT order_payments_unique UNIQUE (id),
                            CONSTRAINT order_payments_order_fk FOREIGN KEY (order_id) REFERENCES public."order"(id)
                        );



            `)


}

iniciarDB();