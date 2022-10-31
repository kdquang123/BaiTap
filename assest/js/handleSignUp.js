const signUp_btn=document.querySelector(".btn-signUp");
const input1 =signUp_btn.parentElement.querySelectorAll(".form-input");
var checkform;

input1[3].onblur=()=>{
    if(input1[3].value!=="" && input1[3].value!==input1[2].value){
        input1[3].classList.add("warn-input");
        input1[3].parentElement.children[1].innerHTML="Nhập lại mật khẩu!";
    }else if(input1[3].value ==""){
        input1[3].classList.add("warn-input");
        input1[3].parentElement.children[1].innerHTML="Bạn cần điền đầy đủ!";
    }else if(input1[3].value!=="" && input1[3].value===input1[2].value){
        input1[3].classList.remove("warn-input");
        input1[3].parentElement.children[1].innerHTML="";
    }
}

signUp_btn.onclick=()=>{
      input1.forEach((inp)=>{
          if(inp.value==""){
            inp.classList.add("warn-input");
            inp.parentElement.children[1].innerHTML="Bạn cần điền đầy đủ!";
            checkform =false;
          }else{
            checkform =true;
          }
      })


      
      var checkUserExist=true;
      if(checkform){
        var errorText="Người dùng đã tồn tại!";
        var users=JSON.parse(localStorage.getItem("users"));
        users.forEach((user)=>{
            if(user.userName===input1[1].value){
                checkUserExist=false;
            }
        })

        if(checkUserExist){
            var newuser={
                id:users.length,
                fullName:input1[0].value,
                userName:input1[1].value,
                password:input1[2].value,
            };

            users.push(newuser);
            localStorage.setItem("users",JSON.stringify(users));
            location.href="./successSignUp.html";
        }else{
            signUp_btn.parentElement.querySelector(".checkMessage").innerHTML=errorText;
        }
        
      }
}