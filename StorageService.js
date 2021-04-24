module.exports = class StorageService {
    
    #count = '0';

    constructor() {
        this.map = new Map()
    }

    add(object) {
        this.#count = String(Number(this.#count) + 1);
        this.map.set(this.#count, object);
        return this.#count;
    }

    getById(id) {
        if (typeof id === 'string'){
            if (this.map.has(id)){
                return this.map.get(id);
            }
        }
        else {
            throw new Error('The identifier type must be a string!');
        }
    }

    getAll() {
        return this.map.values();
    }

    deleteById(id) {
        return this.map.delete(id);
    }

    updateById(id, object){
        if (typeof id === 'string'){
            if (typeof object === 'object'){
                for (let key in this.map.get(id)) {
                    if (object[key]) {
                        this.map.get(id)[key] = object[key];
                    }
                }
                return this.map.get(id);
            }
            else {
                throw new Error('The arg type must be an object!');
            }
        }
        else {
            throw new Error('The identifier type must be a string!');
        }
    }
    
}
