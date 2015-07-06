
$( document ).ready(function() {

    $("#bids button").click(function() {
        var suit = $(this).parent()[0].classList[1];
        var card = $.trim($(this).text());
        if(suit) {
            card = card + '' + suit[0].toUpperCase();
        }

        if(card === 'Undo'){
            if($('#bidding_results .grid li').length > 4){
                $('#bidding_results .grid li:last').remove();
            }
        } else {
            $('#bidding_results .grid').append('<li>' + card + '</li>');
        }
    });


    var cards_played = 0;

    $("#plays button").click(function() {
        var suit = $(this).parent()[0].classList[1];
        var card = $.trim($(this).text());
        if(suit) {
            card = card + '' + suit[0].toUpperCase();
        }


        if(card === 'Undo'){

            var last = null;

            if(cards_played < 14){
                last = $('#playing_results .grid #north div:first').text();
                $('#playing_results .grid #north div:first').remove();
            }else if(cards_played < 27){
                last = $('#playing_results .grid #east div:first').text();
                $('#playing_results .grid #east div:first').remove();
            }else if(cards_played < 38){
                last = $('#playing_results .grid #south div:first').text();
                $('#playing_results .grid #south div:first').remove();
            }else if(cards_played < 53){
                last = $('#playing_results .grid #west div:first').text();
                $('#playing_results .grid #west div:first').remove();
            }

            last = last[0] + {'C': 'clubs', 'D': 'diams', 'H': 'hearts', 'S': 'spades'}[last[1]]

            $('#card-' + last).removeAttr('disabled');

            cards_played -= 1;
        } else {

            $(this).attr('disabled','disabled');

            var text = '<div>' + card + '</div>';
            if(cards_played < 13){
                $('#playing_results .grid #north').prepend(text);
            }else if(cards_played < 26){
                $('#playing_results .grid #east').prepend(text);
            }else if(cards_played < 39){
                $('#playing_results .grid #south').prepend(text);
            }else if(cards_played < 52){
                $('#playing_results .grid #west').prepend(text);
            }

            cards_played += 1;
        }




    });



    $("#board-complete").click(function() {

        var data = {
            table_number: $('#table-number').val(),
            board_number: $('#board-number').val(),
            round_number: $('#round-number').val(),
            bidding: $('#bidding_results').html(),
            hands: {
                north: $('#north').html(),
                east: $('#east').html(),
                south: $('#south').html(),
                west: $('#west').html(),
            },
            players: {
                north: $('#player_north').val(),
                east: $('#player_east').val(),
                south: $('#player_south').val(),
                west: $('#player_west').val(),
            },
            tricks: $('#tricks').val(),
            vulnerability: $('#board-vulnerability').val()
        }

        $.ajax({
          type: "POST",
          url: '/complete',
          data: data,
          success: function(data, textStatus, jqXHR ) { console.log(data); },
          dataType: 'text'
        });
    });


    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

    $('.view_board').click(function() {
        console.log($('#' + $(this).attr('rel')));

        $('.show_single_board').hide();
        $('#' + $(this).attr('rel')).show();
    });

});
