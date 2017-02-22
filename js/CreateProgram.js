var created_program = {
    name:'',
    id:''
}

function set_program_attribute(attribute, val){
    created_program[attribute] = val;
}

function sendNewProgramToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/api/programs", // HUSK Å LEGGE PÅ dhis/api..
        type: 'POST',
        dataType: 'json',
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log("Gikk dårlig, men alt ordner seg til slutt :) ", data)
        },
        success: function (data) {
            set_program_attribute('id',data.response.uid)
            console.log("Gikk bra", data)
        }
    });
}


function createProgramObject(name){
    program_object = {}
    program_object.categoryCombo = {};
    program_object.name = name
    program_object.programType = "WITHOUT_REGISTRATION"
    program_object.skipOffline = true
    set_program_attribute('name', program_object.name)
    return program_object
}

function createProgramWithInputValue(){
    program_name = $('#program-name-input').val()

    return sendNewProgramToServer(createProgramObject(program_name)).then(function(){
        console.log("mitt obj ble: ", created_program)
    })
}

function getProgramName(){
    return created_program.name
}

// function getAllPrograms(){
//     return $.ajax({
//         url: "/api/programs.jsonp?paging=false&",
//         type: 'GET',
//         dataType: 'jsonp',
//         contentType:'application/jsonp',
//         authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
//         error: function (data) {
//             console.log(JSON.stringify(data));
//         },
//         success: function (data) {
//             updateSelectOfProgramNames(data)
//         }
//     });
// }
//
// function updateSelectOfProgramNames(data){
//     data.programs.map((val, idx) => {
//         $('#program_selector').append( '<option id="' + val.id + '">' + val.displayName + '</option>' );
//     })
// }
//
// getAllPrograms();
