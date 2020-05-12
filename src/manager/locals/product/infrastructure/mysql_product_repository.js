const db = require("../../../../shared/domain/db");
const Product = require("../domain/product");
const RawString = require("../../../../shared/domain/value/raw_string");
const RawDouble = require("../../../../shared/domain/value/raw_double");
const Uuid = require("../../../../shared/domain/value/uuid");

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
}

module.exports = MySqlProductRepository;
