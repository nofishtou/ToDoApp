import addComp from '../components/addComp.js';
import Filter from '../components/filter.js';
import List from '../components/list.js';
import Header from '../components/header.js';
import store from '../store/store.js';

export default class TODO {
  constructor(anchor){
    this.anchor = anchor;
    this.todo = null;
    this.form = null;
    this.list = null;
    this.filter = null;
    this.callBacks = { 
                        'delete': this.deleteItem.bind(this), 
                        'changeText': this.changeText.bind(this), 
                        'changeDone': this.changeDone.bind(this) 
                      };
  }

  onInit(){
    this.anchor.append(this.render());
    this.addEvents();
    this.update();
  }

  addEvents(){
    this.form.getRef('add-button').addEvent('click', this.addItem.bind(this) );
    this.filter.addEvent('change', () =>{
      this.filterList(this.filter.getValue());
    });
 
  }

  addItem (){ 
    // add items not ruin list if your add when done or undone
    if(this.filter.getValue() === 'All'){
      // validation more then 5 symbols
      if(this.form.getRef('add-input').getValue().length > 5){
        
        fetch('https://todo-app-back.herokuapp.com/todos', {
          method: 'POST',
          body:
            JSON.stringify({
              text: this.form.getRef('add-input').getValue(),
            }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        })
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(this.update());
         
          this.form.getRef('add-input').input.value = '';
      }
    }
  }

  deleteItem(id){
    store.deleteItem(id);
    this.list.render(store.getData());
    this.filter.renderDivShow(store.getData());

    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
  }
  
  changeText(id, text){
    store.changeItem(id, 'text', text);
    this.list.render(store.getData());
    this.filter.renderDivShow(store.getData());

    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          text: text,
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
    
  }

  changeDone(id) {
    store.changeItem(id, 'completed', true);
    this.list.render(store.getData());
    this.filter.renderDivShow(store.getData());

    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          completed: true,
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
  }

  filterList(value){    
    if(value === 'All'){
      this.list.render(store.getData(), this.callBacks)
    } else if ( value === 'Done' ) {
      const tempArr = store.getData().filter(e => {
        if(e.completed === true) return e
      })

      this.list.render(tempArr, this.callBacks)      
    } else {
      const tempArr = store.getData().filter(e => {
        if(e.completed === false) return e
      })

      this.list.render(tempArr, this.callBacks);
    }
  }

  update(){
    // get new list with id from server

    fetch('https://todo-app-back.herokuapp.com/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(data => {
        store.setData(data)
        this.list.render(store.getData())
        this.filter.renderDivShow(store.getData())
      });
  }

  render(){
    const cont = document.createElement('div');
    const listCom = List();
    const header = new Header(cont, 'My ToDo List');
    const addInp = new addComp(cont);
    const filter = new Filter(cont, store.store);
    const list = new listCom.List(cont, this.callBacks);
    this.form = addInp;
    this.filter = filter;
    this.list = list;
    this.todo = cont;
    cont.setAttribute('class', 'todo-list');

    return cont
  } 
}
