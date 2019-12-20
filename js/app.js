import Login from './page/login.js';
import TODO from './page/todo.js';

export default (anchor) => { 
  const todo = new TODO(anchor);
  const autification = new Login(anchor);

  window.onload = () => {
    if(localStorage.getItem('token')){
      fetch('https://todo-app-back.herokuapp.com/me', {
        method: 'GET',
        headers: {
        'Authorization': localStorage.getItem('token')
        }
      })
      .then(res => res.json() )
      .then( todo.onInit());

    } else {
      root.append(autification.render());
      autification.addEvent('click', (e) =>{
        e.preventDefault()
          const login = autification.getValue('login-input');
          const password = autification.getValue('password-input');
          
          fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            body:
              JSON.stringify({
                email: login,
                password: password,
              }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              // only if successfull login
              if(data.token !== undefined){
                localStorage.setItem('token', data.token);
                anchor.innerHTML = '';
                todo.onInit();
              }
            });
        }
      )
    }
  }
}