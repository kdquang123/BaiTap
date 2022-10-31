$(document).ready(function(){

   var checkSideBar=true;
   var checkSideBar2=false;
   var checkSideBar1=true;
   $(".side-bar .user p").html((JSON.parse(localStorage.getItem("key"))).fullName);

   $(".side-bar .user").click(function(){
      $(".side-bar .logout").slideToggle();
   })

   $(".side-bar .logout").click(function(){
    localStorage.removeItem("key");
    location.href="./login.html";
   })

   $("nav ul li:nth-child(1)").click(function(){
      if(window.innerWidth<=768){
            $(".side-bar").animate({left:'+=280px'},200);
            $('.mask').addClass('mask-action');
      }else{
         if(checkSideBar){
            $(".side-bar").animate({width:'-=200px'},200);
            $(".side-bar").addClass('side-bar-min');
            $(".side-bar-min header").html('HRM');
            $("nav").animate({left:'-=200px'},200);
            $(".container-fluid").animate({paddingLeft:'-=200px'},200);
            checkSideBar=false;
         }else{
            checkSideBar=true;
            $(".side-bar").animate({width:'+=200px'},200);
            $(".side-bar").removeClass('side-bar-min');
            $(".side-bar header").html('HRM App');
            $("nav").animate({left:'+=200px'},200);
            $(".container-fluid").animate({paddingLeft:'+=200px'},200);
            
         }
      }
      
      
   })


   $('.mask').click(function(){
      $(".side-bar").animate({left:'-=280px'},200);
      $('.mask').removeClass('mask-action');
   })


   $(".side-bar").hover(function(){
   
      if(window.innerWidth>768){ 
      if(!checkSideBar){
         $(".side-bar").animate({width:'+=200px'},200);
         $(".side-bar").removeClass('side-bar-min');
         $(".side-bar header").html('HRM App');
         $('.mask').addClass('mask-action');
         checkSideBar2=true;
      }
   }
   }
   ,function(){
      if(checkSideBar2)
     {
      $(".side-bar").animate({width:'-=200px'},200);
      $(".side-bar").addClass('side-bar-min');
      $(".side-bar-min header").html('HRM');
      $('.mask').removeClass('mask-action');
      checkSideBar2=false;
     }
   })


   $('.card-blue').click(function(){
      location.href='./showEmployees.html';
   })

   $('.card-green').click(function(){
      location.href="./showDepartment.html";
   })

   $('.card-yellow').click(function(){
      location.href="./listOfPositions.html";
   })

   $('.card-red').click(function(){
      location.href="./employeesDeleted.html";
   })
   
  });

