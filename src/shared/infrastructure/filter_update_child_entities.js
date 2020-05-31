class FilterUpdateChildEntities {
    constructor(idFather, entities, entityLister,entityUpdater, entityAdder, entityRemover) {
        this._idFather = idFather;
        this._entities = entities;
        this._entityLister = entityLister;
        this._entityAdder = entityAdder;
        this._entityRemover = entityRemover;
        this._entityUpdater = entityUpdater;
    }
    async call() {
        const oldEntitys = await this._entityLister.call(this._idFather);
        for (let indexOld = 0; indexOld < oldEntitys.length; indexOld++) {
            let delet = true;
            for (
                let indexEntity = 0;
                indexEntity < this._entities.length;
                indexEntity++
            ) {
                if (this.isEqual(this._entities[indexEntity], oldEntitys[indexOld])) {
                    await this.update(this._entities[indexEntity], oldEntitys[indexOld]);
                    this._entities.splice(indexEntity, 1);
                    delet = false;
                    break;
                }
            }
            if (delet) {
                await this.remove(this._idFather, oldEntitys[indexOld]);
            }
        }
        if (this._entities.length > 0) {
            await Promise.all(
                this._entities.map(async (entity) => {
                    await this.add(this._idFather, entity);
                })
            );
        }
    }
    isEqual(niu, old) {}
    async add(idFather, child) {}
    async remove(idFather, child) {}
    async update(niu){}
}

module.exports = FilterUpdateChildEntities;
