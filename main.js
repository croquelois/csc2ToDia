$(function(){
  function scrollTo(elem){
    $([document.documentElement, document.body]).animate({
      scrollTop: $(elem).offset().top
    }, 500);
  }
  $("#toJSON").click(function(){
    $("#diaBox").hide();
    $("#jsonBox").hide();
    $("#errBox").hide();
    let txt = $("#csc2").val();
    try {
      let res = parse(txt);
      res = JSON.stringify(res,"",2);
      $("#jsonBox").show();
      $("#json").empty().text(res);
      scrollTo("#jsonBox");
    }catch(err){
      $("#errBox").show();
      $("#err").empty().text(err.message);
      scrollTo("#errBox");
      throw err;
    }
  });
  $("#jsontoDia").click(function(){
    $("#diaBox").hide();
    $("#jsonBox").hide();
    $("#errBox").hide();
    let txt = $("#csc2").val();
    try {
      let res = parse(txt);
      $("#jsonBox").show();
      $("#json").empty().text(JSON.stringify(res,"",2));
      res = DIA.build(res);
      $("#diaBox").show();
      $("#dia").empty().text(res);
      scrollTo("#diaBox");
    }catch(err){
      $("#errBox").show();
      $("#err").empty().text(err.message);
      scrollTo("#errBox");
      throw err;
    }
  });
  $("#toDia").click(function(){
    $("#diaBox").hide();
    $("#jsonBox").hide();
    $("#errBox").hide();
    let txt = $("#csc2").val();
    try {
      let res = parse(txt);
      res = DIA.build(res);
      $("#diaBox").show();
      $("#dia").empty().text(res);
      scrollTo("#diaBox");
    }catch(err){
      $("#errBox").show();
      $("#err").empty().text(err.message);
      scrollTo("#errBox");
      throw err;
    }
  });
});