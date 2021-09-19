function storage(key) {
    const storage = JSON.parse(localStorage.getItem(key)) ?? {};
    function save() {
        localStorage.setItem(key, JSON.stringify(storage));
    }
    
    return {
        get(key) {
            return storage[key];
        },
        set(key, value) {
            storage[key] = value;
            save();
        },
        remove(key) {
            delete storage[key];
            save();
        },
        removeAll() {
            const keys = Object.keys(storage);
            for (let i = 0; i < keys.length; i++) {
                delete storage[keys[i]]
            }
            save();
        }
    };
}