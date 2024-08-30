document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("login-form").addEventListener("submit", function (e) {
      e.preventDefault() // Cancel the default action
      var formElement = document.getElementById('login-form');
      let data = {
         "username": formElement.querySelector('input[name="username"]').value,
         "password": formElement.querySelector('input[name="password"]').value
      }
      let messages = formElement.querySelectorAll(".input-msg");
      for (let msg of messages) {
         msg.innerHTML = "";
      }
      let messageHolder = formElement.querySelector(".form-message");
      messageHolder.innerHTML = "";
      fetch('/auth/login', {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
         })
         .then(function(res) {return res.json()})
         .then(function(result){
            console.log(result)

            if (!result) {
               messageHolder.innerHTML="O eroare a avut loc in timpul acestei actiuni. x";
               return false;
            }
            console.log(result)
            if (result.detail) {
               if (result.detail.message) {
                  messageHolder.innerHTML=result.detail.message;
                  return false;
               }
   
               if (result.detail.fields) {
                  for (let [key, value] of Object.entries(result.detail.fields)) {
                     formElement.querySelector(`input[name="${key}"]`).parentNode.querySelector(".input-msg").innerHTML=value;
                  }
                  return false;
                  
                  
               }
               messageHolder.innerHTML="O eroare a avut loc in timpul acestei actiuni. z";
               return false;
            }
            if(!result.data) {
               messageHolder.innerHTML= 'mesaj';
               return false;
            }
            if(!result.data.token){
               messageHolder.innerHTML= 'token';
               return false;
            }
            console.log(result.data)
            console.log(result.data.token)
            window.localStorage.setItem('token', result.data.token);
            window.location.href= "/panel";
         })
         .catch(error => {
            console.error(error);
         });
    });
 });