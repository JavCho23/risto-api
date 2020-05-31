const db = require("../../../shared/domain/db");
const Product = require("../domain/product");
const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");
const { v4: uuidv4 } = require("uuid");
class MySqlProductRepository {
    async list(idItem) {
        const data = await db.doQuery(
            `SELECT id_product as idProduct, name,price FROM product 
      WHERE id_item = ? AND state = 1;`,
            [idItem.value]
        );
        return data.map(
            (product) =>
                new Product(
                    new Uuid(product.idProduct),
                    new RawString(product.name),
                    new RawDouble(product.price)
                )
        );
    }
    async update(product) {
        await db.doQuery("UPDATE product SET ? WHERE id_product = ?", [
            {
                name: product.name.value,
                price: product.price.value,
            },
            product.idProduct.value,
        ]);
    }
    async remove(idProduct) {
        await db.doQuery(
            "DELETE FROM product WHERE id_product = ?",
            idProduct.value
        );
    }
    async add(idItem, product) {
        await db.doQuery("INSERT INTO product SET ? ", {
            id_product: product.idProduct.value,
            id_item: idItem.value,
            name: product.name.value,
            price: product.price.value,
        });
    }
    async rate(idProduct, idUser, score, itemRateCalculater) {
        const item = await db.doQuery(
            "SELECT id_item as idItem FROM product  WHERE id_product = ? ",
            idProduct.value
        );
        const customer = await db.doQuery(
            "SELECT id_customer as idCustomer FROM person WHERE id_user = ?",
            idUser.value
        );
        const isRegister = await db.doQuery(
            "SELECT 'skrin.dev'  FROM qualification WHERE id_item = ? AND id_customer = ?",
            [item[0].idItem, customer[0].idCustomer]
        );
        if (isRegister.length == 0) {
            await db.doQuery("INSERT INTO qualification SET ? ", {
                id_qualification: uuidv4(),
                id_item: item[0].idItem,
                id_customer: customer[0].idCustomer,
                amount: score.value,
            });
        } else {
            await db.doQuery(
                "UPDATE qualification SET amount = ? WHERE id_item = ? AND id_customer = ?",
                [score.value, item[0].idItem, customer[0].idCustomer]
            );
        }

        await itemRateCalculater.call(new Uuid(item.idItem));
    }
}

module.exports = MySqlProductRepository;
