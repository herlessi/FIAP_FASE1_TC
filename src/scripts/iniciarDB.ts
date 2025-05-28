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
    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public."customer" (
                        id serial NOT NULL,
                        name varchar NULL,
                        email varchar NULL,
                        cpf varchar NULL,
                        dt_created timestamptz DEFAULT now() NULL,
                        fl_status boolean DEFAULT true NULL,
                        CONSTRAINT customer_unique UNIQUE (id)
                    );
                    CREATE INDEX IF NOT EXISTS customer_id_idx ON public."customer" (id) ;
                    CREATE INDEX IF NOT EXISTS customer_cpf_idx ON public."customer" (cpf);
                    CREATE INDEX IF NOT EXISTS customer_nome_idx ON public."customer" (name,email);


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
                        customer_id int4 NOT NULL,
                        dt_created timestamptz DEFAULT now() NULL,
                        fl_status int4 not NULL,
                        place_number varchar NULL,
                        CONSTRAINT order_unique UNIQUE (id)
                    );
                    CREATE INDEX IF NOT EXISTS order_customer_id_idx ON public."order" (customer_id);
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
                            price decimal NULL,
                            dt_created timestamp DEFAULT now() NULL,
                            fl_status boolean DEFAULT true NULL,
                            CONSTRAINT product_unique UNIQUE (id),
                            CONSTRAINT product_category_fk FOREIGN KEY (category_id) REFERENCES public.category(id)
                        );
            `)
  
    await dbdev.raw(`INSERT INTO product(category_id,name,price)
                    SELECT 1,'Hamburguer',1.1 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Hamburguer' and category_id = 1)
                    union all 
                    SELECT 1,'Pastel',1.2 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Pastel' and category_id = 1)
                    union all  
                    SELECT 2,'Batata Frita',2.1 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Batata Frita' and category_id = 2)
                    union all 
                    SELECT 2,'Onion Rings',2.2 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Onion Rings' and category_id = 2)
                    union all 
                    SELECT 3,'Coca Cola',3.1 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Coca Cola' and category_id = 3)
                    union all 
                    SELECT 3,'Guaraná',3.2 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Guaraná' and category_id = 3)
                    union all 
                    SELECT 4,'Sorvete',4.1 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Sorvete' and category_id = 4)
                    union all 
                    SELECT 4,'Pudim',4.2 WHERE NOT EXISTS (SELECT id FROM product WHERE name = 'Pudim' and category_id = 4)
                    `)            
 

    await dbdev.raw(`CREATE TABLE IF NOT EXISTS public.order_product (
                            order_id int4 NOT NULL,
                            product_id int4 NOT NULL,
                            quantity int4 NOT NULL,
                            fl_status boolean DEFAULT true NULL,
                            dt_created timestamptz DEFAULT now() NULL
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