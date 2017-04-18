var created_program = {
    name:'',
    id:''
}

function set_program_attribute(attribute, val){
    created_program[attribute] = val;
}

function postProgramToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/dhis/api/programs",
        type: 'POST',
        async: false,
        dataType: 'json',
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log("Error: ", data)
        },
        success: function (data) {
            set_program_attribute('id',data.response.uid)
            console.log("Created: " + data.response.uid, data)
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

function getProgramName(){
    return created_program.name
}

function getProgramID(){
    return created_program.id
}
