$(document).ready(function() {
    if (localStorage.getItem('popState') != 'shown') {
        $("#cookieConsent").fadeIn(200);
        localStorage.setItem('popState', 'shown')
    }
    $("#closeCookieConsent, .cookieConsentOK").click(function() {
        $("#cookieConsent").fadeOut(200);
    });
});
