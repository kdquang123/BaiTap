const main=document.querySelector('.row');


function getEmPloyeesDeleted(){
    fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees')
    .then(function(response){
         return response.json();
    })
    .then(function(data){
          var count=0;
           main.innerHTML=(data.map((employee)=>{
            if(employee.unactive==true){
                count++;
                return `<div class="card">
                  <img class="card-img-top" src="${employee.avatar}" alt="">
                  <div class="card-body">
                      <h4 class="card-title">- ${employee.name}</h4>
                      <p class="card-text">- ${employee.position}</p>
                      <button type="button" class="btn btn-success" onclick="restoreEmployee(${employee.id},${employee.unactive})" title="Khôi phục"><i class="fa-solid fa-rotate-right"></i></button>
                      <button type="button" class="btn btn-danger" onclick="confirmDelete(${employee.id})" title="Xóa "><i class="fa-solid fa-trash"></i></button>
                  </div>
                 </div> `
            }
           })).join('');
           if(count>=6){
              document.querySelector('.container-fluid').style.height='auto';
           }else if(count==0){
            main.innerHTML='<p class="employeesDeletedLog">Không có nhân viên nào nghỉ việc!!!<p>';
           }
    })
}

function confirmDelete(id){
    document.querySelector('.mask').classList.add('mask-active');
    document.querySelector('.confirm-delete').classList.add('confirm-delete_action');
    document.querySelector('.confirm-delete .btn-warning').onclick=()=>{deleteEmployee(id)};
    document.querySelector('.confirm-delete .btn-dark').addEventListener('click',unconfirmDelete);
    document.querySelector('.mask').addEventListener('click',unconfirmDelete);
}


function unconfirmDelete(){
  document.querySelector('.mask').classList.remove('mask-active');
  document.querySelector('.confirm-delete').classList.remove('confirm-delete_action');
}


function deleteEmployee(id){
  fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees/' + id, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then((data)=>{
      alert('Xóa thành công');
      location.href='./employeesDeleted.html';
  })
}

function restoreEmployee(id,isActive){
    isActive=false;
    var data={
        unactive:isActive
    }
      fetch(`https://632b32b6713d41bc8e83354a.mockapi.io/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          alert('Khôi phục thành công!');
          location.href="./employeesDeleted.html";
        })
        .catch((error) => {
          console.error('Error:', error);
        })
}

getEmPloyeesDeleted();