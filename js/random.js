$(document).ready(function(){
    var students =  [   	
                            {id: "alejandrol", name: "Alejandro L.", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "alejandrov", name: "Alejandro V.", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "dafne", name: "Dafne", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "daphne", name: "Daphne", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "emiliano", name: "Emiliano", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "fernando", name: "Fernando", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "francisco", name: "Francisco", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "froylan", name: "Froylan", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "guillermo", name: "Guillermo", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "hugo", name: "Hugo", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "humberto", name: "Humberto", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "isaac", name: "Isaac",image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            // {id: "jeny", name: "Jeny", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "jeronimo", name: "Jeronimo", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "joaquin", name: "Joaquin", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "josealfredo", name: "J. Alfredo", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "lesly", name: "Lesly", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "luisjoel", name: "Luis Joel", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "mario", name: "Mario", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "miguel", name: "Miguel", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "miguelangel", name: "M. Ángel", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "omar", name: "Omar", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "sandra", name: "Sandra", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0},
                            {id: "santiago", name: "Santiago", image: "https://www.fillmurray.com/500/500", active:"true", howMany:0}
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