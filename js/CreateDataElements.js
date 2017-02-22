
function createDataElementsFromSections(sections_data){
    console.log("SectionsData: ", sections_data)

    for(var i = 0; i < sections_data.length; i++){
        console.log("Ser på section: ", sections_data[i].name)

        for (var j = 0; j < sections_data[i].commodities.length; j++){
            sections_data[i].commodities[j].name
            console.log("   ser på commd: ", sections_data[i].commodities[j].name)
            // for( var k = 0; k < sections_data[i].commodities[j].)
            // full_commodity_name = getProgramName() + '__' +
            // sendToServer(createDataElementObject( ))
        }
        sections_data[i]
    }
}

// send data to server
function postProgramStageDataElements(){

}

function sendToServer(jsonObject) {
    return $.ajax({
        data: JSON.stringify(jsonObject),
        url: "/api/dataElements.json", // HUSK Å LEGGE PÅ dhis/api..
        type: 'POST',
        dataType: 'json',
        contentType:'application/json',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log("Gikk dårlig, men alt ordner seg til slutt :) ", data)
        },
        success: function (data) {
            console.log("Gikk bra", data)
        }
    });
}

function createDataElementObject(){
    data_element_object = {}
    data_element_object.aggregationType = 'SUM'
    data_element_object.domainType = 'TRACKER'
    data_element_object.dataElementCategoryCombo = ''
    data_element_object.valueType = 'INTEGER'
    data_element_object.zeroIsSignificant = true
    data_element_object.name = 'TEST-Element'
    data_element_object.shortName = 'TEST-Element'
    return data_element_object
}
