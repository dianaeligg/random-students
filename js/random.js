$(document).ready(function(){

    let students = [];

    function selectAll(all){
        students.forEach(function(student,i){
            student.active = all;
            updateActive(student);
        });  
    }

    function randomize(){
        let activeStudents = students.filter(st => st.active);
        console.log(activeStudents);
        let random = Math.floor( Math.random() * activeStudents.length );
        let student = activeStudents[random];
        console.log(student);
        let randomImg = Math.floor( Math.random() * 401 ) + 200;
        $(".student-image").attr("src","https://placekitten.com/"+ randomImg + "/" + randomImg);
        $(".selected-student").text(student.name);
        let i = students.indexOf(student);
        students[i].active = false;
        students[i].howMany++;
        // updateHowMany(activeStudents[random]);
    }

    $("#btn-randomize").on("click", function(){
        randomize();
    });
    $("#btnSelectAll").on("click", function(){
        console.log('click');
        
        // selectAll(true);
    });
    $("#btnSelectNone").on("click", function(){
        selectAll(false);
    });

    function fillChecklist(){
        students.forEach(function(student, i){
            var li = $('<li>');
            var check = $('<div>');
            check.addClass('pre-student-name');
            check.addClass('cb'+student.id);
            if (student.active) {
                check.addClass('active');
            }
            else{
                console.log(student.name);
            }
            li.append(check);
            var name = $('<span>');
            name.addClass('student-name');
            name.text(student.name);
            // console.log(name);
            li.append(name);
            $(".student-list ul").append(li);
        });
    }

    function updateActive(st){
        var cb = $('.cb'+ st.id);
        if (st.active){
            cb.addClass('active');
        }
        else{
            cb.removeClass('active');
        }
    }

    function updateHowMany(st){
        var hm = $('#hm'+ st.id);
        hm.text(st.howMany);
    };

    function loadJSON(){
        $.getJSON( "json/students.json", json => {
            students = json.students; 
            console.log(students);
            fillChecklist();
        });
    }
    loadJSON();
});