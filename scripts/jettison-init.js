/*
 * 
 * This script is used to set up the display for an issue of Jettison Quarterly magazine.
 * It can be seen in action 
 * 
 * It uses the following jQuery plugins: LocalScroll, SerialScroll, and ScrollTo (created by Ariel Flesler)
 * and is based on the "Coda Slider Effect" originally posted at jQuery for Designers,
 * which is a specialized initialization script of the aforementioned plugins.
 * 
 * The end result produces a page-by-page sliding effect (akin to page-turning).  
 * When the page is "turned" (a navigation button, left or right, is clicked), 
 * events fire to slide to the next page, change the window title (if necessary),
 * auto-scroll to the first page of a requested article (either via menu selection or query string).
 * 
 */

//Initialize the issue
$(document).ready(function () {

    //Replace php links with anchors for JS-enabled browsers
    $(".navigation").find("a").each(function () {
        var link = $(this).attr("href").toString();
        var eindex = link.indexOf("#", 0);
        link = link.substr(eindex);
        $(this).attr("href", link);
    });

    var $panels = $('#slider .scrollContainer > div');
    var $container = $('#slider .scrollContainer');
    //Set scroller orientation
    var horizontal = true;
    if (horizontal) {
        $panels.css({
            'float' : 'left',
            'position' : 'relative' //IE fix to ensure overflow is hidden
        });
        $container.css('width', $panels[0].offsetWidth * $panels.length);
    }

    //set scroll object, hide overflow for out of view frames, and add padding
    var $scroll = $('#slider .scroll').css('overflow', 'hidden');
    var offset = parseInt((horizontal ?
        $container.css('paddingTop') :
        $container.css('paddingLeft'))
    || 0) * -1;

    //navigation buttons
    $scroll
    .before('<img class="scrollButtons left" src="../images/scroll left.png" />')
    .after('<img class="scrollButtons right" src="../images/scroll right.png" />');

    //handle nav selection
    function selectNav() {
        $(this)
        .parents('ul:first')
        .find('a')
        .removeClass('selected')
        .end()
        .end()
        .addClass('selected');
        //Update Title call
        updateTitle($(this).parents('ul:first').find('.selected'));
    }

    //Bind navigation links click function
    $('#slider .navigation').find('a').click(selectNav);


    //go find the navigation link that has this target and select the nav
    function trigger(data) {
        var el = $('#slider .navigation').find('a[href$="' + data.id + '"]').get(0);
        selectNav.call(el);
    }

    //Update the page title
    function updateTitle(data) {
        function convert() {
            return arguments[0].toUpperCase();
        }
        if (data.attr('href')) { //Listed article
            var newTitle = data.attr('href');
            newTitle = newTitle.substr(1);
            //Update social network share link (via AddThis)
            window.addthis.update('share', 'url', 'http://jettisonquarterly.com/currentIssue/index.php?start=' + newTitle)
            newTitle = newTitle.replace(/\b[a-z]/g, convert);
            newTitle = newTitle.replace(/-/g, " ");
            //Update title
            $('title').html("Jettison Quarterly: Issue 09 - " + newTitle);
            window.addthis.update('share', 'title', "Jettison Quarterly: Issue 09 - " + newTitle)
        } else { //Non-article (ad)
            $('title').html("Jettison Quarterly: Issue 09");
        }
    }


    //Automatically add hash to query string
    if (window.location.search) {
        if (!window.location.hash) {
            var qstring = window.location.search;
            qstring = qstring.toString();
            var pindex = qstring.indexOf("=", 0)+1;
            qstring = qstring.substr(pindex);
            window.location.hash = qstring;
            trigger({
                id : window.location.hash.substr(1)
            });
        }
    }

    //Add functionality for URLs with hash
    if (window.location.hash) {
        trigger({
            id : window.location.hash.substr(1)
        });
    } else {
        $('ul.navigation a:first').click();
    }


    var scrollOptions = {
        target: $scroll, //the element that has the overflow

        //set container selector
        items: $panels,
        //define navigation links
        navigation: '.navigation a',
        //navigation selectors
        prev: 'img.left',
        next: 'img.right',
        //2-way scroll effect
        axis: 'xy',
        //Scolling next on last or scrolling back on first page animation stays consistent
        constant: false,
        //last callback: update target, select nav, update title and social elements to reflect new selection
        onAfter: trigger, //last callback
        //define offset
        offset: offset,
        //slide duration in milliseconds
        duration: 500,
        //show hash in address bar
        hash: true,
        //easing - can be used with the easing plugin:
        easing: 'swing'
    };

    //Apply plugins and give defined parameters
    $('#slider').serialScroll(scrollOptions);
    $.localScroll(scrollOptions);
    //scroll to hash if set
    scrollOptions.duration = 1;
    $.localScroll.hash(scrollOptions);

});