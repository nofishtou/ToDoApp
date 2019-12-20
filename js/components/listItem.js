import ButtonComp from './button.js';
import InputComp from './input.js';

export default function listItemComp () {
  class ListItem{
    constructor(){
      this.item = null;
      this.id = null;
      this.input = null;
      this.checkbox = null;
      this.button = null;
      return this
    }

    createList(inf, callbacks){
      const li = document.createElement('li');
      const inputCom = InputComp();
      const buttonCom = ButtonComp();
      const checkbox = new inputCom.Input(inf._id,'todo-item-checkbox', 'checkbox');
      const input = new inputCom.Input(inf._id, 'todo-item-input');
      const btn = new buttonCom.Button(inf._id, 'todo-item-button', 'X');
      this.id = inf.id;
      this.checkbox = checkbox;
      this.input = input;
      this.button = btn;
      checkbox.input.checked = inf.completed;
      li.setAttribute('class', 'todo-item');
      // make disable or active 
      if(inf.completed === true){
        checkbox.input.disabled = true;
        input.input.disabled = true;
        btn.button.disabled = true;

      } else {
        btn.addEvent('click', () => {
          callbacks.delete(btn.getId());
        }, false)
        input.addEvent('change', () => {
          input.input.onfocus;
          callbacks.changeText(input.getId(), input.getValue());
        }, false)
        checkbox.addEvent('change', () => {
          callbacks.changeDone(checkbox.getId());
        })
      }
      input.input.value = inf.text;

      li.append(checkbox.input);
      li.append(input.input);
      li.append(btn.button);
      this.item = li;
      
      return li
    }

    getId(){
      return this.id
    }
  }

  return {
    ListItem
  }
}