from transformers import pipeline
from flask import Flask, jsonify, request 
from flask_cors import CORS, cross_origin

# creating a Flask app 
app = Flask(__name__) 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
  

"""
get_emotion_score

Returns an emotion score from the HuggingFace 
emotion_text_classifier model given a text input.
Output as an object with a single 'data' field. 
"""
@app.route('/models/<string:text>', methods = ['GET']) 
@cross_origin()
def get_emotion_score(text):
    classifier = pipeline("text-classification", model="michellejieli/emotion_text_classifier")
    res = classifier(text)

    return jsonify({'data': res}) 
  
  
# driver function 
if __name__ == '__main__': 
    app.run(debug = True) 





