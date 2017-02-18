$( document ).ready(function(){
    attachEventListeners()
});

// section_names = []
// commodity_operation_names = []
section_names = ['Adult formulations', 'Pediatric formulations', 'Other formulations']
commodity_operation_names = ['Opening balance', 'Quantity received', 'ART & PMTCT Consumption', 'Losses / Adjustments', 'Days out of stock', 'Adjusted AMC', 'Closing Balance', 'Months of stock on-hand', 'Quantity Required']

function attachEventListeners(){
    $('#program-name-input').keyup(function (e) {
        if (e.keyCode == 13) {
            // submitProgramToServer(); --> KOMMENTER UT DISSE FOR Å LEGGE TIL I DHIS2
        }
    });

    $('#program-name-submit').click(function(e){
        // submitProgramToServer() --> KOMMENTER UT DISSE FOR Å LEGGE TIL I DHIS2
    })

    $('.remove-operation').click(function(e){
        // remove <li>-element to the left
         $(this).prev().remove();
         // remove the remove-button
         $(this).remove();
    })

    $('.add-operation').click(function(e){
        $(this).before('<li class="operation" contenteditable> fill in... </li>')
        $(this).before('<i class="fa fa-times remove-operation" aria-hidden="true"></i>')
    })
}

function submitProgramToServer(){
    createProgramWithInputValue().then(function(){
        sendNewProgramStageToServer(createProgramStageObject())
        $('#program-name-input').val('')
    })
}
