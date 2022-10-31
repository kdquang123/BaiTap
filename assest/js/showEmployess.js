const main=document.querySelector('.row');


function getEmPloyess(){
    fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees')
    .then(function(response){
         return response.json();
    })
    .then(function(data){
           var count=0;
           main.innerHTML=(data.map((employee)=>{
            if(employee.unactive==false){
                count++;
                return `<div class="card">
                  <img class="card-img-top" src="${employee.avatar}" alt="">
                  <div class="card-body">
                      <h4 class="card-title">- ${employee.name}</h4>
                      <p class="card-text">- ${employee.position}</p>
                      <button type="button" class="btn btn-primary" onclick="showDetail(${employee.id})">Xem chi tiết <i class="fa-solid fa-angle-right"></i></button>
                  </div>
                 </div> `
            }
           })).join('');
           if(count>=6){
            document.querySelector('.container-fluid').style.height='auto';
           }else if(count==0){
            main.innerHTML='<p class="noEmployeesLog">Không có nhân viên nào!!!<p>';
           }
    })
}



function showDetail(id){
    
    fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees')
    .then(function(response){
         return response.json();
    })
    .then(function(data){
     
           main.innerHTML=` <div class="col-0 col-sm-0 col-md-0 col-lg-2"></div>
           <div class="col-12 col-sm-12 col-md-11 col-lg-8 detail-profile">`+(data.map((employee)=>{
            if(employee.id==id){
                return `<div class="layout1">
                <header>
                  <div class="avatar">
                     <img src="${employee.avatar}" alt="">
                  </div>
                  <!---->
                </header>
                <div class="detail-profile-body">
                  <p>${employee.name}</p>
                  <p>${employee.sex}</p>
                  <p>${employee.age}</p>
                </div>
                <div class="detail-profile-footer">
                   <button type="button" class="btn btn-danger" onclick="softDeleteEmployee(${employee.id},${employee.unactive})"><i class="fa-solid fa-trash"></i> Xóa</button>
                  <button type="button" class="btn btn-warning" onclick="editEmployee(${employee.id})"><i class="fa-solid fa-pen-to-square"></i> Sửa</button>
                </div>
      
              </div>
              <div class="layout2">
                <h3>Thông tin chi tiết</h3>
                <div class="layout2-body">
                  <div><i class="fa-solid fa-layer-group"></i>   ${employee.position}</div>
                  <div><i class="fa-solid fa-landmark"></i>   ${employee.department}</div>
                  <div><i class="fa-solid fa-map-location-dot"></i>   ${employee.address}</div>
                  <div><i class="fa-solid fa-phone"></i>   ${employee.phoneNumber}</div>
                  <div><i class="fa-solid fa-sack-dollar"></i>   ${employee.salary}</div></div>
              </div>
            </div> `
            }
           })).join('')+`<div class="col-0 col-sm-0 col-md-0 col-lg-2"></div>
           </div>`;

           document.querySelector('.container-fluid').style.height='900px';
           
           
    })
}


function softDeleteEmployee(id,isActive){
    isActive=true;
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
          alert('Xóa thành công!');
          location.href="./showEmployees.html";
        })
        .catch((error) => {
          console.error('Error:', error);
        })
}


function editEmployee(id){

  fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees')
  .then(function(response){
       return response.json();
  })
  .then(function(data){
         main.innerHTML=(data.map((employee)=>{
          if(employee.id==id){
              return `<div class="col-0 col-sm-1 col-md-1 col-lg-3"></div>
              <div class="col-12 col-sm-10 col-md-10 col-lg-6">
                  <form>
                      <h2>Sửa thông tin nhân viên</h2>
                      <div class="form-group">
                        <label for="fullName">Họ tên</label>
                        <input type="text" class="form-control" id="fullName" aria-describedby="emailHelp" placeholder="VD : Nguyễn Văn A" value="${employee.name}">
                        <span class="errorMessage"></span>
                      </div>
                      <div class="form-group row">
                         <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                          <label for="age">Tuổi</label>
                          <input type="text" class="form-control" id="Age" placeholder="VD : 18" value="${employee.age}">
                          <span class="errorMessage"></span>
                         </div>
                         <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                          <label for="sex">Giới tính</label><br>
                          <div class="form-check">
                              <label class="form-check-label">
                              <input type="radio" class="form-check-input" name="sex"  id="" value="Nam" ${employee.sex==='Nam'?'checked':''}>
                              Nam
                            </label>
                          </div>
                          <div class="form-check">
                              <label class="form-check-label">
                              <input type="radio" class="form-check-input" name="sex"  id="" value="Nữ" ${employee.sex==='Nữ'?'checked':''}>
                              Nữ
                            </label>
                          </div>
                         </div>
                        
                      </div>
                      <div class="form-group">
                          <label for="address">Địa chỉ</label>
                          <input type="text" class="form-control" id="address" placeholder="VD : Thạch Thất ,Hà Nội" value="${employee.address}">
                          <span class="errorMessage"></span>
                      </div>
                      <div class="form-group">
                          <label for="phoneNumber">Số điện thoại</label>
                          <input type="text" class="form-control" id="phoneNumber" placeholder="VD : 0321 111 222" value="${employee.phoneNumber}">
                          <span class="errorMessage"></span>
                      </div>
                      <div class="form-group">
                        <label for="department">Phòng ban</label>
                        <select class="form-control"  id="department">
                          <option> ${employee.department}</option>
                          <option>Phòng marketing</option>
                          <option>Phòng nhân sự</option>
                          <option>Phòng công nghệ thông tin</option>
                          <option>Phòng kinh doanh</option>
                          <option>Phòng kế toán</option>
                          <option>Phòng chăm sóc khách hàng</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="position">Chức vụ</label>
                        <select class="form-control"  id="position">
                          <option>${employee.position}</option>
                        </select>
                      </div>

                      <div class="form-group">
                          <label for="salary">Lương</label>
                          <input type="text" class="form-control" id="salary" placeholder="VD : 1000$" value="${employee.salary}">
                          <span class="errorMessage"></span>
                      </div>
               
                      <div class="form-group">
                          <label for="avatar">Ảnh</label><br>
                          <img src="${employee.avatar}" alt="">
                          <input type="text" class="form-control" id="avatar" placeholder="Chú ý : chỉ nhận link ảnh" value="${employee.avatar}">
                          <span class="errorMessage"></span>
                      </div>

                      <div class="form-group" style="display:none">
                          <label for="id">id</label>
                          <input type="text" class="form-control" id="id" value="${employee.id}">
                          <span class="errorMessage"></span>
                      </div>
                      
                      <input type="submit" class="btn btn-primary" value="Sửa">
                    </form>
              </div>
              <div class="col-0 col-sm-1 col-md-1 col-lg-3"></div> `
          }
         })).join('');
         document.querySelector('.container-fluid').style.height='auto';
         var scriptTag=document.createElement('script');
         scriptTag.src='../assest/js/editEmployee.js';

         document.querySelector('body').appendChild(scriptTag);
  })
}





getEmPloyess();