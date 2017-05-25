dataElement_uid_list = []

function postDataElementsToServer(sections_data){
    var number_of_elements = 0
    for(var i = 0; i < sections_data.length; i++){

        for (var j = 0; j < sections_data[i].commodities.length; j++){
            commodity_name = sections_data[i].commodities[j].name


            data_element_uid_for_commodity = []
            for( var k = 0; k < sections_data[i].commodities[j].operations.length; k++){
                operation_name = sections_data[i].commodities[j].operations[k]
                full_commodity_name = commodity_name + '__' + operation_name
                if (operation_name == 'completed' || operation_name == 'applicable' || operation_name == 'notApplicable'){
                    sendDataElementToServer(createBooleanDataElementObject(full_commodity_name, number_of_elements), function(data){
                        dataElement_uid_list.push(data.response.uid)
                        data_element_uid_for_commodity.push(data.response.uid)
                    })
                } else {
                    sendDataElementToServer(createDataElementObject(full_commodity_name, number_of_elements), function(data){
                        dataElement_uid_list.push(data.response.uid)
                        data_element_uid_for_commodity.push(data.response.uid)
                    })
                }
                number_of_elements++

            }

            sections[i].commodities[j].data_element_uids = data_element_uid_for_commodity
        }
        sections_data[i]
    }
    return dataElement_uid_list
}

function sendDataElementToServer(jsonObject, callback) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: server_url + "/dataElements.json",
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

function getShortName(dataElementName){
    two_parts_of_name = dataElementName.split('__')
    commodity_part = two_parts_of_name[0]
    operation_part = two_parts_of_name[1]
    if (two_parts_of_name.length > 2){
        operation_part = two_parts_of_name[2]
    }
    short_name = ''

    splitted_commodity_name = commodity_part.split(/[\/ ()]+/)
    for(var i = 0; i < splitted_commodity_name.length; i++){
        short_name += (splitted_commodity_name[i].charAt(0) + splitted_commodity_name[i].charAt(1) + splitted_commodity_name[i].charAt(2))
    }

    splitted_operation = operation_part.split(' ')
    short_name += '_'
    for(var i = 0; i < splitted_operation.length; i++){
        short_name += (splitted_operation[i].charAt(0).toUpperCase() + splitted_operation[i].charAt(1).toUpperCase() + splitted_operation[i].charAt(2).toUpperCase())
    }
    return short_name
}

function createBooleanDataElementObject(dataElementName, unique_identifier){
    data_element_object = {}
    data_element_object.aggregationType = 'SUM'
    data_element_object.domainType = 'TRACKER'
    data_element_object.code = '' + (4000+unique_identifier)
    data_element_object.dataElementCategoryCombo = ''
    data_element_object.valueType = 'BOOLEAN'
    data_element_object.zeroIsSignificant = true
    data_element_object.name = dataElementName
    data_element_object.shortName = getProgramName() + '_' + getShortName(dataElementName)
    return data_element_object
}

function createDataElementObject(dataElementName, unique_identifier){
    data_element_object = {}
    data_element_object.aggregationType = 'SUM'
    data_element_object.domainType = 'TRACKER'
    data_element_object.code = '' + (4000+unique_identifier)
    data_element_object.dataElementCategoryCombo = ''
    data_element_object.valueType = 'NUMBER'
    data_element_object.zeroIsSignificant = true
    data_element_object.name = dataElementName
    data_element_object.shortName = getProgramName() + '_' + getShortName(dataElementName)
    return data_element_object
}
