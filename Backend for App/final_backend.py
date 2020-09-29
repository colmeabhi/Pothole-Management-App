from flask import Flask,render_template,url_for,request, jsonify
# from flask_cors import CORS, cross_origin
from flask_ngrok import run_with_ngrok
import cv2
import urllib.request
import numpy as np
import cv2
import glob
import reverse_geocoder as rg 
import pprint 
from google.cloud import storage
# from keras.models import Sequential
# from keras.models import load_model
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
# from keras.utils import np_utils
import numpy as np
from firebase import firebase
import os
# import firebase
from firebase import firebase
from google.cloud import storage
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials

from firebase_admin import firestore

global size
size = 100
# model = Sequential()
# model = load_model('sample.h5')
app=Flask(__name__)
# run_with_ngrok(app)
# model=pickle.load(open('model.pkl','rb'))

@app.route('/send',methods=['POST'])
def send():
    data=request.get_json()
    pot_lat=data['latitude']
    pot_longi=data['longitude']
    image_url=data['image_uri']
    response = urllib.request.urlopen(image_url)
    with open('pothole.jpg', 'wb') as f:
        f.write(response.file.read())
    image1=cv2.imread('pothole.jpg')
    cv2.imshow("Image",image1)
    cv2.waitKey(0)
    newImage = glob.glob("pothole.jpg")
    test2 = [cv2.imread(img,0) for img in newImage]

    for i in range(0,len(test2)):
        test2[i] = cv2.resize(test2[i],(size,size))
    temp4 = np.asarray(test2)

    X_test = []
    # X_test.extend(temp3)
    X_test.extend(temp4)
    X_test = np.asarray(X_test)
    # print(X_test)

    X_test = X_test.reshape(X_test.shape[0], size, size, 1)



    # y_test1 = np.ones([temp3.shape[0]],dtype = int)
    y_test2 = np.zeros([temp4.shape[0]],dtype = int)

    y_test = []
    # y_test.extend(y_test1)
    y_test.extend(y_test2)
    y_test = np.asarray(y_test)

    y_test = np_utils.to_categorical(y_test)




    tests = model.predict_classes(X_test)
    print(tests)
    tests=[1]
    X_test=[1]
    for i in range(len(X_test)):
        if tests[i] == 1:
            import cv2 as cv
            # from google.colab.patches import cv2_imshow
            import numpy as np
            from matplotlib import pyplot as plt
            ########################################Iske andar bhi tera React ka image pass karega
            img = cv.imread('pothole.jpg')
            # cv2_imshow(img)
            img = cv.medianBlur(img,5)
            ret,th1 = cv.threshold(img,127,255,cv.THRESH_BINARY)

            kernel = np.ones((12,12),np.uint8)
            opening = cv.morphologyEx(th1, cv.MORPH_OPEN, kernel)

            edged = cv.Canny(opening, 30, 200) 

            contours, hierarchy = cv.findContours(edged,  
                cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE) 
            count=len(contours)
            # print(count)

            #############################Yaha tera React mei se Latitude aur Longitude ayega
            lat=pot_lat
            longi=pot_longi

            os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="pothole-detection-6f50d-firebase-adminsdk-hiow2-12bb7e63a2.json"
            firebase1 = firebase.FirebaseApplication('https://pothole-detection-6f50d.firebaseio.com')


            cred = credentials.Certificate('mycertificate.json')
            client = storage.Client()
            bucket = client.get_bucket('pothole-detection-6f50d.appspot.com')
            # posting to firebase storage
            imageBlob = bucket.blob("/")
            # imagePath = [os.path.join(self.path,f) for f in os.listdir(self.path)]
            imagePath = "pothole.jpg"
            imageBlob = bucket.blob("Potholes/lat="+str(lat)+"&long="+str(longi)+"/pothole.jpg")
            imageBlob.upload_from_filename(imagePath)

            firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://pothole-detection-6f50d.firebaseio.com'
            })

            db = firestore.client()
            collection1 = db.collection('potholes')
            documents = list(collection1.get())
            print(len(documents))
            i=str(len(documents)+1)
            result = rg.search((lat,longi)) 
            doc_ref = db.collection('potholes').document('pothole7')

            doc_ref.set({
                'latitude': lat,
                'longitude':longi,
                'n_potholes':count,
                'check':'false',
                'name':result[0]['name']
            },merge=True)
        else:
            print("Image is not a pothole")


    return "Done"


if __name__=='__main__':
    app.run(debug=True)
