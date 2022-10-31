const form=document.querySelector('form');
const submitBtn=document.querySelector('input[type="submit"]');


function validateAndSubmit(){
   const formGroup=document.querySelectorAll('.form-group');
   const sexInp=(formGroup[1].querySelector('div:nth-child(2)')).querySelectorAll('.form-check-label input');
   var checkValidate=true;
   
   form.onsubmit=(e)=>{
    e.preventDefault();
   }
   submitBtn.onclick=()=>{
      checkValidate=true;
       for(var i=0;i<formGroup.length;i++){
            if(i===1 || i===4 || i===5){
                 if(i==1 && formGroup[1].querySelector('.row>div input').value===""){
                  formGroup[1].querySelector('span').innerHTML="Bạn phải nhập đầy đủ!"
                  formGroup[1].classList.add('form-error');
                  checkValidate=false;
                 }else{
                  if(i==1 && (Number(formGroup[1].querySelector('div:nth-child(1) input').value)<18 || Number(formGroup[i].querySelector('div:nth-child(1) input').value)>60)){
                     formGroup[1].querySelector('span').innerHTML="Tuổi không phù hợp";
                     formGroup[1].classList.add('form-error');
                     checkValidate=false;
                  }else{
                     formGroup[1].querySelector('span').innerHTML="";
                     formGroup[1].classList.remove('form-error');
                  }
           
                }
            
            }else{
               if(formGroup[i].querySelector('input').value===''){
                 formGroup[i].querySelector('span').innerHTML="Bạn phải nhập đầy đủ!"
                 formGroup[i].classList.add('form-error');
                 checkValidate=false;
               }else if(i==3 || i==6){
                  var regexPhoneNumber=/^[0]\d{3} \d{3} \d{3}$/;
                  var regexSalary=/^\d{1,4}[$]$/;
                  if(i==3 && !(regexPhoneNumber.test(formGroup[3].querySelector('input').value))){
                     formGroup[3].querySelector('span').innerHTML="Số điện thoại nhập chưa đúng định dạng!";
                     formGroup[3].classList.add('form-error');
                     checkValidate=false;
                  }else if(i==3 && regexPhoneNumber.test(formGroup[3].querySelector('input').value)){
                     formGroup[3].querySelector('span').innerHTML="";
                     formGroup[3].classList.remove('form-error');
                  }

                  if(i==3 && !(regexSalary.test(formGroup[6].querySelector('input').value))){
                     formGroup[6].querySelector('span').innerHTML="Lương nhập chưa đúng định dạng!";
                     formGroup[6].classList.add('form-error');
                     checkValidate=false;
                  }else if(i==3 && regexSalary.test(formGroup[6].querySelector('input').value)){
                     formGroup[6].querySelector('span').innerHTML="";
                     formGroup[6].classList.remove('form-error');
                  }
               }else{
                  formGroup[i].querySelector('span').innerHTML=""
                  formGroup[i].classList.remove('form-error');
               }
            }
       }

     if(checkValidate){
      var urlImg=formGroup[7].querySelector('input').value;
        if(!UrlExists(urlImg)){
            urlImg='../assest/img/placeholder.png';
        }
      const data={
         name:formGroup[0].querySelector('input').value,
         age:formGroup[1].querySelector('div:nth-child(1) input').value,
         sex:sexInp[0].checked?sexInp[0].value:sexInp[1].value,
         phoneNumber:formGroup[3].querySelector('input').value,
         position:formGroup[5].querySelector('select').value,
         department:formGroup[4].querySelector('select').value,
         salary:formGroup[6].querySelector('input').value,
         address:formGroup[2].querySelector('input').value,
         avatar:urlImg
      };

      fetch(`https://632b32b6713d41bc8e83354a.mockapi.io/api/employees/${formGroup[8].querySelector('input').value}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
       })
         .then((response) => response.json())
         .then((data) => {
           console.log('Success:', data);
           alert('Sửa thành công');
           location.href="./showEmployees.html";
         })
         .catch((error) => {
           console.error('Error:', error);
         });
     }
   }


   formGroup[7].querySelector('input').oninput=(e)=>{
     formGroup[7].querySelector('img').src=formGroup[7].querySelector('input').value;
   }




   sexInp[0].onclick=()=>{
       sexInp[0].checked=true;
       sexInp[1].checked=false;
   }

   sexInp[1].onclick=()=>{
      sexInp[0].checked=false;
      sexInp[1].checked=true;
  }

   formGroup[4].querySelector('select').onchange=()=>{
      fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/positions')
      .then(function(res){
         return res.json();
      })
      .then(function(data){
          var selectPosition=(data.map(function(position){
               if(position.department===formGroup[4].querySelector('select').value){
                return `<option>${position.name}</option>`
               }
          }).join(' '))

          formGroup[5].querySelector('select').innerHTML=selectPosition;
      })
   }
   
}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


validateAndSubmit();