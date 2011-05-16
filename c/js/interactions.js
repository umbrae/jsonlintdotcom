// Helper Function for Caret positioning
// Gratefully borrowed from the Masked Input Plugin by Josh Bush
// http://digitalbush.com/projects/masked-input-plugin
$.fn.caret=function (begin,end){ 
    if (this.length==0) return;
    if (typeof begin == 'number') {
        end = (typeof end == 'number')?end:begin;  
        return this.each(function (){
            if (this.setSelectionRange){
                this.focus();
                this.setSelectionRange(begin,end);
            }else if (this.createTextRange){
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        });
    } else {
        if (this[0].setSelectionRange){
            begin = this[0].selectionStart;
            end = this[0].selectionEnd;
        }else if (document.selection && document.selection.createRange){
            var range = document.selection.createRange();           
            begin = 0 - range.duplicate().moveStart('character', -100000);
            end = begin + range.text.length;
        }
        return {begin:begin,end:end};
    }       
};

function getNthPos(searchStr, char, pos)
{
    var charCount = 0;
    var strArr = searchStr.split(char);

    if (pos == 0)
        return 0;

    for(i = 0; i < pos; i++)
    {
        if (i >= strArr.length)
            return -1;

        // +1 because we split out some characters
        charCount += strArr[i].length + char.length;
    }

    return charCount;
}

/**
 * Courtesy Paul Oppenheim: http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
**/
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

$(function () {
    var reformatParam = getURLParameter('reformat'),
        reformat = reformatParam !== '0' && reformatParam !== 'no',
        compress = reformatParam === 'compress';

    if (compress) {
        $('#headerText').html('JSONLint<span class="light">Compressor</span>')
    }

    if (!reformat) {
        $('#headerText').html('JSONLint<span class="light">Lite</span>')
    }

    $('#validate').click(function ()
    {
        $('#results_header, #loadSpinner').show();

        try {
            var result = jsonlint.parse($('#json_input').val());
            if (result) {
                $('#results').removeClass('error').addClass('success');
                $('div.linedwrap').removeClass('redBorder').addClass('greenBorder');
                $('#results').text('Valid JSON');

                if (reformat) {
                    $('#json_input').val(JSON.stringify(result, null, "    "));
                }
                
                if (compress) {
                    $('#json_input').val(JSON.stringify(result, null, ""));
                }
            } else {
                alert("An unknown error occurred. Please contact Arc90.");
            }
        } catch(e) {

            lineMatches = e.message.match(/line ([0-9]*)/);
            if (lineMatches && typeof lineMatches == "object" && lineMatches.length > 1)
            {
                lineNum = parseInt(lineMatches[1]);
                str = $('#json_input').val();
            
                if (lineNum == 1)
                    lineStart = 0;
                else
                    lineStart = getNthPos(str, "\n", lineNum-1);
            
                var lineEnd = str.indexOf("\n", lineStart);
                if (lineEnd < 0)
                    lineEnd = str.length;
            
                $('#json_input').focus().caret(lineStart,lineEnd);
            }

            $('#results').text(e.message);

            $('#results').removeClass('success').addClass('error');
            $('div.linedwrap').removeClass('greenBorder').addClass('redBorder');
        }

        $('#loadSpinner').hide();

        return false;
    });

    $('#json_input').keyup(function () {
        $('div.linedwrap').removeClass('greenBorder').removeClass('redBorder');
    }
    ).linedtextarea({
        selectedClass: 'lineselect'
    });

    $('#reset').click(function () { $('#json_input').val('').focus(); } );

    $('#faqButton').click(function () { $('#faq').slideToggle(); } );


}); 
