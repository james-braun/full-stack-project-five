
// make an ajax request to get 12 random users and
// post there data to the page.
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function (data) {
        createHtML(data);
        search();
        popupHandler();
    }
});

function createHtML(data) {
    var person = ''
    for (let i = 0; i < data.results.length; ++i) {
        person += '<div class="card card-' + i + '" modal-open="popup-' + i + '">';
        person += '<img class="card-img" src="' + data.results[i].picture.thumbnail + '" alt="' + data.results[i].name.first + ' ' + data.results[i].name.last + '">';
        person += '<div class="card-info-container">';
        person += '<div class="name card-text cap">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</div>';
        person += '<div class="card-text">' + data.results[i].email + '</div>';
        person += '<div class="card-text cap">' + data.results[i].location.city + '</div>';
        person += '</div></div>';
        person += '<div class="modal-container card-' + i + '" modal="popup-' + i + '">';
        person += '<div class="modal">';
        person += '<img class="modal-img" src="' + data.results[i].picture.thumbnail + '" alt="' + data.results[i].name.first + ' ' + data.results[i].name.last + '">';
        person += '<div class="modal-name modal-text cap">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</div>';
        person += '<div class="email modal-text">' + data.results[i].email + '</div>';
        person += '<div clase="phone modal-text">' + data.results[i].phone + '</div>';
        person += '<hr>';
        person += '<div class="street modal-text cap">' + data.results[i].location.street + '</div>';
        person += '<div class="city modal-text cap">' + data.results[i].location.city + '</div>';
        person += '<div class="state modal-text cap">' + data.results[i].location.state + '</div>';
        person += '<div class="postcode modal-text">' + data.results[i].location.postcode + '</div>';
        person += '<div class="Birthday modal-text ">' + 'Birthday: ' + data.results[i].dob.date.substr(5, 2) + '/' + data.results[i].dob.date.substr(8, 2) + '/' + data.results[i].dob.date.substr(2, 2) + '</div>';
        person += '<button class="modal-close-btn btn" modal-close="popup-' + i + '" href="#">Close</button>';
        person += '<img class="right-arrow" src="img/next.png" alt="right arrow">';
        person += '<img class="left-arrow" src="img/prev.png" alt="left arrow"></div></div> ';
    }
    $('#gallery').html(person);
}
 
function popupHandler() {
    $('[modal-open]').on('click', function (e) {
        var tgt_modal = { class: 'placeholder' }
        tgt_modal.class = $(this).attr('modal-open');
        $('[modal="' + tgt_modal.class + '"]').fadeIn(350);
        arrowClick(tgt_modal, 'right', 1, 0);
        arrowClick(tgt_modal, 'left', -1, 11);
        e.preventDefault();
    });

    $('[modal-close]').on('click', function (e) {
        var tgt_modal_class = $(this).attr('modal-close');
        $('[modal="' + tgt_modal_class + '"]').fadeOut(350);
        $('.right-arrow').off();
        $('.left-arrow').off();
        e.preventDefault();
    });
}

function arrowClick(tgt_modal, direction, value, bound) {
    $('.' + direction + '-arrow').on('click', function () {
        $('[modal="' + tgt_modal.class + '"]').fadeOut(350);
        var array = tgt_modal.class.split('-');
        index = parseInt(array[1]) + value;
        if (index > 11) {
            index = 0;
        }
        if (index < 0) {
            index = 11;
        }
        while ($('.card-' + index).css('display') === 'none') {
            console.log('before: ',index, ' ', value);
            index += value;
            if (index > 11) {
                index = 0;
            }
            if (index < 0) {
                index = 11;
            }

            console.log('after: ', index);
        }
        $('[modal="' + array[0] + '-' + index + '"]').fadeIn(350);
            tgt_modal.class = array[0] + '-' + index;
    });
}

function search() {

    // create a input element.
    $('.search-container').append('<input type="search" id="search-input" placeholder="Search" value="" name="user_search" />');

    // input event keyup()
    $('#search-input').keyup(function () {

        // cycle though all card elements
        $('.card').each(function () {

            // if the for loop anchor element is not null.  compare the anchor elements html to the search elements value and show or hide cards as necessary.
            if (($(this).find('.name').html()) && ($(this).find('.name').html().toUpperCase().indexOf($('#search-input').val().toUpperCase()) >= 0)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

}