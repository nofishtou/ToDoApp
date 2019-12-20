export default class Data {
  constructor(){
    this.store = []; 
  }
  
  getData(){
    return this.store
  }

  setData(data){
    this.store = data;
  }

  addItem(item){
    this.store = [...this.store, item];
  }

  changeItem(id, key, value){
    this.store = this.store.map((item) => {
      if(item._id === id){
        item[key] = value
        return item
      } else {
        return item
      }
    });
  }

  deleteItem(id){
    this.store = this.store.filter((item) => {
      return item._id !== id
    });
  }
}