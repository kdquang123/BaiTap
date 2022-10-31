//validate form login,sign in

const input=document.querySelectorAll(".form-input");
const signUp_link=document.querySelector("#sign-up");
const login_link=document.querySelector("#Login");
const form_login=document.querySelector(".form-login");
const form_singUp=document.querySelector(".form-signUp");


input.forEach(inp => {
    inp.onblur=()=>{
        if(inp.value==""){
            inp.classList.add("warn-input");
            inp.parentElement.children[1].innerHTML="Bạn cần nhập đầy đủ!";
        }else{
            inp.classList.remove("warn-input");
            inp.parentElement.children[1].innerHTML="";
        }
    }
});

signUp_link.onclick=()=>{
    form_login.classList.add("form-hidden");
    form_login.classList.remove("form");
    form_singUp.classList.remove("form-hidden");
    form_singUp.classList.add("form");
}

login_link.onclick=()=>{
    form_singUp.classList.add("form-hidden");
    form_singUp.classList.remove("form");
    form_login.classList.remove("form-hidden");
    form_login.classList.add("form");
}


