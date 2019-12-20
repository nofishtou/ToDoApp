import store from "../store/store.js";

export default class Filter {
  constructor(anchor){
    this.anchor = anchor;
    this.select = null;
    this.divShow = null;
    this.onInit();
    
    return this
  }

  onInit(){
    this.anchor.append(this.render());
  }

  getValue(){
    return this.select.value;
  }

  addEvent(event, func){
    this.select.addEventListener(`${event}`, func);
  }

  counter(data){
    let done = 0;
    if(data.length !== 0) {
      data.forEach( e => {
        if(e.completed === true){
          done +=1
        }
      })
    }
    let all = data.length;
    let undone = all - done;

    return { 'all': all, 'done': done, 'undone': undone}
  }

  renderDivShow(data = store.getData()){
    // default parameter for 1 render
    const res = this.counter(data);
    this.divShow.innerHTML = `<span>All: ${res.all} </span><span>Done: ${res.done} </span><span>Undone: ${res.undone} </span>`;
  }

  render(){
    const divCont = document.createElement('div');
    const divSel = document.createElement('div');
    const divShow = document.createElement('div');
    const select = document.createElement('select');
    const optionAll = document.createElement('option');
    const optionDone = document.createElement('option');
    const optionUndone = document.createElement('option');
    this.select = select;
    this.divShow = divShow;
    divCont.setAttribute('class', 'filter');
    divSel.setAttribute('class', 'check');
    divShow.setAttribute('class', 'show');
    
    optionAll.setAttribute('value', 'All');
    optionDone.setAttribute('value', 'Done');
    optionUndone.setAttribute('value', 'Undone');
    optionAll.innerText = 'All';
    optionDone.innerText = 'Done';
    optionUndone.innerText = 'Undone';
    select.append(optionAll);
    select.append(optionDone);
    select.append(optionUndone);
    divSel.append(select);
    divCont.append(divSel);
    divCont.append(divShow);
    this.renderDivShow()

    return divCont
  }
}