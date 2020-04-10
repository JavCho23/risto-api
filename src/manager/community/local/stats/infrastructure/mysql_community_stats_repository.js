const db = require("../../../../../shared/domain/db");
const CommunityStats = require("../domain/community_stats");
const QualificationGet = require("../../../qualification/aplication/qualifications_get");
const MySqlQualificationRepository = require("../../../qualification/infrastructure/mysql_qualification_repository");

class MySqlCommunityStatsRepository {
    async getLikes(localId) {
        const data = await db.doQuery(
            "SELECT COUNT(`local`.id_local) as likes FROM `local`  INNER JOIN menu ON menu.id_local = local.id_local INNER JOIN meal ON meal.id_menu = menu.id_menu INNER JOIN favorite on favorite.id_meal WHERE `local`.id_local = ?",
            localId
        );
        return data[0].likes;
    }
    async getScore(localId) {
        const qualificationGet = new QualificationGet( new MySqlQualificationRepository());
        return await qualificationGet.call(localId);
    }
    async getLastWeekTotalLikes(localId) {
        const data = await db.doQuery(
            `SELECT COUNT(local.id_local) as likes FROM local 
            INNER JOIN menu ON menu.id_local = local.id_local 
            INNER JOIN meal ON meal.id_menu = menu.id_menu 
            INNER JOIN favorite on favorite.id_meal 
            WHERE local.id_local = ? AND favorite.modified_at >=  DATE_ADD(NOW(), INTERVAL -6 DAY);`,
            localId
        );
        return data[0].likes;
    }

    async getLastWeekLikes(localId) {

        const result = [];
        for (let index = 0; index < 7; index++) {
            
            let data = await db.doQuery(
                `SELECT COUNT(local.id_local) as likes FROM local 
                INNER JOIN menu ON menu.id_local = local.id_local 
                INNER JOIN meal ON meal.id_menu = menu.id_menu 
                INNER JOIN favorite on favorite.id_meal 
                WHERE local.id_local = ? AND favorite.modified_at >=  DATE_ADD(NOW(), INTERVAL -? DAY);`,
                [localId,index]
            );
            result.push(data[0].likes);
        }
        return result;
    }

    async getCommunityStats(localId){
        const likes = await this.getLikes(localId);
        const score = await this.getScore(localId);
        const weeklyTotalLikes = await this.getLastWeekTotalLikes(localId);
        const weeklyLikes = await this.getLastWeekLikes(localId);
        const increse = (likes - weeklyTotalLikes) /100;

        return new CommunityStats(likes,score.total,{amount: weeklyTotalLikes,increse: increse,dataChart: weeklyLikes});
    }

    

}

module.exports = MySqlCommunityStatsRepository;
