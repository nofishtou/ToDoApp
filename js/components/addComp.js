import ButtonComp from './button.js';
import InputComp from './input.js';

export default class AddCont{
  constructor(anchor){
    this.anchor = anchor;
    this.form = null;
    this.items = [];
    this.onInit();
  }

  onInit(){
    this.anchor.append(this.render());
  }

  getRef(id){
    let item;
    this.items.map((e)=>{
      if(e.id === id){
        item = e
      }
    })

    return item
  }

  render(){
    const cont = document.createElement('div');
    const inputCom = InputComp();
    const buttonCom = ButtonComp();
    let input = new inputCom.Input('add-input', 'add-input');
    this.items.push(input);
    let btn = new buttonCom.Button('add-button', 'add-button', 'Add');
    this.items.push(btn);
    cont.setAttribute('class', 'add-cont');
    cont.append(input.input);
    cont.append(btn.button);
    this.form = this.cont;
    
    return cont
  }
}