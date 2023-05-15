const storage = window.localStorage
export default {
    set(key, value) { storage.setItem(key, JSON.stringify(value)) },//设置
    get(key) { return JSON.parse(storage.getItem(key)) },//获取
    isKey(key) { return storage.getItem(key) ? true : false },//判断
    clear() { storage.clear() },//清空
    remove(key) { storage.removeItem(key) },//清除一个
}