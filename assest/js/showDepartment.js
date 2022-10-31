const table=document.querySelector('.container-fluid .row div:nth-child(2)');

function getDepartment(){

       fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/employees')
       .then(function(response){
             return response.json();
       })
       .then(function(employees){
              
              fetch('https://632b32b6713d41bc8e83354a.mockapi.io/api/department')
              .then(function(response){
                   return response.json();
              })
              .then(function(data){
                     table.innerHTML=`<table class="table table-bordered">
                     <thead class="thead-dark">
                       <tr>
                         <th scope="col">Mã phòng ban</th>
                         <th scope="col">Tên phòng ban</th>
                         <th>Số lượng nhân viên</th>
                       </tr>
                     </thead>
                     <tbody>`+((data.map(function(department){
                            var dem=0;
                            employees.forEach(function(element){
                                  if( element.department==department.name){
                                    dem+=1;
                                  }
                            });

                            return ` <tr>
                            <td>${department.id}</td>
                            <td>${department.name}</td>
                            <td>${dem}</td>
                            </tr>`
                     })).join(''))+` </tbody>
                     </table>`;
              })
             
       })

     
}

getDepartment();



