var created_program_stage = {
    name:'',
    program_id:'',
    stage_id:''
}

function set_program_stage_attribute(attribute, val){
    created_program_stage[attribute] = val;
}

function postProgramStageToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/dhis/api/programStages",
        type: 'POST',
        async: false,
        dataType: 'json',
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log("Error: ", data)
        },
        success: function (data) {
            set_program_stage_attribute('stage_id',data.response.uid)
            console.log("Created: " + data.response.uid, data)
        }
    });
}

function createProgramStageObject(){
    program_stage_object = {}
    program_stage_object.program = {"id": created_program.id};
    program_stage_object.name = created_program.name
    program_stage_object.displayName = created_program.name
    program_stage_object.repeatable = false
    program_stage_object.minDaysFromStart = 0
    set_program_stage_attribute('name', program_stage_object.name)
    set_program_stage_attribute('program_id', program_stage_object.program.id)
    return program_stage_object
}

function getProgramStageId(){
    return created_program_stage.stage_id
}


function getProgramID(){
    return created_program_stage.program_id
}
