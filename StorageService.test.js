const StorageService = require('./StorageService');
const storage = new StorageService();

class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Triple {
    constructor(field1, field2, field3) {
        this.field1 = field1;
        this.field2 = field2;
        this.value = field3;
    }
}

let key1 = "key1";
let key2 = "key2";
let value0 = "value0";
let value1 = "value1";
let value2 = "value2";
let value3 = "value3";

let pair1 = new Pair(key1, value1);
let pair2 = new Pair(key2, value2);

let tripleValue = "VALUEVALUEVALUE"
let triple = new Triple(value1, value2, tripleValue);

let id0 = storage.add(value0);
let id1 = storage.add(pair1);
let id2 = storage.add(pair2);
let id3;
let notExistId = '100';
let wrongIdType = 2;

test('add test', () => {
    id3 = storage.add(value3);
    expect(typeof id3).toBe('string')
    expect(id3).toBe(String(Number(id2) + 1));
});

test('get by id', () => {
    let elementById = storage.getById(id3);
    expect(elementById).toBe(value3);
});

test('get pair by id', () => {
    let elementById = storage.getById(id1);
    expect(elementById).toMatchObject(pair1);
});

test('check pairs not equail', () => {
    let elementById = storage.getById(id1);
    expect(elementById).not.toMatchObject(pair2);
});

test('get by wrong id type', () => {
    expect(() => {
        storage.getById(wrongIdType);
    }).toThrow();
});

test('get by non exist id', () => {
    expect(storage.getById(notExistId)).toBeUndefined();
});

test('delete by id', () => {
    expect(storage.deleteById(id3)).toBeTruthy();
    expect(storage.getById(id3)).toBeUndefined();
});

test('delete by non exist id', () => {
    expect(storage.deleteById(notExistId)).toBeFalsy();
});

test('delete by wrong id', () => {
    expect(() => {
        storage.deleteById(wrongIdType);
    }).toThrow();
});

test('update by id same objects', () => {
    expect(storage.updateById(id1, pair2)).toMatchObject(pair2);
})

test('update by id different objects', () => {
    let updatedPair = storage.getById(id1);
    updatedPair["value"] = tripleValue;
    expect(storage.updateById(id1, triple)).toMatchObject(updatedPair);
    console.log(updatedPair)
})

test('update non existence id', () => {
    expect(storage.updateById(notExistId, triple)).toBeUndefined();
})

test('update with wrong id type', () => {
    expect(() => {
        storage.updateById(wrongIdType, triple);
    }).toThrow();
})

test('replace by id the same object', () => {
    expect(storage.getById(id1)).not.toMatchObject(pair2);
    storage.replaceById(id1, pair2);
    expect(storage.getById(id1)).toMatchObject(pair2);
})

test('replace by id another object', () => {
    expect(storage.getById(id1)).not.toMatchObject(triple);
    storage.replaceById(id1, triple);
    expect(storage.getById(id1)).toMatchObject(triple);
})

test('replace by id to string', () => {
    storage.replaceById(id1, value0);
    expect(storage.getById(id1)).toBe(value0);
})

test('log get all', () => {
    console.log(storage.getAll())
})

