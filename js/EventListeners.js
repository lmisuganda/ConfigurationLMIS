var numberOfInfoOnCommodities = 1;

$('#plus-btn').click(function(){
    $('#commodity-info-list').append('<li><input class="commodity-info" "id="commodity-info-' + numberOfInfoOnCommodities + '" type="text" placeholder="e.g., Quantity received, AMC etc." tabindex="1" required></li>')
    numberOfInfoOnCommodities += 1;
});
