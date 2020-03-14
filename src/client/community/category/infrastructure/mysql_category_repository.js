const db = require("../../../../shared/domain/db");
const Category = require("../domain/category");
const CategoryName = require("../domain/value/category_name");
const CategoryTotal = require("../domain/value/category_total");
class MySqlCategoryRepository {

    async listCategoriesMeal(idMeal){

        const data = await db.doQuery(
            "SELECT tag.name, count(tag.name) as total FROM qualification INNER JOIN score ON score.id_qualification = qualification.id_qualification  INNER JOIN tag on score.id_tag = tag.id_tag WHERE qualification.id_item = ? AND qualification.state = 1 GROUP BY tag.name",
            idMeal.value
        );
        if (data.length == 0) ;
        
        const categories =  data.map( category=> {
            return new Category(new CategoryName(category.name), new CategoryTotal(category.total));
        });
        return categories;
    }
}

module.exports = MySqlCategoryRepository;
