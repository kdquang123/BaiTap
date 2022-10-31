const login_btn=document.querySelector(".btn-login");
const input2 =login_btn.parentElement.querySelectorAll(".form-input")
var checkform;

login_btn.onclick=()=>{
      input2.forEach((inp)=>{
          if(inp.value==""){
            inp.classList.add("warn-input");
            inp.parentElement.children[1].innerHTML="Bạn cần nhập đầy đủ!";
            checkform =false;
          }else{
            checkform =true;
          }
      })
      var checkLog=true;
      if(checkform){
         var users= JSON.parse(localStorage.getItem("users"));
         var errorText="Sai mật khẩu hoặc tên đăng nhập!";
         
         users.forEach((user)=>{
              if(user.userName===input2[0].value && user.password===input2[1].value){
                localStorage.setItem("key",JSON.stringify(user));
                location.href="./home.html";
                checkLog=false;
              }
         })
         if(checkLog){
            login_btn.parentElement.querySelector('.checkMessage').innerHTML=errorText;
         }
         
      }
}
