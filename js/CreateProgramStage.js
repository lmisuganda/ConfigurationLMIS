var created_program_stage = {
    name:'',
    program_id:''
}

function set_program_stage_attribute(attribute, val){
    created_program_stage[attribute] = val;
}

function sendNewProgramStageToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/api/programStages", // HUSK Å LEGGE PÅ dhis/api..
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
