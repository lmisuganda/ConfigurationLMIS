NUMBER_OF_DATA_ELEMENTS = 0;
MAX_VALUE_FOR_RANDOM_NUMBERS = 200;
array_of_IDs_for_data_elements = []

function getOrgUnitId(callback){
    return $.ajax({
        url: '/dhis/api/me.jsonp?fields=organisationUnits',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/jsonp',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            callback(data)
        },
        success: function (data) {
            callback(data)
        }
    });
}
function injectOrgUnitID(raw_data){
    org_unit_ID = raw_data.organisationUnits[0].id
    $('#orgunit').val(org_unit_ID)
}
function getDataElementsForProgram(program_prefix, callback){
    return $.ajax({
        url: '/dhis/api/dataElements.jsonp?fields=code,id,displayName&paging=false&filter=code:^ilike:' + program_prefix,
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/jsonp',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            callback(data)
        },
        success: function (data) {
            callback(data)
        }
    });
}

function createArrayOfRelevantDataElementIDs(all_data_element_info){
    id_array = []
    for (var i = 0; i < all_data_element_info.length; i++){
        id_array.push(all_data_element_info[i].id)
    }
    return id_array;
}

function addRowsForEachDataElement(data_elements){
    for(i = 0; i < data_elements.length; i++){
        $('#input-table').append('<tr> <td> <label class="labels" for="dataelem' + i + '">' + data_elements[i].displayName + '</label></td><td><input id="dataelem' + i + '" class="input-fields" type="text" value=""> </input></td>')
    }
}

function createDataElementInputFields(raw_data){
    data_elements = raw_data.dataElements;
    array_of_IDs_for_data_elements = createArrayOfRelevantDataElementIDs(data_elements)
    NUMBER_OF_DATA_ELEMENTS = array_of_IDs_for_data_elements.length;
    addRowsForEachDataElement(data_elements);
    randomize_data_element_numbers(NUMBER_OF_DATA_ELEMENTS, MAX_VALUE_FOR_RANDOM_NUMBERS)
}

function randomize_data_element_numbers(max_val){
    for(var i = 0; i < NUMBER_OF_DATA_ELEMENTS; i++){
        randomNumber = Math.floor((Math.random() * max_val) + 1)
        $('#dataelem'+i).val(randomNumber);
    }
}

function getTodaysDateOnCorrectFormat() {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function createDataValuesArray(data_element_ids, data_element_values){
    data_values_array = []
    for (var i = 0; i < data_element_ids.length; i++){
        data_values_array.push({dataElement: data_element_ids[i], value: data_element_values[i]})
    }
    return data_values_array;
}

function createPostEvent(programId, programStage, orgUnitId, data_element_ids, data_element_values){
    post_obj = {};
    post_obj.program = programId;
    post_obj.programStage = programStage;
    post_obj.eventDate = getTodaysDateOnCorrectFormat();
    post_obj.status = 'COMPLETED';
    post_obj.storedBy = 'admin';
    post_obj.orgUnit = orgUnitId;
    post_obj.dataValues = createDataValuesArray(data_element_ids, data_element_values)
    // post_obj.enrollment = "xxxxxxxx";
    // post_obj.trackedEntityInstance = "xxxxxxxx";
    return post_obj;
}

function sendDataToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/dhis/api/events",
        type: 'POST',
        dataType: 'json',
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            $('#output').html("<b>Actually sent to server:</b> <br/><br/>" + JSON.stringify(jsonObject) + "<br/><br/> <b>Server responded to this with:</b> <br/><br/>" + JSON.stringify(data));
        },
        success: function (data) {
            $('#output').html("<b>Actually sent to server:</b> <br/><br/>" + JSON.stringify(jsonObject) + "<br/><br/> <b>Server responded to this with:</b> <br/><br/>" + JSON.stringify(data));
        }
    });
}

function sendSingleEvent(){
    var program = $('#program').val();
    var orgunit = $('#orgunit').val();
    var programStage = $('#program_stage').val();

    var value_array = [];
    for (var i = 0; i <= NUMBER_OF_DATA_ELEMENTS; i++){
        value_array.push($('#dataelem' + i).val());
    }
    var jsn = createPostEvent(program, programStage, orgunit, array_of_IDs_for_data_elements, value_array);
    console.log(jsn)
    sendDataToServer(jsn);
}

function sendMultipleRandomizedEvents(number_of_events){
    for (var numberOfSubmits = 0; numberOfSubmits < number_of_events; numberOfSubmits++){
        fillFieldsWithRandomNumbers(MAX_VALUE_FOR_RANDOM_NUMBERS)
        var program = $('#program').val();
        var orgunit = $('#orgunit').val();
        var programStage = $('#program_stage').val();

        var value_array = [];
        for (var i = 0; i <= NUMBER_OF_DATA_ELEMENTS; i++){
            value_array.push($('#dataelem' + i).val());
        }
        var jsn = createPostEvent(program,programStage, orgunit, array_of_IDs_for_data_elements, value_array);
        sendDataToServer(jsn);
    }
}

document.getElementById('submit-button').addEventListener("click", sendSingleEvent);
document.getElementById('randomized-submit-button').addEventListener("click", function(){sendMultipleRandomizedEvents(10)});

getOrgUnitId(injectOrgUnitID)
    .then(getDataElementsForProgram('ARV', createDataElementInputFields))
