 $(function () {
    

     var i = -1;
        var toastCount = 0;
        var $toastlast;

        var getMessage = function () {
            var msgs = ['My name is Inigo Montoya. You killed my father. Prepare to die!',
                '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
                'Are you the six fingered man?',
                'Inconceivable!',
                'I do not think that means what you think it means.',
                'Have fun storming the castle!'
            ];
            i++;
            if (i === msgs.length) {
                i = 0;
            }

            return msgs[i];
        };

        var getMessageWithClearButton = function (msg) {
            msg = msg ? msg : 'Clear itself?';
            msg += '<br /><br /><button type="button" class="btn clear">Yes</button>';
            return msg;
        };

    var msg = "Indomie girl";
    var title = '';
    var $showDuration = "300";
    var $hideDuration = "1000";
    var $timeOut = "5000";
    var $extendedTimeOut = "1000";
    var $showEasing = "swing";
    var $hideEasing = "linear";
    var $showMethod = "fadeIn";
    var $hideMethod = "fadeOut";
    var $onclick = "null";
    
    var $addClear = true;      

    toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-bottom-center",
            preventDuplicates: true,
            onclick: null
        };

    if ($showDuration.length) {
        toastr.options.showDuration = $showDuration;
    }

    if ($hideDuration.length) {
        toastr.options.hideDuration = $hideDuration;
    }

    if ($timeOut.length) {
        toastr.options.timeOut = $addClear ? 0 : $timeOut;
    }

    if ($extendedTimeOut.length) {
        toastr.options.extendedTimeOut = $addClear ? 0 : $extendedTimeOut;
    }

    if ($showEasing.length) {
        toastr.options.showEasing = $showEasing;
    }

    if ($hideEasing.length) {
        toastr.options.hideEasing = $hideEasing;
    }

    if ($showMethod.length) {
        toastr.options.showMethod = $showMethod;
    }

    if ($hideMethod.length) {
        toastr.options.hideMethod = $hideMethod;
    }

    if ($addClear) {
        msg = getMessageWithClearButton(msg);
        toastr.options.tapToDismiss = false;
    }


}
)