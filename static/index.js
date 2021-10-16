var preurl="";

var default_back="https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
var default_person="https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png"
var default_poster="https://cinemaone.net/images/movie_placeholder.png";
var w780="https://image.tmdb.org/t/p/w780/"
var w185="https://image.tmdb.org/t/p/w185/"
click_home=function(){
    var home=document.getElementById("home").style;
    home.borderBottomColor="white";
    home.color="#B40404";
    var search=document.getElementById("search").style;
    search.borderBottomColor="black";
    search.color="white";
document.getElementById("homeCont").style.display="flex";
document.getElementById("searchCont").style.display="none";
    var mainheight=document.getElementById("homeCont").offsetHeight;
    document.getElementById("bar").style.height=(mainheight+40).toString()+"px";
    document.getElementById("buttomred").style.marginTop="0px";
    }
click_search=function (){
    var home=document.getElementById("home").style;
    home.borderBottomColor="black";
    home.color="white";
    var search=document.getElementById("search").style;
    search.borderBottomColor="white";
    search.color="#B40404";

document.getElementById("homeCont").style.display="none";
document.getElementById("searchCont").style.display="flex";
var rvale=document.getElementById("results").length;

var mainheight=document.body.offsetHeight;
var contheight=document.getElementById("searchCont").offsetHeight;
var boxheight=document.getElementById("searchexcel").offsetHeight;
if(contheight>mainheight){
    document.getElementById("bar").style.height=(contheight+40).toString()+"px";
    document.getElementById("buttomred").style.marginTop="0px";
}
else{
document.getElementById("bar").style.height=(mainheight-30).toString()+"px";
document.getElementById("buttomred").style.marginTop=(mainheight-contheight-70).toString()+"px";}
}
window.onload=function (){
    var mainheight=document.getElementById("homeCont").offsetHeight;
    var searchmainheight=document.getElementById("searchCont").offsetHeight;
    document.getElementById("bar").style.height=(mainheight+40).toString()+"px";
   var x=new XMLHttpRequest();
   url=preurl+"Trending";
   console.log(url)
   var data;
    x.open('get',url);
    x.send();
    x.onreadystatechange=function (){
        if(x.readyState==4 &&x.status==200){
         data=JSON.parse(x.responseText);
          var  n=0;
          console.log(data)
          setInterval(function (){
         var movie=document.getElementById("moviepic");
         if(data.results[n].backdrop_path)
         {movie.style.backgroundImage="url(https://image.tmdb.org/t/p/w780/"+data.results[n].backdrop_path+")";}
         else {movie.style.backgroundImage="url("+default_back+")";}


         var date=data.results[n].release_date.substring(0,4);
         if(!date||date==""){date="N/A"}

         if(data.results[n].name)
         {document.getElementById("movietxt").innerHTML=data.results[n].title+"("+date+")";}
         else
         {document.getElementById("movietxt").innerHTML="N/A("+date+")";}
         if(n<5)
              n++;
          else
              n=0;
         },2000)
        }
        else {
        }
    }
    var y=new XMLHttpRequest();
   url=preurl+"TV_Airing";
   var data2;
    y.open('get',url);
    y.send();
    y.onreadystatechange=function (){
        if(y.readyState==4 &&y.status==200){
          var  n=0;
          setInterval(function (){

         data2=JSON.parse(y.responseText);
         var tvshow=document.getElementById("tvshowpic");

         if(data2.results[n].backdrop_path)
         {tvshow.style.backgroundImage="url(https://image.tmdb.org/t/p/w780/"+data2.results[n].backdrop_path+")";}
         else {tvshow.style.backgroundImage="url("+default_back+")";}

         var date=data2.results[n].first_air_date.substring(0,4);
         if(!date||date==""){date="N/A"}

         if(data2.results[n].name)
         {document.getElementById("tvshowtxt").innerHTML=data2.results[n].name+"("+date+")";}
         else
         {document.getElementById("tvshowtxt").innerHTML=+"N/A("+date+")";}

         if(n<5)
              n++;
          else
              n=0;},2000)
        }
        else {
        }
    }

}
submit_search=function (callback){
document.getElementById("homeCont").style.display="none";
document.getElementById("searchCont").style.display="flex";
var keyword=document.getElementById("keyword");
    var category=document.getElementById("category");
    var keylenght=keyword.value.trim().length

    if(keyword.value==""||category.value=="0"||keylenght==0){
        alert("Please enter valid values.");
        return false;
    }
    else{
        url=preurl+"search/"+keyword.value.replace(/\s+/g,"%20")+"/"+category.value
        console.log(url)
        var x=new XMLHttpRequest();
        var data;
        x.open('get',url);
        x.send();
        x.onreadystatechange=function (){
            if(x.readyState==4 && x.status==200){
                data=JSON.parse(x.responseText);
                results=data.results;
                if(results.length==0)
                {document.getElementById("showresults").style.display="none";
                document.getElementById("results").innerHTML="";
                document.getElementById("noresult").style.display="flex";
                var mainheight=document.body.clientHeight;
                var boxheight=document.getElementById("searchCont").offsetHeight;
                document.getElementById("bar").style.height=(mainheight-30).toString()+"px";
                document.getElementById("buttomred").style.marginTop=(mainheight-boxheight-70).toString()+"px";}
                else{
                    document.getElementById("showresults").style.display="flex";
                document.getElementById("noresult").style.display="none";
                callback(category.value,results,get_movie_genres)
                }
            }
        }
        return false;
    }
}
get_tv_genres=function (cate,results,callback){
   var x=new XMLHttpRequest();
   url=preurl+"tv/genres";
   var data;
    x.open('get',url);
    x.send();
   x.onreadystatechange=function (){
        if(x.readyState==4 &&x.status==200){
         data=JSON.parse(x.responseText);
         callback(cate,results,data,list_results)
        }
        else {
        }
}
}
get_movie_genres=function (cate,results,tv_genres,callback){
   var x=new XMLHttpRequest();
   url=preurl+"movie/genres";
   var data;
    x.open('get',url);
    x.send();
   x.onreadystatechange=function (){
        if(x.readyState==4 &&x.status==200){
         data=JSON.parse(x.responseText);
         callback(cate,results,tv_genres,data)
        }
        else {
        }
}
}
list_results=function (cate,results,tv_genres,movie_genres){
    var tv_dic = {};
    var movie_dic={};
    for (var i in tv_genres.genres){
        var k=tv_genres.genres[i].id
        var v=tv_genres.genres[i].name
        tv_dic[k]=v;
    }
    for (var i in movie_genres.genres){
    var k=movie_genres.genres[i].id
    var v=movie_genres.genres[i].name
    movie_dic[k]=v;
    }
    //console.log("tvg",tv_dic,tv_genres.genres)
    //console.log("movieg",movie_dic,movie_genres.genres)
    if(cate=="movie"){
         var newlist=""
                var counter=0
                while(counter<results.length && counter<10){ //console.log(results[counter])
                    var poster="https://image.tmdb.org/t/p/w185/"
                    if(results[counter].poster_path==null)
                    {poster="https://cinemaone.net/images/movie_placeholder.png"}
                    else
                        {poster+=results[counter].poster_path}

                    var catelist=""
                    for(var i in results[counter].genre_ids)
                    {catelist+=movie_dic[results[counter].genre_ids[i]]+", "}
                    catelist=catelist.substring(0,catelist.length-2)
                    if(catelist==""){catelist="N/A"}

                    var used_date
                    if(results[counter].release_date==""||!results[counter].release_date)
                    {  used_date="N/A"}
                    else{
                        used_date=results[counter].release_date.substring(0,4)
                    }

                    var overview
                    if(results[counter].overview==""||!results[counter].overview){overview="N/A"}
                    else{overview=results[counter].overview}

                    newlist+="<div class='result'>"
                    newlist+="<div class='resultpic'><img src='"+poster+"' width='130px' height='200px'></div>"
                    newlist+="<div class='resultdetail'>"
                    newlist+="<h2 class='resultitle'>"+results[counter].title+"</h2>"
                    newlist+="<p class='timeandcate'>"+used_date+" | "+catelist+"<br>"
                    newlist+="<span class='score'>&#9733</span>"
                    newlist+="<span class='score'>"+Number(results[counter].vote_average)/2+"&nbsp;</span>"
                    newlist+="<span class='nopeople'>"+results[counter].vote_count+"</span>"
                    newlist+="<span class='nopeople'>&nbsp;votes</span><br><br>"
                    newlist+="</p>"
                    newlist+="<p class='resultcontent'>"+overview+"</p>"
                    newlist+=" <button class='showbutton' value='"+results[counter].id+"' onclick='get_detail(\"movie\",this.value,show_page)'>Show more&nbsp;</button>"
                    newlist+="</div></div>"
                    counter+=1

                }
                document.getElementById("results").innerHTML=newlist
    }
    else if(cate=="tv"){
         var newlist=""
                var counter=0
                while(counter<results.length && counter<10){ //console.log(results[counter])
                    var poster="https://image.tmdb.org/t/p/w185/"
                    if(results[counter].poster_path==null){
                        poster="https://cinemaone.net/images/movie_placeholder.png"
                    }
                    else{
                        poster+=results[counter].poster_path
                    }
                    var catelist=""
                    for(var i in results[counter].genre_ids){
                        catelist+=tv_dic[results[counter].genre_ids[i]]+", "
                    }
                    catelist=catelist.substring(0,catelist.length-2)
                    if(catelist==""){catelist="N/A"}

                    var used_date
                    if(results[counter].first_air_date==""||!results[counter].first_air_date){used_date="N/A"}
                    else{used_date=results[counter].first_air_date.substring(0,4)}

                    var overview
                    if(results[counter].overview==""||!results[counter].overview){overview="N/A"}
                    else{overview=results[counter].overview}
                    newlist+="<div class='result'>"
                    newlist+="<div class='resultpic'><img src='"+poster+"' width='130px' height='200px'></div>"
                    newlist+="<div class='resultdetail'>"
                    newlist+="<h2 class='resultitle'>"+results[counter].name+"</h2>"
                    newlist+="<p class='timeandcate'>"+used_date+" | "+catelist+"<br>"
                    newlist+="<span class='score'>&#9733</span>"
                    newlist+="<span class='score'>"+Number(results[counter].vote_average)/2+"&nbsp;</span>"
                    newlist+="<span class='nopeople'>"+results[counter].vote_count+"</span>"
                    newlist+="<span class='nopeople'>&nbsp;votes</span><br><br>"
                    newlist+="</p>"
                    newlist+="<p class='resultcontent'>"+overview+"</p>"
                    newlist+=" <button class='showbutton' value='"+results[counter].id+"' onclick='get_detail(\"tv\",this.value,show_page)'>Show more&nbsp;</button>"
                    newlist+="</div></div>"
                    counter+=1

                }
                document.getElementById("results").innerHTML=newlist
    }
    else if(cate=="multi"){
         var newlist=""
                var counter=0
                while(counter<results.length && counter<10){ //console.log(results[counter])
                    var poster="https://image.tmdb.org/t/p/w185/"
                    if(results[counter].poster_path==null){
                        poster="https://cinemaone.net/images/movie_placeholder.png"
                    }
                    else{
                        poster+=results[counter].poster_path
                    }
                    if(results[counter].media_type=="movie"){
                     var catelist=""
                    for(var i in results[counter].genre_ids){
                        catelist+=movie_dic[results[counter].genre_ids[i]]+", "
                    }
                    catelist=catelist.substring(0,catelist.length-2)
                    if(catelist==""){catelist="N/A"}

                    var used_date
                    if(results[counter].release_date==""||!results[counter].release_date)
                    {  used_date="N/A"}
                    else{used_date=results[counter].release_date.substring(0,4)}

                    var overview
                    if(results[counter].overview==""||!results[counter].overview){overview="N/A"}
                    else{overview=results[counter].overview}
                    newlist+="<div class='result'>"
                    newlist+="<div class='resultpic'><img src='"+poster+"' width='130px' height='200px'></div>"
                    newlist+="<div class='resultdetail'>"
                    newlist+="<h2 class='resultitle'>"+results[counter].title+"</h2>"
                    newlist+="<p class='timeandcate'>"+used_date+" | "+catelist+"<br>"
                    newlist+="<span class='score'>&#9733</span>"
                    newlist+="<span class='score'>"+Number(results[counter].vote_average)/2+"&nbsp;</span>"
                    newlist+="<span class='nopeople'>"+results[counter].vote_count+"</span>"
                    newlist+="<span class='nopeople'>&nbsp;votes</span><br><br>"
                    newlist+="</p>"
                    newlist+="<p class='resultcontent'>"+overview+"</p>"
                    newlist+=" <button class='showbutton' value='"+results[counter].id+"' onclick='get_detail(\"movie\",this.value,show_page)'>Show more&nbsp;</button>"
                    newlist+="</div></div>"
                    }
                    else if(results[counter].media_type=="tv"){
                         var catelist=""
                    for(var i in results[counter].genre_ids){
                        catelist+=tv_dic[results[counter].genre_ids[i]]+", "
                    }
                    catelist=catelist.substring(0,catelist.length-2)
                        if(catelist==""){catelist="N/A"}

                    var used_date
                    if(results[counter].first_air_date==""||!results[counter].first_air_date){used_date="N/A"}
                    else{used_date=results[counter].first_air_date.substring(0,4)}

                    var overview
                    if(results[counter].overview==""||!results[counter].overview){overview="N/A"}
                    else{overview=results[counter].overview}
                        newlist+="<div class='result'>"
                    newlist+="<div class='resultpic'><img src='"+poster+"' width='130px' height='200px'></div>"
                    newlist+="<div class='resultdetail'>"
                    newlist+="<h2 class='resultitle'>"+results[counter].name+"</h2>"
                    newlist+="<p class='timeandcate'>"+used_date+" | "+catelist+"<br>"
                    newlist+="<span class='score'>&#9733</span>"
                    newlist+="<span class='score'>"+Number(results[counter].vote_average)/2+"&nbsp;</span>"
                    newlist+="<span class='nopeople'>"+results[counter].vote_count+"</span>"
                    newlist+="<span class='nopeople'>&nbsp;votes</span><br><br>"
                    newlist+="</p>"
                    newlist+="<p class='resultcontent'>"+overview+"</p>"
                    newlist+=" <button class='showbutton' value='"+results[counter].id+"' onclick='get_detail(\"tv\",this.value,show_page)'>Show more&nbsp;</button>"
                    newlist+="</div></div>"
                    }
                    counter+=1

                }
                document.getElementById("results").innerHTML=newlist
    }
    var mainheight=document.getElementById("searchCont").offsetHeight;
     var barheight=document.getElementById("bar").offsetHeight;
     var screen=document.body.clientHeight
     if(mainheight>barheight){
         document.getElementById("bar").style.height=(mainheight+40).toString()+"px"
         document.getElementById("buttomred").style.marginTop="0px";
     }
     else{
        document.getElementById("bar").style.height=(screen-30).toString()+"px"
         document.getElementById("buttomred").style.marginTop=(screen-mainheight-70).toString()+"px"
     }

}
click_clear=function (){
    document.getElementById("results").innerHTML=""
    document.getElementById("showresults").style.display="none"
    document.getElementById("noresult").style.display="none"
    var mainheight=document.body.clientHeight;
    var boxheight=document.getElementById("searchCont").offsetHeight;
    document.getElementById("bar").style.height=(mainheight-30).toString()+"px";
    document.getElementById("buttomred").style.marginTop=(mainheight-boxheight-70).toString()+"px";
}
get_detail=function (cate,id,callback) {
    var x = new XMLHttpRequest();
    url = preurl+"detail/"+cate+"/"+id;
    console.log(url)
    var data;
    x.open('get', url);
    x.send();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200) {
            data = JSON.parse(x.responseText);
            callback(cate,data)
        } else {
        }
    }
}
show_page=function (cate,data){
    var genre_data=data.genres.genres;
    var genres={}
    for (var i in genre_data){
        genres[genre_data[i].id]=genre_data[i].name
    }
    console.log(data)
    var pic=document.getElementById("video_pic");
    var title=document.getElementById("the_title");
    var link=document.getElementById("the_link");
    var time_cate=document.getElementById("time_cate");
    var score=document.getElementById("detail_score");
    var nopeople=document.getElementById("detail_nopeople");
    var content=document.getElementById("detail_content");
    var language=document.getElementById("detail_language");
    var casts=document.getElementById("cast_list")
    var reviews=document.getElementById("reviews")
    var the_cast=""
    var the_review=""

    var the_title="N/A";
    var the_link="N/A"; //may should be change
    var the_time="N/A";
    var the_score="0.00";
    var the_nopeople="0";
    var the_content="";
    var the_language="N/A";
    var the_fic="N/A";

    if(!data.detail.backdrop_path||data.detail.backdrop_path=="")
    {var the_pic=default_back}
    else
    {var the_pic=w780+data.detail.backdrop_path;}

    if(data.detail.genres.length!=0){
        the_fic="";
        for(var i in data.detail.genres){
            the_fic+=genres[data.detail.genres[i].id]+", "
        }
        the_fic=the_fic.substring(0,the_fic.length-2)
    }

    if(data.detail.spoken_languages.length!=0){
        the_language="";
        for(var i in data.detail.spoken_languages){
            the_language+=data.detail.spoken_languages[i].english_name+", "
        }
        the_language=the_language.substring(0,the_language.length-2)
    }

    if(data.detail.homepage!=""&&data.detail.homepage)
        {the_link=data.detail.homepage;}
    if(data.detail.vote_average!=""&&data.detail.vote_average)
        {the_score=Number(data.detail.vote_average);}
    if(data.detail.vote_count!=""&&data.detail.vote_count)
        {the_nopeople=data.detail.vote_count;}
    if(data.detail.overview!=""&&data.detail.overview)
        {the_content=data.detail.overview;}

    if(cate=="movie"){
        if(data.detail.title!=""&&data.detail.title){the_title=data.detail.title;}
        if(data.detail.release_date!=""&&data.detail.release_date){the_time=data.detail.release_date.substring(0,4);}
    }
    else{
        if(data.detail.name!=""&&data.detail.name){the_title=data.detail.name;}
        if(data.detail.first_air_date!=""&&data.detail.first_air_date){the_time=data.detail.first_air_date.substring(0,4);}
    }
    if(data.casts.cast.length!=0){
    var cast1="<div class=\"cast\" ><img class=\"cast_pic\" src='"
    var cast2="'><div class=\"cast_info\"><span class=\"cast_name\">"
    var cast3="<br></span><span class=\"role_name\">AS<br>"
    var cast4="</span></div></div>"
    for(var i in data.casts.cast){
        if(i==8){break}
        if(data.casts.cast[i].profile_path==null)
        {var castpic=default_person}
        else
        {var castpic=w185+data.casts.cast[i].profile_path;}
        the_cast+=cast1+castpic+cast2+data.casts.cast[i].name+cast3+data.casts.cast[i].character+cast4
    }
    casts.innerHTML=the_cast
    }
    else{
        document.getElementById("cast_title").innerText="Cast:N/A"
    }

    if(data.reviews.results.length!=0){
    var review1="<div class=\"review\"><div class=\"review_basic\"><span class=\"reviewer\">"
    var review2="</span><span class=\"review_date\">&nbsp;on&nbsp;</span><span class=\"review_date\">"
    var review3="</span><br></div> <div class=\"review_detail\"> "
    var review31="<span class=\"review_score\">&#9733 "
    var review32="/5</span><br>"
    var review4="<span class=\"review_content\">"
    var review5="</span> </div><hr class=\"divider\"/></div>"
    for(var i in data.reviews.results){
        var created_at=data.reviews.results[i].created_at
        var the_date=created_at.substring(5,7)+"/"+created_at.substring(8,10)+"/"+created_at.substring(0,4)
        if(i==5){break}
        if(data.reviews.results[i].author_details.rating==null){
            the_review+=review1+data.reviews.results[i].author+review2+the_date+review3+review4+data.reviews.results[i].content+review5
        }
        else {
            var ratescore=Number(data.reviews.results[i].author_details.rating)/2
            the_review+=review1+data.reviews.results[i].author+review2+the_date+review3+review31+ratescore.toString()+review32+review4+data.reviews.results[i].content+review5
        }
    }
    reviews.innerHTML=the_review
    }
    else{
    document.getElementById("review_title").innerText="Reviews:N/A"
    }

    pic.innerHTML="<img src='"+the_pic+"' width=\"98%\" >"
    title.innerText=the_title
    link.href=the_link
    time_cate.innerText=the_time+" | "+the_fic
    score.innerText=the_score/2
    nopeople.innerText=the_nopeople
    content.innerText=the_content
    language.innerText=the_language

document.body.style.overflow="hidden"
 document.getElementById('subwindow').style.top=document.documentElement.scrollTop.toString()+'px';
    document.getElementById('close').style.display='block';
    document.getElementById('subwindow').style.display='block';



}

close_window=function (){
    document.getElementById('subwindow').style.display='none';
    document.getElementById('close').style.display='none'
    document.getElementById("cast_title").innerText="Cast"
    document.getElementById("review_title").innerText="Reviews"
    document.getElementById("cast_list").innerHTML=""
    document.getElementById("reviews").innerHTML=""
    document.body.style.overflow="auto"
}
