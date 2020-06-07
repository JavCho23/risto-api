const db = require("../../../shared/domain/db");
const Item = require("../domain/item");
const Product = require("../../product/domain/product");
const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
const RawBool = require("../../../shared/domain/value/raw_bool");
const Uuid = require("../../../shared/domain/value/uuid");
const NotFoundError = require("../../../shared/domain/error/no_found_error");
const ItemFilterUpdateTag = require("./item_filter_update_tag");
const ItemFilterUpdateProduct = require("./item_filter_update_product");

const columms = require("./persistence/excel_columms.json");
const tag_categories = require("../../../shared/infrastructure/persistence/tag_categories.json");
const { v4: uuidv4 } = require("uuid");
const XLSX = require("xlsx");
const Utils = require("../../../shared/domain/utils");
class MySqlItemRepository {
    async find(idItem, productLister, tagLister) {
        const data = await db.doQuery(
            `SELECT id_item as idItem, item.name as name, local.name as local, item.description, local.id_local as idLocal , item.score, item.available, city.name as city
      FROM item 
      INNER JOIN catalog ON catalog.id_catalog = item.id_catalog
      INNER JOIN local ON local.id_local = catalog.id_local
      INNER JOIN location ON local.id_location = location.id_location
      INNER JOIN city ON location.id_city = city.id_city
      WHERE item.id_item = ? AND item.state = 1;`,
            [idItem.value]
        );
        if (data.length == 0) throw new NotFoundError();
        return new Item(
            idItem,
            new RawString(data[0].name),
            new RawString(data[0].description),
            new RawString(data[0].local),
            new Uuid(data[0].idLocal),
            new RawDouble(data[0].score),
            new RawBool(data[0].available),
            new RawString(data[0].city),
            await tagLister.call(idItem),
            await productLister.call(idItem)
        );
    }
    async add(idLocal, item, productAdder, recordAdder) {
        const local = await db.doQuery(
            "SELECT id_catalog FROM catalog WHERE id_local = ?",
            idLocal.value
        );
        if (local.length == 0) throw new NotFoundError();
        await db.doQuery("INSERT INTO item SET ?", {
            id_item: item.idItem.value,
            id_catalog: local[0].id_catalog,
            name: item.name.value,
            description: item.description.value,
        });
        await Promise.all(
            item.products.map(
                async (product) => await productAdder.call(item.idItem, product)
            )
        );
        await Promise.all(item.tags.map((tag) => this.addTag(item.idItem, tag)));
        recordAdder.call("ha agregado un nuevo item: " + item.name.value);
    }
    async addFromExcel(idLocal, base64StringFile, productAdder) {
        const workbook = XLSX.read(base64StringFile, { type: "base64" });
        const data = Utils.sheetToArray(workbook.Sheets["Sheet1"]);
        for (let row = 1; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                const productData = data[row][columms.products].split(",");
                const products = [];
                for (let index = 0; index < productData.length; index += 2) {
                    products.push(
                        Product.fromJson({
                            idProduct: uuidv4(),
                            name: productData[index],
                            price: productData[index + 1],
                        })
                    );
                }
                this.add(
                    idLocal,
                    new Item.fromJson({
                        idItem: uuidv4(),
                        name: data[row][columms.name],
                        description: data[row][columms.description],
                        tags: data[row][columms.tags].split(","),
                        products: products,
                    }),
                    productAdder,
                    recordAdder
                );
            }
        }
    }
    async update(
        item,
        productLister,
        tagLister,
        productUpdater,
        productAdder,
        productRemover,
        recordAdder
    ) {
        await db.doQuery(" UPDATE item SET ? WHERE id_item = ?", [
            {
                name: item.name.value,
                description: item.description.value,
                modified_at: new Date().toLocaleString(),
            },
            item.idItem.value,
        ]);
        const itemFilterUpdateProduct = new ItemFilterUpdateProduct(
            item.idItem,
            item.products,
            productLister,
            productUpdater,
            productAdder,
            productRemover
        );
        await itemFilterUpdateProduct.call();
        const itemFilterUpdateTag = new ItemFilterUpdateTag(
            item.idItem,
            item.tags,
            tagLister,
            this.addTag,
            this.removeTag
        );
        await itemFilterUpdateTag.call();
        await recordAdder.call("ha actualizado el item: " + item.name.value);
    }
    async addTag(idItem, name) {
        const id = await db.doQuery(
            "SELECT id_tag as idTag FROM tag WHERE name = ?",
            name.value
        );
        let idTag;
        if (id.length == 0) {
            idTag = uuidv4();
            await db.doQuery("INSERT INTO tag SET ?", {
                id_tag: idTag,
                id_category: tag_categories.etiqueta,
                name: name.value,
            });
        } else idTag = id[0].idTag;
        await db.doQuery(" INSERT INTO tagger SET ?", {
            id_tag: idTag,
            id_item: idItem.value,
        });
    }
    async removeTag(idItem, idTag) {
        await db.doQuery(" DELETE FROM tagger WHERE id_item = ? AND id_tag = ?", [
            idItem.value,
            idTag.value,
        ]);
    }
    async listByLocal(idLocal, limit, offset, productLister, tagLister) {
        const data = await db.doQuery(
            `SELECT id_item as idItem
      FROM item 
      INNER JOIN catalog ON catalog.id_catalog = item.id_catalog
      INNER JOIN local ON local.id_local = catalog.id_local
      WHERE local.id_local = ? AND item.state = 1 
      LIMIT ? OFFSET ?`,
            [idLocal.value, limit.value, offset.value]
        );
        return await Promise.all(
            data.map(
                async (item) =>
                    await this.find(new Uuid(item.idItem), productLister, tagLister)
            )
        );
    }
    async addOneView(idItem) {
        await db.doQuery(
            `UPDATE item SET views = views + 1 
      WHERE id_item = ?`,
            [idItem.value]
        );
    }
    async getViews(idItem) {
        const data = await db.doQuery(
            `SELECT views FROM item 
      WHERE id_item = ?`,
            [idItem.value]
        );
        return new RawDouble(data[0].views);
    }
    async remove(idItem, recordAdder) {
        const data = await db.doQuery(
            "SELECT name FROM item WHERE item.id_item = ?",
            idItem.value
        );
        if (data.length == 0) throw new NotFoundError();
        await db.doQuery(
            `UPDATE item SET state = 0 
      WHERE id_item = ?`,
            idItem.value
        );
        recordAdder.call("ha eliminado el item: " + data[0].name);
    }
    async changeItemAvialable(idItem) {
        await db.doQuery(
            `UPDATE item SET available = !available 
      WHERE id_item = ?`,
            [idItem.value]
        );
    }
    async calculateRate(idItem) {
        const qualifications = await db.doQuery(
            "SELECT amount from qualification WHERE id_item = ?",
            idItem.value
        );
        if (qualifications.length == 0) return;
        const score =
      qualifications.reduce(
          (accumulator, currentValue) => accumulator + currentValue
      ) / qualifications.length;
        await db.doQuery("UPDATE item SET score = ? WHERE id_item = ?", [
            score,
            idItem.value,
        ]);
    }
}





module.exports = MySqlItemRepository;
