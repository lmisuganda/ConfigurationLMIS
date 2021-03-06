NUMBER_OF_DATA_ELEMENTS = 0;
MAX_VALUE_FOR_RANDOM_NUMBERS = 7;
array_of_IDs_for_data_elements = []
var server_url = '/dhis/api' // server
// var server_url = '/api' // demo-server

function getOrgUnitId(callback){
    return $.ajax({
        url: server_url + '/me.jsonp?fields=organisationUnits,code',
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
    user_code = raw_data.code
    for(var i = 0; i < raw_data.organisationUnits.length; i++){
        org_unit_ID = raw_data.organisationUnits[i].id
        $('#orgunit').append('<option value="' + org_unit_ID + '">' + org_unit_ID + '</option>')
    }
}
function getDataElementsForProgram(program_prefix, callback){
    return $.ajax({
        url: server_url + '/dataElements.jsonp?fields=code,id,displayName&paging=false&filter=shortName:^ilike:' + program_prefix,
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
    randomize_data_element_numbers(MAX_VALUE_FOR_RANDOM_NUMBERS)
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

function createPostEvent(programId, programStage, orgUnitId, data_element_ids, data_element_values, user_code){
    post_obj = {};
    post_obj.program = programId;
    post_obj.programStage = programStage;
    if($('#order_date').val() == ''){
        post_obj.eventDate = getTodaysDateOnCorrectFormat();
    } else {
        post_obj.eventDate = $('#order_date').val();
    }
    post_obj.status = 'ACTIVE';
    post_obj.storedBy = user_code;
    post_obj.orgUnit = orgUnitId;
    post_obj.dataValues = createDataValuesArray(data_element_ids, data_element_values)
    return post_obj;
}

function sendDataToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: server_url + "/events",
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
    var orgunit = $('#orgunit').find(":selected").text()
    var programStage = $('#program_stage').val();

    var value_array = [];
    for (var i = 0; i < NUMBER_OF_DATA_ELEMENTS; i++){
        var label = $('label[for=dataelem' + i + ']').text().split('__')[1].toLowerCase()
        if (label == 'adjusted amc' || label == 'months of stock on-hand' || label == 'quantity required'){
            value_array.push('0');
        } else if (label == 'completed'){
            value_array.push(false);
        } else if (label == 'applicable'){
            value_array.push(true);
        } else if (label == 'metadata'){
            value_array.push(false);
        } else {
            value_array.push($('#dataelem' + i).val());
        }
    }
    var jsn = createPostEvent(program, programStage, orgunit, array_of_IDs_for_data_elements, value_array, user_code);
    sendDataToServer(jsn);
}

function sendMultipleRandomizedEvents(number_of_events){
    for (var numberOfSubmits = 0; numberOfSubmits < number_of_events; numberOfSubmits++){
        randomize_data_element_numbers(MAX_VALUE_FOR_RANDOM_NUMBERS)
        var program = $('#program').val();
        var orgunit = $('#orgunit').find(":selected").text()
        var programStage = $('#program_stage').val();

        var value_array = [];
        for (var i = 0; i <= NUMBER_OF_DATA_ELEMENTS; i++){
            value_array.push($('#dataelem' + i).val());
        }
        var jsn = createPostEvent(program,programStage, orgunit, array_of_IDs_for_data_elements, value_array);
        sendDataToServer(jsn);
    }
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$( document ).ready(function(){
    var program_id = getUrlParameter('program_id')
    var program_stage_id = getUrlParameter('program_stage_id')
    var program_name = getUrlParameter('program_name')

    $("#program").val(program_id);
    $("#program_stage").val(program_stage_id);

    getOrgUnitId(injectOrgUnitID)
        .then(getDataElementsForProgram(program_name, createDataElementInputFields))
        .then(function(){
            document.getElementById('submit-button').addEventListener("click", sendSingleEvent);
            document.getElementById('randomized-submit-button').addEventListener("click", function(){sendMultipleRandomizedEvents(10)});
        })
})
