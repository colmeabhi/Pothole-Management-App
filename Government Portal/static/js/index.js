
var count = 0;

db.collection('potholes').get().then(function (querySnapshot){
    querySnapshot.forEach(function(doc){
        lat = doc.data().latitude
        long= doc.data().longitude
        no = doc.data().n_potholes

        var row = document.createElement("tr");

        count = count +1 ;

        var cell1 = document.createElement("td");
        let text = document.createTextNode(count);
        cell1.appendChild(text)


        var cell2 = document.createElement("td");
        text = document.createTextNode(lat);
        cell2.appendChild(text);


        var cell3 = document.createElement("td");
        text = document.createTextNode(long);
        cell3.appendChild(text);


        var cell4 = document.createElement("td");
        text = document.createTextNode(no);
        cell4.appendChild(text);


        var cell5 =  document.createElement("button");
        var t = document.createTextNode("Send");
        cell5.appendChild(t)
        cell5.addEventListener("click", function(){
            console.log(cell2.innerHTML,cell3.innerHTML);
            predict(cell2.innerHTML,cell3.innerHTML)
          });

        
        // cell5.setAttribute("label","A new Button");
        // document.createElement("td");
        // var btn =
        document.body.appendChild(cell5);



        var table_body = document.getElementById("tablebody");

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        table_body.appendChild(row);

        console.table(lat)
        console.table(long)
        console.table(no)


    })
})

function predict(x,y) {
    $.ajax({
    url: "http://127.0.0.1:5000/sending/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ 
        latitude: x,
        longitude:y
     }),
    dataType: "json"
    }).done(function(data) {
    console.log(data);
    });
}
// console.log(db)
