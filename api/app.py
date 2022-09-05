import json
from multiprocessing.util import is_exiting
from flask import Flask,jsonify, request, current_app, url_for, abort
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['UPLOADS_DEFAULT_DEST'] =  os.getcwd() + '/set'

@app.route('/')
def hello_world():
   return 'Hello World'

@app.route('/upload',methods=['GET','POST'])
def upload_img():
    res = {
        "url" : "地址"
    }
    if not os.path.exists(app.config['UPLOADS_DEFAULT_DEST']):
        os.mkdir(app.config['UPLOADS_DEFAULT_DEST'])

    if request.files['cover']:
        file = request.files['cover']
        # 一般是时间戳加用户名的hash 乖不要模仿
        file.save(os.path.join(app.config['UPLOADS_DEFAULT_DEST'],file.filename))
    
        # 这里就改写一下路径之类的

    return jsonify({
        "url" : res["url"]
    })

if __name__ == '__main__':
   app.run()