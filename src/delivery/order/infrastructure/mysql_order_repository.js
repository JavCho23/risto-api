const db = require("../../../shared/domain/db");
const Order = require("../domain/order");
const RawString = require("../../../shared/domain/value/raw_string");
const RawNumber = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlOrderRepository {
    async list(idDelivery) {
        const data = await db.doQuery(
            "SELECT product.id_product as idProduct, `order`.amount, product.`name`, `order`.price, item.score FROM `order` INNER JOIN product ON product.id_product = order.id_product INNER JOIN item ON item.id_item = product.id_item WHERE `order`.id_delivery =  ? ",
            idDelivery.value
        );

        return data.map(
            (order) =>
                new Order(
                    new Uuid(order.idProduct),
                    new RawString(order.name),
                    new RawNumber(order.amount),
                    new RawNumber(order.price),
                    new RawNumber(order.score)
                )
        );
    }
    async add(idDelivery, order) {
        await db.doQuery("INSERT INTO `order` SET ? ", {
            id_delivery: idDelivery.value,
            id_product: order.idProduct.value,
            amount: order.amount.value,
            price: order.price.value,
        });
    }
}

module.exports = MySqlOrderRepository;
