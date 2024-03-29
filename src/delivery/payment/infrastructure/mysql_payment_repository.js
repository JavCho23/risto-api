const db = require("../../../shared/domain/db");
const Payment = require("../domain/payment");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlPaymentRepository {
    async listByLocal(idLocal) {
        const data = await db.doQuery(
            `SELECT payment.id_payment as idPayment, payment.name, payment.description 
            FROM payment 
            INNER JOIN method ON method.id_payment = payment.id_payment 
            INNER JOIN local ON method.id_local = local.id_local
            WHERE local.id_local = ? AND payment.state = 1;`,
            idLocal.value
        );

        return data.map(
            (payment) =>
                new Payment(
                    new Uuid(payment.idPayment),
                    new RawString(payment.name),
                    new RawString(payment.description)
                )
        );
    }
    async listAll() {
        const data = await db.doQuery(
            `SELECT payment.id_payment as idPayment, name, description 
            FROM payment 
            WHERE payment.state = 1;`
        );

        return data.map(
            (payment) =>
                new Payment(
                    new Uuid(payment.idPayment),
                    new RawString(payment.name),
                    new RawString(payment.description)
                )
        );
    }
    async find(idPayment) {
        const data = await db.doQuery(
            `SELECT payment.id_payment as idPayment, name, description 
            FROM payment 
            WHERE payment.state = 1 AND payment.id_payment = ?;`,
            idPayment.value
        );
        return new Payment(
            new Uuid(data[0].idPayment),
            new RawString(data[0].name),
            new RawString(data[0].description)
        );
    }
}

module.exports = MySqlPaymentRepository;
