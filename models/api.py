from transformers import pipeline
# Using flask to make an api 
# import necessary libraries and functions 
from flask import Flask, jsonify, request 
from flask_cors import CORS, cross_origin

# creating a Flask app 
app = Flask(__name__) 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
  
# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/', methods = ['GET', 'POST']) 
def home(): 
    if(request.method == 'GET'): 
        data = "hello world"
        return jsonify({'data': data}) 
  
  
# A simple function to calculate the square of a number 
# the number to be squared is sent in the URL when we use GET 
# on the terminal type: curl http://127.0.0.1:5000 / home / 10 
# this returns 100 (square of 10) 
@app.route('/models/<string:text>', methods = ['GET']) 
@cross_origin()
def get_emotion_score(text):
    classifier = pipeline("text-classification", model="michellejieli/emotion_text_classifier")
    res = classifier(text)

    return jsonify({'data': res}) 
  
  
# driver function 
if __name__ == '__main__': 
    app.run(debug = True) 





