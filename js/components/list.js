import listItemComp from './listItem.js';

export default function ListComp () {
  class List {
    constructor(anchor, callBacks){
      this.anchor = anchor;
      this.callBacks = callBacks;
      this.ul = null;
      this.onInit();
    }

    onInit(){
      const div = document.createElement('div');
      const ul = document.createElement('ul');
      this.ul = ul;
      div.setAttribute('class', 'list');
      div.append(ul);
      this.anchor.append(div);
    }
  
    addListItem(inf){
      const newListItem = listItemComp();
      const li = new newListItem.ListItem();
      const tempLi = li.createList(inf, this.callBacks);
      this.ul.append(tempLi);
    }

    render(data){
      this.ul.innerHTML = '';
      if(data.length !== 0){
        data.map(e => this.addListItem(e, this.callBacks));
      } else {
        this.ul.innerText = 'No todos :C';
      }
      
    }
  }

  return {
    List
  }
}