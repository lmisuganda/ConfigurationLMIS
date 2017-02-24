dataElement_uid_list = []

function postDataElementsToServer(sections_data){
    for(var i = 0; i < sections_data.length; i++){

        for (var j = 0; j < sections_data[i].commodities.length; j++){
            commodity_name = sections_data[i].commodities[j].name


            data_element_uid_for_commodity = []
            for( var k = 0; k < sections_data[i].commodities[j].operations.length; k++){
                operation_name = sections_data[i].commodities[j].operations[k]
                full_commodity_name = commodity_name + '__' + operation_name
                sendDataElementToServer(createDataElementObject(full_commodity_name), function(data){
                    dataElement_uid_list.push(data.response.uid)
                    data_element_uid_for_commodity.push(data.response.uid)
                })

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
        url: "/api/dataElements.json", // HUSK Å LEGGE PÅ dhis/api..
        type: 'POST',
        dataType: 'json',
        async: false, // important, wait for all elements to be created before looping in postDataElementsToServer-function
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log("Gikk dårlig, men alt ordner seg til slutt :) ", data)
        },
        success: function (data) {
            console.log("Gikk bra", data)
            callback(data)
        }
    });
}

function createDataElementObject(dataElementName){
    data_element_object = {}
    data_element_object.aggregationType = 'SUM'
    data_element_object.domainType = 'TRACKER'
    data_element_object.dataElementCategoryCombo = ''
    data_element_object.valueType = 'INTEGER'
    data_element_object.zeroIsSignificant = true
    data_element_object.name = dataElementName
    data_element_object.shortName = dataElementName
    return data_element_object
}
