export default function InputComp () {
  class Input {
    constructor(id, className, type = 'text'){
      this.id = id;
      this.className = className;
      this.type = type;
      this.input = this.render();
      
      return this
    }
      
    getValue(){
      return this.input.value
    }

    getId(){
      return this.id
    }
  
    addEvent(name, func){
      this.input.addEventListener(`${name}`, func);
    }

    render(){
      const input = document.createElement('input');
      input.setAttribute('type',this.type);
      input.setAttribute('class', this.className);
      
      return input
    }
  }

  return {
    Input
  }
}