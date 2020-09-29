var lat,long,no
// lat=[]
// long=[]

db.collection('potholes').get().then(function (querySnapshot){
    querySnapshot.forEach(function(doc){
        lat=doc.data().latitude
        long=doc.data().longitude
        no=doc.data().n_potholes

        document.getElementById('lat').innerHTML=lat
        document.getElementById('long').innerHTML=long
        document.getElementById('number').innerHTML=no

    })
})

// var eng_lat=[]
// var eng_long=[]
// var eng_email=[]

// db.collection('engineers').get().then(function (querySnapshot){
//     querySnapshot.forEach(function(doc){
//         eng_lat=float(doc.data().latitude)
//         // eng_long=doc.data().longitude
//         // eng_email=doc.data().email

//         console.log(eng_lat)

//     })
// })
