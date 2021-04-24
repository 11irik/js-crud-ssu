module.exports = class StorageService {
    
    #count = 0;

    constructor() {
        this.map = new Map()
    }

    add(object) {
        let id = this.#count += 1;
        this.map.set(id, object);
        return id;
    }

    getById(id) {
        if (typeof id === 'number'){
            if (this.map.has(id)){
                return this.map.get(id);
            }
        }
        else {
            throw new Error('The identifier type must be a number!');
        }
    }

    getAll() {
        return this.map.values();
    }

    deleteById(id) {
        return this.map.delete(id);
    }
}
