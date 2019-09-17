$(document).ready(function(){

    let students = [];
    let isStudentOpen = false;
    let tec_blue = 'rgb(0,51,153)';

    function selectAll(check){
        students.forEach((student,i)=>{
            student.active = check;
            updateActive(student);
        });  
    }

    function randomize(){
        let activeStudents = students.filter(st => st.active);
        let randomImgW = Math.floor( Math.random() * 40 ) + Math.floor($('.student-image-bck').width()) - 20;
        let randomImgH = Math.floor( Math.random() * 40 ) + Math.floor($('.student-image-bck').height()) - 20;
        console.log(randomImgW, randomImgH);
        $(".student-image-bck").css('background-image',"url(https://placekitten.com/"+ randomImgW + "/" + randomImgH + ")");
        if (activeStudents.length < 1) {           
            $(".selected-student").text('No active students');
            return;
        }
        console.log(activeStudents);
        let random = Math.floor( Math.random() * activeStudents.length );
        let student = activeStudents[random];
         $(".selected-student").text(student.name);
        let i = students.indexOf(student);
        students[i].active = false;
        students[i].howMany++;
        updateActive(students[i]);
    }

    $("#btn-randomize").on("click", () => {
        randomize();
    });
    $("#btnSelectAll").on("click", () => {
        selectAll(true);
    });
    $("#btnSelectNone").on("click", () => {
        selectAll(false);
    });

    $('#file-input').on('change', () =>{
        let file = document.getElementById("file-input").files[0].name;
        console.log(file, $('#file-input'));
        loadJSON(file);
    });

    $('.open-div').on('click', () =>{
        if (isStudentOpen){
            $('aside').css('height', '0').css('visibility', 'hidden').css('opacity', '0'); 
            $('.open-text').css('color', 'white');
            $('.open-div').css('background', tec_blue);
            $('.fa-chevron-up').show();
            $('.fa-chevron-down').hide();
        }
        else{
            $('aside').css('height', '100%').css('visibility', 'visible').css('opacity', '1');
            $('.open-text').css('color', tec_blue);
            $('.open-div').css('background', 'white');
            $('.fa-chevron-up').hide();
            $('.fa-chevron-down').show();
        }
        console.log('aside');
        isStudentOpen = !isStudentOpen;
    });



    function fillChecklist(){
        $('.student-list').empty();
        students.forEach((student, i) =>{
            let ig = $('<div>').addClass('input-group').attr('id', 'ig-'+student.id);
            let id = 'option-'+student.id;
            let input = $('<input>').attr('id', id).attr('name', id).attr('type', 'checkbox');
            let label = $('<label>').attr('for', id).text(student.name).addClass('lbl');
            if(student.active)
                input.prop("checked", true);
            ig.append(input);
            ig.append(label);
            $(".student-list").append(ig);
        });
        $('input[type=checkbox]').change( (e) => {
            let st = studentFromId(e.target.id.replace('option-',''));
            st.active = !st.active;
            updateActive(st);
        });
    }

    function studentFromId(id){
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === id)
                return students[i];            
        }
        return null;
    }

    function updateActive(st){
        console.log('updateactive', st)
        let cb = $('#option-'+ st.id);
        cb.prop("checked", st.active);
    }

    function loadJSON(jsonName){
        students = [];
        $.getJSON(jsonName, json => {
            students = json.students; 
            fillChecklist();
        });
    }
    loadJSON('json/students.json');
});