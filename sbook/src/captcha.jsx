import $ from 'jquery';

function Captcha() {
    function recaptchaSubmit(token) {
        //alert('captcha' + token.toString());

        $('#recaptchaButton{{ captcha_name }}')
            .html("Answerred")
            .css({
                transition: "2s",
            })
            .addClass('w3-green');
        setTimeout(
            function() {
                $('#recaptchaButton{{ captcha_name }}')
                    .slideUp(1000);
            },
            1000
        );
        try {
            $('form')[0].submit();
            var input = document.createElement('input');
            input.type = "submit";

            $('form')[0].appendChild(input);
            input.click();
        } catch(e) {
            alert(e);
        }
    }
    return (
        <>
            <script src="https://www.google.com/recaptcha/api.js"></script>
            <button
                type="submit"
                className="g-recaptchat w3-border w3-border-cyan bg-clear w3-btn w3-round-large w3-center fg-antimony"
                data-sitekey="6LfNF9kpAAAAAIekNLPQRGkBv9vc6W0ivc9LruqP"
                data-callback={recaptchaSubmit}
                id="recaptchaButton"
                data-action='submit'
            >
                Submit
            </button>
        </>
    );
}


export default Captcha;
