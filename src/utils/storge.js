const storage = {
    get(key) {
        return window.localStorage.getItem(key);
    },
    set(key, val) {
        window.localStorage.setItem(
            key,
            typeof val !== "string" ? JSON.stringify(val) : val
        );
    },
    delete(key) {
        window.localStorage.removeItem(key);
    },
    clear() {
        window.localStorage.clear();
    }
};
export default storage;