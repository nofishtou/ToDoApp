export default class Header{
  constructor(anchor, text){
    this.anchor = anchor;
    this.text = text;
    this.onInit();
  }

  onInit(){
    this.anchor.append(this.render());
  }

  render(){
    const div = document.createElement('div');
    const header = document.createElement('h2');
    header.innerText = this.text;
    div.setAttribute('class', 'title');
    header.setAttribute('class', 'header-title');
    div.append(header);
    
    return div
  }
}