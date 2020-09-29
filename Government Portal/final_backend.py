
from flask import Flask,render_template,url_for,request
# import pickle
# import numpy as np
import smtplib

from google.cloud import storage
from firebase import firebase
import os

from firebase_admin import credentials

cred = credentials.Certificate("./pothole.json")
from firebase_admin import firestore
import firebase_admin
from firebase_admin import db


firebase_admin.initialize_app(
    cred, {"databaseURL": "https://pothole-detection-6f50d.firebaseio.com"}
)
db = firestore.client()

app=Flask(__name__)

# model=pickle.load(open('model.pkl','rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict/',methods=['POST'])
def predict():
    response = request.get_json()
    latitude = response["latitude"]
    print(latitude)
    return "Done"

@app.route('/sending/',methods=['POST'])
def sending():
    # pot_lat=30
    # pot_long=78
    response = request.get_json()
    pot_lat = float(response["latitude"])
    pot_long = float(response["longitude"])
    eng_lat=[]
    eng_long=[]
    eng_email=[]
    users_ref = db.collection(u"engineers")
    docs = users_ref.stream()
    for doc in docs:
        # print(doc.to_dict())
        eng_lat.append(float(doc.to_dict()['latitude']))
        eng_long.append(float(doc.to_dict()['longitude']))
        eng_email.append(doc.to_dict()['email'])
    subtracted_lat=[]
    for i in range(len(eng_email)):
        x=abs(eng_lat[i]-pot_lat)
        subtracted_lat.append(x)
        # final_long=eng_long[i]-pot_long
    print(subtracted_lat)
    # print(subtracted_lat.index(min(subtracted_lat)))
    index=subtracted_lat.index(min(subtracted_lat))
        # bestEmail=
        # bestLat=
        # bestLong=
    # print(eng_lat)
    # print(eng_long)
    # print(eng_email)
    emailid=eng_email[index]
    smtpserver = smtplib.SMTP("smtp.gmail.com", 587)
    smtpserver.ehlo()
    smtpserver.starttls()
    smtpserver.ehlo()
    smtpserver.login('emailID', 'Password')

    # message to be sent 
    message = "There is a Pothole at Latitude="+str(pot_lat)+" and Longitude="+str(pot_long)+" .Please Take Care of it. Thank you."
    
    # sending the mail 
    smtpserver.sendmail("emailID", ""+emailid, message) 
 
    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)