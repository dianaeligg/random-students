$(document).ready(function(){
    var students =  [   	
                            {id: "brenda", name: "Brenda", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "carlos", name: "Carlos", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "claudia", name: "Claudia", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "daniel", name: "Daniel", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "edgarc", name: "Edgar C.", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "edgart", name: "Edgar T.", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "edwin", name: "Edwin", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "farid", name: "Farid", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "francisco", name: "Francisco", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "hector", name: "Héctor", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "isabela", name: "Isabela", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "javier", name: "Javier",image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "estefanía", name: "Estefanía", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "mauricio", name: "Mauricio", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "oscar", name: "Oscar", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "saul", name: "Saul", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "sergio", name: "Sergio", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "vianey", name: "Vianey", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0}
                        ];
    function randomize(){
        var random = Math.floor( Math.random() * students.length );
        $("#selectedStudentName").text(students[random].name);
        $("#selectedStudentPicture").attr("src",students[random].image);
    }

    function selectAll(all){
        students.forEach(function(student,i){
            student.active = all;
            updateActive(student);
        });
        
    }

    function randomize(){
        var activeStudents = students.filter(st => st.active);
        console.log(activeStudents);
        var random = Math.floor( Math.random() * activeStudents.length );
        $("#selectedStudentName").text(activeStudents[random].name);
        var randomImg = Math.floor( Math.random() * 401 ) + 200;
        // $("#selectedStudentPicture").attr("src",activeStudents[random].image);
        $("#selectedStudentPicture").attr("src","https://www.fillmurray.com/"+ randomImg + "/" + randomImg);
        activeStudents[random].howMany++;
        updateHowMany(activeStudents[random]);
    }

    $("#btnRandom").on("click", function(){
        randomize();
    });
    $("#btnSelectAll").on("click", function(){
        selectAll(true);
    });
    $("#btnSelectNone").on("click", function(){
        selectAll(false);
    });
    function fillChecklist(){
        students.forEach(function(student, i){
            var li = $('<li>');
            var cb = $('<button class="btn">');
            cb.addClass("customCheckbox");
            cb.attr("id", "cb" + student.id)
            cb.text("O");
            li.append(cb);
            var btn = $('<button class="btn">');
            btn.addClass("customButton");
            btn.attr('value', student.id);
            btn.text(student.name);
            btn.on("click",function(a){
                var st = students.find(s => s.id == this.value);
                st.active = !st.active;
                console.log(st);
                updateActive(st);				
            });
            li.append(btn);
            var hm = $('<button class="btn">');
            hm.addClass("customHowMany")
            hm.text(student.howMany);
            hm.attr("id", "hm"+ student.id);
            li.append(hm);					
            $("#studentChecklist").append(li);
        });
    }

    function updateActive(st){
        var cb = $('#cb'+ st.id);
        if (st.active){
            cb.css('background','lightgreen');
            cb.text('O');
        }
        else{
            cb.css('background','lightsalmon');
            cb.text('X');
        }
    }

    function updateHowMany(st){
        var hm = $('#hm'+ st.id);
        hm.text(st.howMany);
    };


    fillChecklist();
});