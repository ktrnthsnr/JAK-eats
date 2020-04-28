//submit clicks
function redirectToSearch() {     
  // window.location.href = "search.html";  
  window.location.href = "index.html";   //updated to same page. Will add\remove div's rather than go through multiple pages.
}

//parallax initialization
  $(document).ready(function(){
    $('.parallax').parallax();
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('input#input_text, textarea#textarea2').characterCounter();
  });
  //test
  // input - reg

  // $(document).ready(function() {
  //   M.updateTextFields();
  // });

  // //  init with char count 
  // $(document).ready(function() {
  //   $('input#input_text, textarea#textarea2').characterCounter();
  // });
        
//parallax method
// var instance = M.Parallax.getInstance(elem);

//select button materialize
// $(document).ready(function(){
//   $('select').formSelect();
// });