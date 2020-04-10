const CategoryListMeal = require("../../category/aplication/category_local_list");
const MysqlCategoryRepository = require("../../category/infrastructure/mysql_category_repository");
const CommentList = require("../../comment/aplication/comment_list");
const MySqlCommentRepository = require("../../comment/infrastructure/mysql_comment_repository");
const Qualification = require("../domain/qualification");

class MySqlQualificationRepository {

    async get(localId) {

        const commentList = new CommentList(
            new MySqlCommentRepository()
        );
        const comments = await commentList.call(localId);
        
        const categoryListLocal = new CategoryListMeal(new MysqlCategoryRepository());
        
        const categories =  await categoryListLocal.call(localId);

        return new Qualification(categories,comments);
    }
}

module.exports = MySqlQualificationRepository;
