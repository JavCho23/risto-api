const FilterUpdateChildEntities = require("../../../../shared/infrastructure/filter_update_child_entities");
class LocalFilterUpdatePayments extends FilterUpdateChildEntities {
  constructor(idLocal, payments, paymentLister, paymentAdder, paymentRemover) {
    super(idLocal, payments, paymentLister,()=>null, paymentAdder, paymentRemover);
  }
  isEqual(niu, old) {
    return niu.value == old.idPayment.value;
  }
  async add(idLocal, payment) {
    await this._entityAdder(payment, idLocal);
  }
  async remove(idLocal, payment) {
    await this._entityRemover(payment.idPayment, idLocal);
  }
}

module.exports = LocalFilterUpdatePayments;
