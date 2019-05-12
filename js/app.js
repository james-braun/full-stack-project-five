
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
        person += '<div class="card person-' + i + '" data-popup-open="popup-' + i + '">';
        person += '<img class="card-img" src="' + data.results[i].picture.thumbnail + '" alt="' + data.results[i].name.first + ' ' + data.results[i].name.last + '">';
        person += '<div class="card-info-container">';
        person += '<div class="name card-text cap">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</div>';
        person += '<div class="card-text">' + data.results[i].email + '</div>';
        person += '<div class="card-text cap">' + data.results[i].location.city + '</div>';
        person += '</div></div>';
        person += '<div class="modal-container person-' + i + '" data-popup="popup-' + i + '">';
        person += '<div class="modal">';
        person += '<img class="modal-img" src="' + data.results[i].picture.thumbnail + '" alt="' + data.results[i].name.first + ' ' + data.results[i].name.last + '">';
        person += '<div class="modal-name modal-text cap">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</div>';
        person += '<div class="email modal-text">' + data.results[i].email + '</div>';
        person += '<div clase="phone modal-text">' + data.results[i].phone + '</div>';
        person += '<div class="divider"></div>';
        person += '<div class="street modal-text cap">' + data.results[i].location.street + '</div>';
        person += '<div class="city modal-text cap">' + data.results[i].location.city + '</div>';
        person += '<div class="state modal-text cap">' + data.results[i].location.state + '</div>';
        person += '<div class="postcode modal-text">' + data.results[i].location.postcode + '</div>';
        person += '<div class="Birthday modal-text ">' + 'Birthday: ' + data.results[i].dob.date.substr(5, 2) + '/' + data.results[i].dob.date.substr(8, 2) + '/' + data.results[i].dob.date.substr(2, 2) + '</div>';
        person += '<button class="modal-close-btn btn" data-popup-close="popup-' + i + '" href="#">Close</button>';
        person += '<img class="right-arrow" src="img/next.png" alt="right arrow">';
        person += '<img class="left-arrow" src="img/prev.png" alt="left arrow"></div></div> ';
        //if ((i === 3) || i === 7) {
        //    person += '</div><div class="div-container">';
        //}
        //if (i == 11) {
        //    person += '</div>'
        //}
    }
    document.getElementById('gallery').innerHTML = person;
}
 
function popupHandler() {

    //----- OPEN
    $('[data-popup-open]').on('click', function (e) {
        var targeted_popup = { class: 'placeholder' }
        targeted_popup.class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup.class + '"]').fadeIn(350);
        arrowClick(targeted_popup, 'right', 1, 0);
        arrowClick(targeted_popup, 'left', -1, 11);
        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function (e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        $('.right-arrow').off();
        $('.left-arrow').off();
        e.preventDefault();
    });
}

function arrowClick(targeted_popup, direction, value, bound) {
    $('.' + direction + '-arrow').on('click', function () {
        $('[data-popup="' + targeted_popup.class + '"]').fadeOut(350);
        var array = targeted_popup.class.split('-');
        index = parseInt(array[1]) + value;
        while ($('.person-' + index).css('display') === 'none') {
            console.log(index);

            if (index > 10) {
                index = 0
                continue;
            }
            if (index < 1) {
                index = 11
                continue;
            }
            index += value;
        }
        if (((parseInt(array[1]) > 0) && (parseInt(array[1]) < 11)) || ((this.className === 'left-arrow') && ((parseInt(array[1]) === 11))) || ((this.className === 'right-arrow') && ((parseInt(array[1]) === 0)))) {
            $('[data-popup="' + array[0] + '-' + index + '"]').fadeIn(350);
            targeted_popup.class = array[0] + '-' + index;
        } else {
            $('[data-popup="' + array[0] + '-' + bound + '"]').fadeIn(350);
            targeted_popup.class = array[0] + '-' + bound;
        }
    });
}

function search() {

    // create a input element.
    const $searchElement = $('<input type="search" id="search-input" placeholder="Search" value="" name="user_search" />');
    $('.search-container').append($searchElement);

    // function tests if search is in data-title.
    function includes(container, value) {
        if (container.indexOf(value) >= 0) {
            return true;
        }
        return false;
    }

    // input event keyup()
    $('#search-input').keyup(function () {

        // cycle though all anchor elements
        $('.card').each(function () {
            // if the for loop anchor element is not null.  compare the anchor elements data-title to the search elements value and show or hide pictures as necessary.
            if (($(this).find('.name').html()) && (includes($(this).find('.name').html().toUpperCase(), $('#search-input').val().toUpperCase()) === true)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

}