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
        console.log("ALL DATA: ", sections)
        postProgramStageSectionsToServer()
        postDataElementGroupsForEveryCommodity()
        postDataElementGroupForEveryOperation()
        postGroupSetForEveryCommodityGroup()
        addTestDataButton()
    });
}

// Only for injecting Jquery for browser testing
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

function addTestDataButton(){

    test_data_button = document.createElement('a')
    test_data_button.className = 'large-button-with-text'
    test_data_button.id = 'add-test-data-button'
    test_data_button.setAttribute('href', 'testdata')

    test_data_text = document.createElement('p')
    test_data_text.innerHTML = 'Add test-data!'

    plus_icon_testdata = document.createElement('i')
    plus_icon_testdata.className = 'fa fa-plus'
    plus_icon_testdata.setAttribute('aria-hidden', 'true')


    test_data_button.appendChild(test_data_text)
    test_data_button.appendChild(plus_icon_testdata)
    test_data_button.onclick = clonePreviousCommodity


    $('#main').appendChild(test_data_button)

}

function submitProgramToServer(){
    createProgramWithInputValue().then(function(){
        sendNewProgramStageToServer(createProgramStageObject())
        $('#program-name-input').val('')
    })
}
