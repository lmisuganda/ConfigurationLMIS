function postProgramStageSectionsToServer(){
    for(var i = 0; i < sections.length; i++){
        section_name = sections[i].name
        sections_program_stage_data_element_ids = []
        for(var j = 0; j < sections[i].commodities.length; j++){
            program_stage_data_element_ids = sections[i].commodities[j].program_data_element_uids
            sections_program_stage_data_element_ids.push.apply(sections_program_stage_data_element_ids, program_stage_data_element_ids)
        }
        sendProgramStageSectionToServer(createProgramStageSection(section_name, sections_program_stage_data_element_ids, i))
    }
}

function sendProgramStageSectionToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/dhis/api/programStageSections.json",
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
        }
    });
}


function createProgramStageSection(section_name, program_stage_data_element_ids, section_nr){
    program_stage_section = {}
    program_stage_section.programStage = {id:getProgramStageId()}
    program_stage_section.programStageDataElements = []
    for(var i = 0; i < program_stage_data_element_ids.length; i++){
        program_stage_section.programStageDataElements.push({id:program_stage_data_element_ids[i]})
    }

    program_stage_section.sortOrder = section_nr
    program_stage_section.name = section_name
    return program_stage_section
}
