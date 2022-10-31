const table=document.querySelector('.container-fluid .row div:nth-child(2)');

function getPositions(){
       var employees=[];

       fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees')
       .then(function(response){
             return response.json();
       })
       .then(function(employees){
               
              fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/positions')
              .then(function(response){
                   return response.json();
              })
              .then(function(data){

               dataInTable=(data.map((position)=>{

                     var dem=0;
                     employees.forEach(function(element){
                           if(element.position===position.name){
                                  dem++;
                           } 
                     });

                     return ` <tr>
                     <td>${position.id}</td>
                     <td>${position.name}</td>
                     <td>${position.department}</td>
                     <td>${dem}</td>
                     </tr>`
              })).join('');
                              
              table.innerHTML=` <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Mã chức vụ</th>
                  <th scope="col">Tên chức vụ</th>
                  <th>Phòng ban</th>
                  <th>Số lượng nhân viên</th>
                </tr>
              </thead>
              <tbody>${dataInTable}</tbody>
              </table>`;
              document.querySelector('.container-fluid').style.height='auto';
       })
              
       })


       
}

getPositions();



