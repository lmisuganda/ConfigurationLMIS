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
            submitProgramToServer();
        }
    });

    $('#program-name-submit').click(function(e){
        submitProgramToServer()
    })

    $('#commodity-section-input').keyup(function(e){
        if (e.keyCode == 13) {
            addSectionNameToList();
        }
    })

    $('#commodity-section-submit').click(function(e){
        addSectionNameToList();
    })


    $('#commodity-operation-input').keyup(function(e){
        if (e.keyCode == 13) {
            addCommodityOperationNameToList();
        }
    })

    $('#commodity-operation-submit').click(function(e){
        addCommodityOperationNameToList();
    })
}

function submitProgramToServer(){
    createProgramWithInputValue().then(function(){
        sendNewProgramStageToServer(createProgramStageObject())
        $('#program-name-input').val('')
    })
}

function addSectionNameToList(){
    section_name = $('#commodity-section-input').val()
    section_names.push(section_name)
    updateSectionNameList()
    $('#commodity-section-input').val('')
}

function addCommodityOperationNameToList(){
    operation_name = $('#commodity-operation-input').val()
    commodity_operation_names.push(operation_name)
    updateOperationNameList()
    $('#commodity-operation-input').val('')
}

function updateSectionNameList(){
    $('#commodity-section-list').html('')
    for (var i = 0; i < section_names.length; i++){
        $('#commodity-section-list').append('<li> Section ' + (i+1) + ': ' + section_names[i] + '</li>')
    }
}

function updateOperationNameList(){
    $('#commodity-operation-list').html('')
    for (var i = 0; i < commodity_operation_names.length; i++){
        $('#commodity-operation-list').append('<li> Commodity Operation ' + (i+1) + ': ' + commodity_operation_names[i] + '</li>')
    }
}

setTimeout(generateSectionTables, 1500 );

function generateSectionTables(){

    for(var i = 0; i < section_names.length; i++){
        $('#commodity-tables-for-commodities-operations').append('<h3>' + section_names[i] + '</h3><table id="commodity-name-table-' + i + '" border="1" class="commodity-table" </table>')

        var headings = '<th>COMMODITY NAMES</th>'
        for(var j = 0; j < commodity_operation_names.length; j++){
            headings += ('<th>' + commodity_operation_names[j] + '</th>')
        }
        $('#commodity-name-table-' + i).append('<tr>' + headings + '</tr>')
        empty_fields = ''
        for (var j = 0; j < commodity_operation_names.length; j++){
            empty_fields += '<td class="empty-fields"></td>'
        }
        $('#commodity-name-table-' + i).append('<tr><td class="commodity-name" contenteditable>Fill in commodity name</td>' + empty_fields + '</tr>')
        $('#commodity-name-table-' + i).append('<tr><td class="commodity-name" contenteditable>Fill in commodity name</td>' + empty_fields + '</tr>')
        console.log("testa den DAAA")
    }

}

/*
<TABLE>
    <tr>
      <th>Commodity names</th>
    </tr>
    <tr>
      <td>Sample commodity name 1</td>
    </tr>
    <tr>
      <td>Sample commodity name 1</td>
    </tr>
</TABLE>
*/



// $('#program_selector').change(function(){
//     program_name = $(this).find(':selected').text();
//     program_id = $(this).find(':selected').attr('id');
//
//     set_program_attribute("name", program_name)
//     set_program_attribute("id", program_id)
//     console.log("mitt obj: ", created_program)
// });

// var numberOfInfoOnCommodities = 1;
//
// $('#plus-btn').click(function(){
//     $('#commodity-info-list').append('<li><input class="commodity-info" "id="commodity-info-' + numberOfInfoOnCommodities + '" type="text" placeholder="e.g., Quantity received, AMC etc." tabindex="1" required></li>')
//     numberOfInfoOnCommodities += 1;
// });
