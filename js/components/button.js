export default function ButtonComp () {
  class Button {
    constructor(id, className, text){
      this.id = id;
      this.className = className;
      this.text = text;
      this.button = this.render();

      return this
    }
      
    getId(){
      return this.id
    }
  
    addEvent(name, func){
      this.button.addEventListener(`${name}`, func);
    }

    render(){
      const button = document.createElement('button');
      this.button = button;
      button.setAttribute('class', this.className);
      button.innerText = this.text;
      
      return button
    }
  }

  return {
    Button
  }
}