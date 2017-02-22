// Populate with sample data (for demonstration)
var section_names = ['Adult formulations', 'Pediatric formulations', 'Other formulations']
var commodity_operation_names = ['Opening balance', 'Quantity received', 'ART & PMTCT Consumption', 'Losses / Adjustments', 'Days out of stock', 'Adjusted AMC', 'Closing Balance', 'Months of stock on-hand', 'Quantity Required']

$( document ).ready(function(){
    attachInitialEventListeners()
});

function attachInitialEventListeners(){
    $('#program-name-input').keyup(function (e) {
        if (e.keyCode == 13) {
            submitProgramToServer()
        }
    });

    $('#program-name-submit').click(function(e){
        submitProgramToServer()

    });

    $('#new-section-button').click(function(e){
        $('#sections').append(createSectionFromOperationsList(section_names[0], commodity_operation_names))
    });

    $('#send-commodities-button').click(function(e){
        var sections_data = createDataObjectForServer()
        dataElement_uid_list = postDataElementsToServer(sections_data)
        postDataProgramElementsToServer(dataElement_uid_list)
    });
}

function submitProgramToServer(){
    createProgramWithInputValue().then(function(){
        sendNewProgramStageToServer(createProgramStageObject())
        $('#program-name-input').val('')
    })
}
