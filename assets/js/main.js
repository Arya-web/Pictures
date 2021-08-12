//var fes_url = "https://holidays.abstractapi.com/v1/?api_key=758f549d9a154bd9875a3af63b0e1c0b&country=IN&year="+yyyy+"&month="+mm+"&day="+dd;
var query = "Coffee";
var tbm = "isch";
var ijn = 0;
var api_key = "af9c9a175c6c682785d6299202032e9b6348eb22e12ec539a0a3962cb0e3e7cc";
const d = new Date();
var month = ("0"+(d.getMonth()+1)).slice(-2);
var today = d.getFullYear()+"-"+month+"-"+d.getDate()

const arr = ["poster","vector","painting","sketch","quotes"]

$(document).ready(function(){
    $('#date').val(today);
    yyyy = d.getFullYear();
    mm = month;
    dd = d.getDay();

    $.ajax({
        method: 'GET',
        url: "https://holidays.abstractapi.com/v1/?api_key=758f549d9a154bd9875a3af63b0e1c0b&country=IN&year="+yyyy+"&month="+mm+"&day="+dd,
        success: function(data){
            console.log(data);
        }
    });

    $('#date').change(function(){
        chngDate = $('#date').val();
        yyyy = chngDate.slice(0,4);
        mm = chngDate.slice(5,7);
        dd = chngDate.slice(8,10)
        $.ajax({
            method: 'GET',
            url: "https://holidays.abstractapi.com/v1/?api_key=758f549d9a154bd9875a3af63b0e1c0b&country=IN&year="+yyyy+"&month="+mm+"&day="+dd,
            success: function(data){
                console.log(data);
                if(data!=""){
                    for(a=0; a<data.length ;a++){
                        console.log(data[a].name)
                    }
                    query = data[0].name;
                    $('#main').empty();
                    $.ajax({
                        method: 'GET',
                        url: "https://serpapi.com/search.json?engine=google&q="+query+"&tbm="+tbm+"&ijn="+ijn+"&api_key="+api_key,
                        success: function(data){
                            images = data.images_results;
                            for(i=0; i<images.length; i++){
                                $("#main").append(`<div class="col-6 col-sm-3">
                                <div class="card d-flex justify-content-center" style="padding: 0;">
                                    <img src="${images[i].thumbnail}" alt="Image${i}" class="img-fluid card-img-top">
                                </div></div>`)       
                            }
                        }
                    });
                }
            }
        });
    });

    

    $('#type').change(function(){
        $('#main').empty();
        toChange = query.split(/\s/);
        change = toChange[toChange.length-1];
        arr.forEach((e) => {
            if(e == change){
                query = toChange.slice(0, toChange.length-1).join(" ");
            }
        })
        query = query +" "+ $('#type').val();
        $.ajax({
            method: 'GET',
            url: "https://serpapi.com/search.json?engine=google&q="+query+"&tbm="+tbm+"&ijn="+ijn+"&api_key="+api_key,
            success: function(data){
                images = data.images_results;
                for(i=0; i<images.length; i++){
                    $("#main").append(`<div class="col-6 col-sm-3">
                    <div class="card d-flex justify-content-center" style="padding: 0;">
                        <img src="${images[i].thumbnail}" alt="Image${i}" class="img-fluid card-img-top">
                    </div></div>`)       
                }
            }
        })
    })


    
    var url = "https://serpapi.com/search.json?engine=google&q="+query+"&tbm="+tbm+"&ijn="+ijn+"&api_key="+api_key;
    
    $.ajax({
        method: 'GET',
        url: url,
        success: function(data){
            images = data.images_results;
            for(i=0; i<images.length; i++){
                $("#main").append(`<div class="col-6 col-sm-3">
                <div class="card d-flex justify-content-center" style="padding: 0;">
                    <img src="${images[i].thumbnail}" alt="Image${i}" class="img-fluid card-img-top">
                </div></div>`)       
            }
        }
    })

    $(window).scroll(function() {
        //console.log($(window).scrollTop()+ " " + $(document).height() + " " + $(window).height())
        if($(window).scrollTop() + 1 > $(document).height() - $(window).height()) {
               
                ijn = ijn + 1;
                url = "https://serpapi.com/search.json?engine=google&q="+query+"&tbm="+tbm+"&ijn="+ijn+"&api_key="+api_key;
                
                $.ajax({
                    method: 'GET',
                    url: url,
                    success: function(data){
                        images = data.images_results;
                        for(j=0; j<images.length; j++){
                            $("#main").append(`<div class="col-6 col-sm-3">
                            <div class="card d-flex justify-content-center" style="padding: 0;">
                                <img src="${images[j].thumbnail}" alt="Image${i+j}" class="img-fluid card-img-top">
                            </div></div>`)       
                        }
                        i = i + j;
                    },
                    error: function(xhr, status, error) {
                        console.log("Complete");
                        var msg = JSON.parse(xhr.responseText);
                        alert(status+" "+msg.Message+" "+error);            
                    }
                });      
               //console.log("Dead end!");
        }
    });


    $("#loading").hide();

    $(document).ajaxStart(function() {
        $("#loading").show();
        //console.log("start");
      });
      
    $(document).ajaxStop(function() {
        $("#loading").hide();
        //console.log("stop");
    });

});

function newQuery(){
    $('#main').empty();
    query = $('#inp').val();
    //clear input field
    //$('#inp').val("");

    url = "https://serpapi.com/search.json?engine=google&q="+query+"&tbm="+tbm+"&ijn="+ijn+"&api_key="+api_key;
    
    $.ajax({
        method: 'GET',
        url: url,
        success: function(data){
            images = data.images_results;
            for(i=0; i<images.length; i++){
                $("#main").append(`<div class="col-6 col-sm-3">
                <div class="card d-flex justify-content-center" style="padding: 0;">
                    <img src="${images[i].thumbnail}" alt="Image${i}" class="img-fluid card-img-top">
                </div></div>`)       
            }
        }
    })
    
}
