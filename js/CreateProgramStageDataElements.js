program_data_element_uid_list = []

function postProgramDataElementsToServer(dataElement_uid_list){
    for(var i = 0; i < dataElement_uid_list.length; i++){
        sendProgramDataElementToServer(createProgramStageDataElement(dataElement_uid_list[i]), function(data){
            program_data_element_uid_list.push(data.response.uid)
            setProgramStageIDToSections(dataElement_uid_list[i], data.response.uid)
        })
    }
}

function setProgramStageIDToSections(data_element_id, program_data_element_id){
    for(var i = 0; i < sections.length; i++){
        for (var j = 0; j < sections[i].commodities.length; j++){
            var program_data_element_uid = ''
            for( var k = 0; k < sections[i].commodities[j].operations.length; k++){
                if($.inArray(data_element_id, sections[i].commodities[j].data_element_uids)>=0){
                    program_data_element_uid = program_data_element_id
                }
            }
            if(program_data_element_uid != ''){
                if('program_data_element_uids' in sections[i].commodities[j]){
                    sections[i].commodities[j].program_data_element_uids.push(program_data_element_uid)
                } else {
                    sections[i].commodities[j].program_data_element_uids = [program_data_element_uid]
                }
            }
        }
    }
}


function sendProgramDataElementToServer(jsonObject, callback) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: server_url + "/programStageDataElements.json",
        type: 'POST',
        dataType: 'json',
        async: false, // important, wait for all elements to be created before looping in postDataElementsToServer-function
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log("Error: ", data)
        },
        success: function (data) {
            console.log("Created: " + data.response.uid, data)
            callback(data)
        }
    });
}





function createProgramStageDataElement(data_element_id){
    program_stage_data_element_obj = {}
    program_stage_data_element_obj.programStage = {id: getProgramStageId()}
    program_stage_data_element_obj.compulsory = true
    program_stage_data_element_obj.allowProvidedElsewhere = true
    program_stage_data_element_obj.dataElement = {id: data_element_id}
    return program_stage_data_element_obj
}
