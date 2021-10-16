import json
from flask import Flask
import requests
app=Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/Trending')
def get_movie():
    url='https://api.themoviedb.org/3/trending/movie/week?api_key=d1f3a3e0c1f3479de748de8c812906a9'
    res=requests.get(url)
    data=json.loads(res.text)
    return data

@app.route('/TV_Airing')
def get_tvairing():
    url='https://api.themoviedb.org/3/tv/airing_today?api_key=d1f3a3e0c1f3479de748de8c812906a9'
    res=requests.get(url)
    data=json.loads(res.text)
    return data

@app.route('/search/<keyword>/<category>')
def search_video(keyword,category):
    url='https://api.themoviedb.org/3/search/'+category+'?api_key=d1f3a3e0c1f3479de748de8c812906a9&query='+keyword+'&language=en-US&page=1&include_adult=false'
    res = requests.get(url)
    data = json.loads(res.text)
    return data

@app.route('/movie/genres')
def get_movie_genres():
    url="https://api.themoviedb.org/3/genre/movie/list?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    res = requests.get(url)
    data = json.loads(res.text)
    return data

@app.route('/tv/genres')
def get_tv_genres():
    url="https://api.themoviedb.org/3/genre/tv/list?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    res = requests.get(url)
    data = json.loads(res.text)
    return data

@app.route('/detail/<cate>/<id>')
def get_detail(cate,id):
    url="https://api.themoviedb.org/3/"+cate+"/"+id+"?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    res = requests.get(url)
    detail = json.loads(res.text)
    url = "https://api.themoviedb.org/3/" + cate + "/" + id + "/credits?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    res = requests.get(url)
    casts = json.loads(res.text)
    url = "https://api.themoviedb.org/3/" + cate + "/" + id + "/reviews?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    res = requests.get(url)
    reviews = json.loads(res.text)
    if cate=="movie":
        url="https://api.themoviedb.org/3/genre/movie/list?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    else:
        url = "https://api.themoviedb.org/3/genre/tv/list?api_key=d1f3a3e0c1f3479de748de8c812906a9&language=en-US"
    res = requests.get(url)
    genres = json.loads(res.text)
    data={"detail":detail,
          "casts":casts,
          "reviews":reviews,
          "genres":genres}
    return data
if __name__=='__main__':
    app.run()