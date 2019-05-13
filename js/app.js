
// make an ajax request to get 12 random users and
// post there data to the page.
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function (data) {
        createHtML(data);
        search();
        modalHandler();
    }
});

// this function creates all the html for the random users.
function createHtML(data) {

    // this varible holds all of the html to be added to the page.
    var person = '';

    // this for loop adds one random user to "person" per itteration
    for (let i = 0; i < data.results.length; ++i) {
        person += '<div class="card card-' + i + '" modal-open="' + i + '">';
        person += '<div class="card-img-container">';
        person += '<img class="card-img" src="' + data.results[i].picture.medium + '" alt="' + data.results[i].name.first + ' ' + data.results[i].name.last + '">';
        person += '</div>';
        person += '<div class="card-info-container">';
        person += '<h3 class="card-name card-text cap">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</h3>';
        person += '<p class="card-text">' + data.results[i].email + '</p>';
        person += '<p class="card-text cap">' + data.results[i].location.city + '</p>';
        person += '</div></div>';
        person += '<div class="modal-container card-' + i + '" modal="' + i + '">';
        person += '<div class="modal">';
        person += '<button type="button" id="modal-close-btn" class="modal-close-btn" modal-close="' + i + '" href="#">Close</button>';
        person += '<div class="modal-info-container">'
        person += '<img class="modal-img" src="' + data.results[i].picture.large + '" alt="' + data.results[i].name.first + ' ' + data.results[i].name.last + '">';
        person += '<h3 id="name" class="modal-text cap">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</h3>';
        person += '<p class="modal-text">' + data.results[i].email + '</p>';
        person += '<p clase="modal-text">' + data.results[i].phone + '</p>';
        person += '<hr>';
        person += '<p class="modal-text cap">' + data.results[i].location.street + '.</p>';
        person += '<p class="modal-text cap">' + data.results[i].location.city + ', ' + data.results[i].location.state + ' ' + data.results[i].location.postcode + '</p>';
        person += '<p class="Birthday modal-text ">' + 'Birthday: ' + data.results[i].dob.date.substr(5, 2) + '/' + data.results[i].dob.date.substr(8, 2) + '/' + data.results[i].dob.date.substr(2, 2) + '</p>';
        person += '<img class="right-arrow" src="img/next.png" alt="right arrow">';
        person += '<img class="left-arrow" src="img/prev.png" alt="left arrow"></div>';
        person += '</div></div>';
    }

    // adds the completed html to the dom.
    $('#gallery').html(person);
}

// this function handles all modal events.
function modalHandler() {

    // this eventHandler opens a modal.
    $('[modal-open]').on('click', function (e) {

        // create and object for pass by reference
        // in arrow click function.
        var tgt_modal = { class: 'placeholder' }

        // open the modal.
        tgt_modal.class = $(this).attr('modal-open');
        $('[modal="' + tgt_modal.class + '"]').fadeIn(350);

        // these two function calls handle right
        // and left navigation of the modals.
        arrowClick(tgt_modal, 'right', 1);
        arrowClick(tgt_modal, 'left', -1);

        e.preventDefault();
    });

    // this eventHandler closes a modal.
    $('[modal-close]').on('click', function (e) {

        // close the modal.
        $('[modal="' + $(this).attr('modal-close') + '"]').fadeOut(350);

        // these two function calls remove
        // extranious eventHandlers.
        $('.right-arrow').off();
        $('.left-arrow').off();

        e.preventDefault();
    });
}

// this function handles right and left navigation of the modals.
function arrowClick(tgt_modal, direction, value) {

    // setup a click handler for the "direction" given.
    $('.' + direction + '-arrow').on('click', function () {

        // close the curent modal.
        $('[modal="' + tgt_modal.class + '"]').hide();

        // holds the index of the next modal to open.
        var index = parseInt(tgt_modal.class) + value;

        // if at either end of the list go to the other end.
        if (index > 11) {
            index = 0;
        }
        if (index < 0) {
            index = 11;
        }

        // while "index" is on a hidden card move to the next card.
        while ($('.card-' + index).css('display') === 'none') {
            index += value;

            // if at either end of the list go to the other end.
            if (index > 11) {
                index = 0;
            }
            if (index < 0) {
                index = 11;
            }
        }

        // display card and update "tgt_modal.class"
        $('[modal="' + index + '"]').show();
        tgt_modal.class = index.toString();
    });
}

// function searches the random users and shows and hides them.
function search() {

    // create a input element.
    $('.search-container').append('<form action="#" method="get"><input type="search" id="search-input" class="search-input" placeholder="Search..." name="user_search" /><input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit"></form >');

    // input event keyup()
    $('#search-input').keyup(function () {

        // cycle though all card elements
        $('.card').each(function () {

            // if the for loop anchor element is not null.  compare the card name elements html to the search elements value and show or hide cards as necessary.
            if (($(this).find('.card-name').html()) && ($(this).find('.card-name').html().toUpperCase().indexOf($('#search-input').val().toUpperCase()) >= 0)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

}