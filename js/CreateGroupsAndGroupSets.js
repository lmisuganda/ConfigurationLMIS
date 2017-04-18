data_element_group_ids_for_every_commodity = []
data_element_group_ids_for_every_operation = []
commodity_group_set_id = ''
commodity_operation_group_set_id = ''

function sendDataElementGroupToServer(jsonObject, callback) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/dhis/api/dataElementGroups",
        type: 'POST',
        dataType: 'json',
        async: false,
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

function sendDataElementGroupSetToServer(jsonObject, callback) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/dhis/api/dataElementGroupSets",
        type: 'POST',
        dataType: 'json',
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

function createDataElementGroup(name_of_data_element_group, list_of_data_element_ids){
    new_data_element_group = {};
    new_data_element_group.name = name_of_data_element_group; // mandatory field
    new_data_element_group.dataElements = [];
    for (var i = 0; i < list_of_data_element_ids.length; i++){
        new_data_element_group.dataElements.push({"id": list_of_data_element_ids[i]})
    }
    return new_data_element_group;
}

function createDataElementGroupSet(name_of_data_element_group_set, list_of_data_element_group_ids){
    new_data_element_group_set = {};
    new_data_element_group_set.name = name_of_data_element_group_set; // mandatory field
    new_data_element_group_set.dataElementGroups = [];
    new_data_element_group_set.dataDimension = true; // mandatory field
    for (var i = 0; i < list_of_data_element_group_ids.length; i++){
        new_data_element_group_set.dataElementGroups.push({"id": list_of_data_element_group_ids[i]})
    }
    return new_data_element_group_set;
}

function postDataElementGroupsForEveryCommodity(){
    for(var i = 0; i < sections.length; i++){
        for(var j = 0; j < sections[i].commodities.length;j++){
            data_element_group_name = sections[i].commodities[j].name
            data_element_uids = sections[i].commodities[j].data_element_uids

            sendDataElementGroupToServer(createDataElementGroup(data_element_group_name, data_element_uids), function(data){
                data_element_group_ids_for_every_commodity.push(data.response.uid)
            })
        }
    }
}

function postDataElementGroupForEveryOperation(){
    distinct_operations = getListOfAllOperationsInProgram()

    for(key in distinct_operations){
        for(var i = 0; i < sections.length; i++){
            for(var j = 0; j < sections[i].commodities.length;j++){
                for(var k = 0; k < sections[i].commodities[j].operations.length; k++){
                    if(sections[i].commodities[j].operations[k] == key){
                        data_element_uid = sections[i].commodities[j].data_element_uids[k]
                        distinct_operations[key].push(data_element_uid)
                    }
                }
            }
        }
    }

    for(key in distinct_operations){
        sendDataElementGroupToServer(createDataElementGroup(key,distinct_operations[key]), function(data){
            data_element_group_ids_for_every_operation.push(data.response.uid)
        })
    }
}

function getListOfAllOperationsInProgram(){
    var distinct_operations = {}
    for(var i = 0; i < sections.length; i++){
        for(var j = 0; j < sections[i].commodities.length;j++){
            for(var k = 0; k < sections[i].commodities[j].operations.length; k++){
                operation = sections[i].commodities[j].operations[k]
                distinct_operations[operation] = []
            }
        }
    }
    return distinct_operations
}

function postGroupSetForEveryCommodityGroup(){
    sendDataElementGroupSetToServer(createDataElementGroupSet('Commodity', data_element_group_ids_for_every_commodity), function(data){
        commodity_group_set_id = data.response.uid
    })
    sendDataElementGroupSetToServer(createDataElementGroupSet('Commodity Operations', data_element_group_ids_for_every_operation), function(data){
        commodity_operation_group_set_id = data.response.uid
    })
}
