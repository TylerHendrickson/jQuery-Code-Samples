/*
 * This script is used to fade a page in and out when it is loaded.  It does not use AJAX.
 * 
 * A "Header" area (common to all pages) is defined, which is unaffected by the transition (appearing to remain static while the body content changes)
 * 
 * If the homepage is being loaded for the first time (which is flagged in this sample by an empty URL anchor), 
 * the "Header" area will fade in to allow for a graceful initial load of the website.
 * 
 * This function is called when the onclick() event is fired on a link.  
 * It applies to all links on the page, except those which open in a new window or which simply scroll to an anchor.
 * 
 */


$(document).ready(function () {
    var hpFlag = window.location.toString().substr(-6);
    if (hpFlag == "home/#") { //Initial homepage visit, run all animations
        $('#header').children().hide();
        $('#header .title').fadeIn(2000, 'swing');
        $('#header #menu').fadeIn(2800, 'swing');
        $('#content').hide();
        $('#content').fadeIn(2900, 'swing');
        $('body').find('a').each(function () {
            $(this).attr('onclick', 'navClick(this); return false;');
        });
    } else { //Homepage revisitation (via link) or non-homepage visited, run body animations only
        $('#content').hide().fadeIn(2900, 'swing');
        $('body').find('a').each(function () {
            if ($(this).attr('href').substr(0,1) != '#') {
                if ($(this).attr('target') != '_blank') {
                    $(this).attr('onclick', 'navClick(this); return false;');
                }
            }
        });
    }
});
function navClick (sel) {
    $('#content').fadeOut(800, function () {
        window.location = ($(sel).attr('href'));
    });
}