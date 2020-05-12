const FilterUpdateChildEntities = require("../../../../shared/infrastructure/filter_update_child_entities");

class LocalFilterUpdatePhones extends FilterUpdateChildEntities {
  constructor(idLocal, phones, phoneLister,phoneUpdater, phoneAdder, phoneRemover) {
    super(idLocal, phones, phoneLister,phoneUpdater, phoneAdder, phoneRemover);
  }
  isEqual(niu, old) {
    return niu.idPhone.value == old.idPhone.value;
  }
  async add(idLocal, phone) {
    await this._entityAdder.call(idLocal, phone);
  }
  async remove(idLocal, phone) {
    await this._entityRemover.call(phone.idPhone);
  }
  async update(niu) {
    await this._entityUpdater.call(niu);
  }
}

module.exports = LocalFilterUpdatePhones;
