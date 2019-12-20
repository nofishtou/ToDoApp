import InputComp from './input.js';
import ButtonComp from './button.js';
import Header from './header.js';

export default class Form{
  constructor(){
    this.items = [];
  }

  onInit(anchor){
    anchor.appendChild(this.render());
  }

  getRef(id){
    let item;

    this.items.forEach( (element) => {
      if(element.id === id){
        item = element
      }
    });

    return item
  }

  render(){
    const form = document.createElement('form');
    const header = new Header(form, 'My ToDo list');
    const inputCom = InputComp();
    const buttonCom = ButtonComp();
    const inputLogin = new inputCom.Input('login-input', 'form-text-input');
    const inputPassword = new inputCom.Input('password-input','form-text-input', 'password');
    const btn  = new buttonCom.Button('login-button', 'form-btn', 'Login');
    form.setAttribute('class', 'form');
    this.items.push(inputLogin);
    this.items.push(inputPassword);
    this.items.push(btn);
    form.appendChild(inputLogin.input);
    form.appendChild(inputPassword.input);
    form.appendChild(btn.button);
    
    return form
  }
}