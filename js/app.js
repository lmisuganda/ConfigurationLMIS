var section_names = ['Adult formulations', 'Pediatric formulations', 'Other formulations']
var commodity_operation_names = ['Opening balance', 'Quantity received', 'ART & PMTCT Consumption', 'Losses / Adjustments', 'Days out of stock', 'Adjusted AMC', 'Closing Balance', 'Months of stock on-hand', 'Quantity Required']

$( document ).ready(function(){
    // populate with sample data

    attachEventListeners()
});

// section_names = []
// commodity_operation_names = []
function attachEventListeners(){
    $('#program-name-input').keyup(function (e) {
        if (e.keyCode == 13) {
            // submitProgramToServer(); --> KOMMENTER UT DISSE FOR Å LEGGE TIL I DHIS2
        }
    });

    $('#program-name-submit').click(function(e){
        // submitProgramToServer() --> KOMMENTER UT DISSE FOR Å LEGGE TIL I DHIS2
    });

    $('#new-section-button').click(function(e){
        // console.log("fyra, ", createSectionFromOperationsList())
        // console.log("Sender med: ", commodity_operation_names)
        $('#sections').append(createSectionFromOperationsList(section_names[0], commodity_operation_names))
    });
}
var number_of_sections = 0
function createSectionFromOperationsList(section_name, operation_list){
    console.log("Fikk inn: ", operation_list)
    var section_element = document.createElement('div')
    section_element.className = 'section'
    section_element.id = 'section-' + number_of_sections

    var header = document.createElement('h3')
    header.innerHTML = section_name
    header.setAttribute('contenteditable', 'true')

    var all_commodities_in_section = document.createElement('ul')
    all_commodities_in_section.className = 'all-commodities-in-section'

    var commodity = document.createElement('li')
    commodity.className = 'commodity'

    var commodity_header = document.createElement('h4')
    commodity_header.className = 'commodity-name'
    commodity_header.setAttribute('contenteditable', 'true')
    commodity_header.innerHTML = 'add full name for commodity..'
    commodity.appendChild(commodity_header)
    all_commodities_in_section.appendChild(commodity)

    operations_list = document.createElement('ul')
    operations_list.className = 'operations'

    for(var i = 0; i < operation_list.length; i++){
        var operation = document.createElement('li')
        operation.className = 'operation'
        operation.setAttribute('contenteditable', 'true')
        operation.innerHTML = operation_list[i]
        operations_list.appendChild(operation)

        var remove_btn = document.createElement('i')
        remove_btn.className = 'fa fa-times remove-operation'
        remove_btn.setAttribute('aria-hidden', 'true')
        remove_btn.onclick = removeElement;
        operations_list.appendChild(remove_btn)
    }

    var add_btn = document.createElement('i')
    add_btn.className = 'fa fa-plus add-operation'
    add_btn.setAttribute('aria-hidden', 'true')
    add_btn.onclick = addOperation;
    operations_list.appendChild(add_btn)

    commodity.appendChild(operations_list)
    all_commodities_in_section.appendChild(commodity)
    section_element.appendChild(header)
    section_element.appendChild(all_commodities_in_section)


    new_commodity_button = document.createElement('div')
    new_commodity_button.className = 'large-button-with-text'

    new_commodity_text = document.createElement('p')
    new_commodity_text.innerHTML = 'Add new commodity'

    plus_icon_commodity = document.createElement('i')
    plus_icon_commodity.className = 'fa fa-plus'
    plus_icon_commodity.setAttribute('aria-hidden', 'true')


    new_commodity_button.appendChild(new_commodity_text)
    new_commodity_button.appendChild(plus_icon_commodity)
    new_commodity_button.onclick = addNewCommodity



    clone_commodity_button = document.createElement('div')
    clone_commodity_button.className = 'large-button-with-text'

    clone_commodity_text = document.createElement('p')
    clone_commodity_text.innerHTML = 'Clone previous commodity'

    plus_icon_commodity = document.createElement('i')
    plus_icon_commodity.className = 'fa fa-plus'
    plus_icon_commodity.setAttribute('aria-hidden', 'true')


    clone_commodity_button.appendChild(clone_commodity_text)
    clone_commodity_button.appendChild(plus_icon_commodity)
    clone_commodity_button.onclick = clonePreviousCommodity



    section_element.appendChild(new_commodity_button)
    section_element.appendChild(clone_commodity_button)

    number_of_sections++
    return section_element
}

function clonePreviousCommodity(e){
    section_id = '#' + $(e.target).closest('div').closest('.section').attr('id')
    appended_obj = $(section_id + ' .all-commodities-in-section .commodity')
        .last()
        .clone(true, true)
        .appendTo(section_id + ' .all-commodities-in-section')
    removeButtons = appended_obj
        .children('.operations')
        .children('.remove-operation')
        // .click(removeElement)
    console.log("kommer hiy")
    removeButtons.each(function(index){
        removeButtons.click(removeElement)
    })

    addButton = appended_obj
        .children('.operations')
        .children('.add-operation')
    addButton.click(addOperation)

}

function addNewCommodity(e){
    section_id = '#' + $(e.target).closest('div').closest('.section').attr('id')
    console.log("næmmen hellohello", section_id, $(e.target))
    var commodity = document.createElement('li')
    commodity.className = 'commodity'

    var commodity_header = document.createElement('h4')
    commodity_header.className = 'commodity-name'
    commodity_header.setAttribute('contenteditable', 'true')
    commodity_header.innerHTML = 'add full name for commodity..'
    commodity.appendChild(commodity_header)

    operations_list = document.createElement('ul')
    operations_list.className = 'operations'

    var operation = document.createElement('li')
    operation.className = 'operation'
    operation.setAttribute('contenteditable', 'true')
    operation.innerHTML = 'fill in...'
    operations_list.appendChild(operation)

    var remove_btn = document.createElement('i')
    remove_btn.className = 'fa fa-times remove-operation'
    remove_btn.setAttribute('aria-hidden', 'true')
    remove_btn.onclick = removeElement;
    operations_list.appendChild(remove_btn)

    var add_btn = document.createElement('i')
    add_btn.className = 'fa fa-plus add-operation'
    add_btn.setAttribute('aria-hidden', 'true')
    add_btn.onclick = addOperation;
    operations_list.appendChild(add_btn)

    commodity.appendChild(operations_list)
    commodity.appendChild(plus_icon_commodity)
    $(section_id + ' .all-commodities-in-section').append(commodity)
}

function addOperation(e){
    $(this).before('<li class="operation" contenteditable> fill in... </li>')

    var remove_operation = document.createElement('i')
    remove_operation.className = 'fa fa-times remove-operation'
    remove_operation.setAttribute('aria-hidden', 'true')
    remove_operation.onclick = removeElement;
    $(this).before(remove_operation)
}

function removeElement(e){
    // remove <li>-element to the left
     $(this).prev().remove();
     // remove the remove-button
     $(this).remove();
}


function submitProgramToServer(){
    createProgramWithInputValue().then(function(){
        sendNewProgramStageToServer(createProgramStageObject())
        $('#program-name-input').val('')
    })
}
