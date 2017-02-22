function createOBJBJB(){
    program_object = {}
    program_object.programStage = {id: getProgramStageId()}
    console.log("henter: ", getProgramStageId())
    program_object.compulsory = true
    return program_object
}
