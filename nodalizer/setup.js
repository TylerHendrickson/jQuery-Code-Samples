//Element array: links DOM elements to js objects
var element = new Array();
// when the DOM is ready...
$(document).ready(function () {
    $('#homenav').find('label').hide();
    var idCounter = 0;
    $('#homenav').find('div').each(function() {
        $(this).attr('id', idCounter);
        idCounter++;
    });
    $('#homenav').find('.container').each(function() {
        var childRef = new Array();
        var childCounter = 0;
        var contId = $(this).attr('id');
        var contLabel = $(this).children('label').text();
        $(this).children('div').each(function() {
            var childLabel = $(this).children('label').text();
            var childId = $(this).attr('id');
            if ($(this).hasClass('destination')) {
                var destRef = $(this).find('a').attr('href');
                element[childId] = new Destination(childLabel, destRef, childId, $(this));
                $(this).children('label').attr('onclick', 'element[' + childId + '].clickAction();');
            }
            childRef[childCounter] = childId;
            childCounter++;
        });
        element[contId] = new Container(contLabel, childRef, contId, $(this));
        $(this).children('label').attr('onclick', 'element[' + contId + '].clickAction();');
    });

    //Set opening animation
    var topNode = element[0];
    topNode.toggleVis();
    




});