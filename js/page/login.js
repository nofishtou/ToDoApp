import Form from '../components/form.js';

export default class Login {
  constructor(anchor){
    this.anchor = anchor;
    this.form = null;
  }
  
  getValue(id){
    return this.form.getRef(id).getValue()
  }
  
  addEvent(type, func){
    this.form.getRef('login-button').addEvent(type, func);
  }

  render(){
    const div = document.createElement('div');
    div.setAttribute('class', 'contAut');
    const aut = new Form();
    div.append(aut.render());
    this.form = aut;
    
    return div
  }
}
