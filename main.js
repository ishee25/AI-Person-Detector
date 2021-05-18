video = "";
status = "";
objects = [];

function preload(){
    alarm = loadSound("alarm.mp4");
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function gotResult(error, results ){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != " "){
        objectDetector.detect(video, gotResult);

    for(i = 0; i < objects.length; i++){
        if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Status: Person Detected";
            document.getElementById("person_found").innerHTML = "Person Found";
            alarm.stop();
         }
     
         else{
             document.getElementById("person_found").innerHTML = "Person Not Found";
             alarm.play();
         }
    }

    if(objects.length == 0){
        document.getElementById("person_found").innerHTML = "Person Not Found";
        alarm.play();
    }
  }
}   