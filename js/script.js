function getAllPrograms(){
    return $.ajax({
        url: "/api/programs.jsonp?paging=false&",
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/jsonp',
        authorization: "Bearer 7fa34aca-a5ba-485b-b108-b18faad54c6d",
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        success: function (data) {
            data.programs.map((val, idx) => {
                $('#program_selector').append( '<option id="' + val.id + '">' + val.displayName + '</option>' );
            })
        }
    });
}

getAllPrograms();
