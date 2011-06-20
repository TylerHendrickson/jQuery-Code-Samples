/*
 *
 * This script is for displaying and posting a form with AJAX.
 * 
 * It works with the Fancybox plugin for jQuery to display a form in a "window" or "frame" in the foreground of the page.
 * 
 * See other comments for more details on what this script handles.
 * 
 */

$(document).ready(function() {

    //Ajax setup
    var options = {
        target:        '#alert',
        beforeSubmit:  showRequest,
        success:       showResponse
    };
    $("#contactForm").ajaxForm(options);
    
    
    //Fancybox setup for contact form
    $("a#inline").fancybox({
        hideOnContentClick: false,
        overlayShow: true,
        width: 650,
        height: 400,
        autoDimensions: false,
        showNavArrows: false,
        enableEscapeButton: false 
    });
    //Set form fields to initial state on exit button
    $("a#fancybox-close").click(function () {
        $("#contactForm").resetForm();
    });       
    
    //Contact form field setup
    //Initial field focus clearing
    $("#contactForm input.frmtext,#contactForm textarea").focus(function () {
        switch ($(this).val()) {
            case 'Your Name':
                $(this).val('');
                break;
            case 'Your Email':
                $(this).val('');
                break;
            case 'Telephone (optional)':
                $(this).val('');
                break;
            case 'Enter text here.':
                $(this).val('');
                break;
        }
    });
    //Reset fields to initial state if left blank
    $("#contactForm input.frmtext,#contactForm textarea").blur(function () {
        if ($(this).val() == '') {
            var name = $(this).attr('name');
            switch (name) {
                case 'name':
                    $(this).val('Your Name');
                    break;
                case 'email':
                    $(this).val('Your Email');
                    break;
                case 'tele':
                    $(this).val('Telephone (optional)');
                    break;
                case 'message':
                    $(this).val('Enter text here.');
                    break; 
            }
        }
    })
});


//Ajax functions
function showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
    return true;
}
function showResponse(responseText, statusText)  {
    //Response text delivery flag
    //Success flag: <!--1-->
    //Fail flag: <!--0-->
    var rs = responseText.substr(0,8);
    if (rs == "<!--1-->") {
        //Form filled out correctly, message sent: close fancybox
        contactSuccess();
    }
}
function contactSuccess(){
    $("a#fancybox-close").click();
    $("#inline img").attr('src', '../images/contact_post.jpg');
}
$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input',this).clearForm();
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};