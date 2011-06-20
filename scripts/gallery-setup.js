/**
 *
 * This script is used to perform asynchronous page requests from a parent page.
 * 
 * In this context, it is loaded within the "Gallery" page (parent)
 * and sets certain links make an AJAX call that will return the content of the specified individual "Album" sub-pages (children).
 * 
 * When these "Album" pages are changed by a new request, the old album fades out and the new album fades in.
 * 
**/


$(document).ready(function () {
    $('#gallerymenu').find('a').each(function () {
        $(this).attr('onclick', 'galClick(this); return false;');
    });
    $('a.galFirst').click();
});

function loadAnchor(newAnchor){
    if(newAnchor != document.location.hash){
        document.location.hash = newAnchor;
        var reqPage = newAnchor.substring(1);
        var query = "gallery=" + reqPage;
        $('#galleryholder').fadeOut(800, function () {
            $.get("./gallery_view.php",query, function (data) {
                $('#galleryholder').html(data);
                $('#galleryholder').fadeIn(2900);
            });
        });
    }
}

function galClick (sel) {
    $(sel).parent('li').parent('ul').find('.sel-gal').removeClass('sel-gal');
    $(sel).parent('li').addClass('sel-gal');
    loadAnchor($(sel).attr('href'));
}