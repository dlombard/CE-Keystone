
var _setLyricsMarkdown = (lyrics) => {
    var _lyrics = lyrics
    var keys = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "Refrain", "Kè:", "Choeur:", "Choeur", "Kè", "Refrin", "Réfrin:"];

    var keyChorus = ["Refrain", "Kè:", "Choeur:", "Choeur", "Kè", "Refrin", "Réfrin:"];

    var keywords = [""];


    var chorus = [""];
    for (var s in keys) {

        keywords.push(keys[s]);
    }
    for (var c in keyChorus) {
        chorus.push(keyChorus[c]);
    }

    var inputSplitNewLine = _lyrics.split("\n");
    var sb = "";

    var isFirstLine = true;
    var isVerseStart = false;
    var isRefrain = false;

    for (var strline in inputSplitNewLine) {
        for (var k in keys) {
            if (inputSplitNewLine[strline].trim().toLowerCase().indexOf(keys[k].toLowerCase()) == 0
                && inputSplitNewLine[strline].toLowerCase().trim().length == keys[k].length) {

                if (isFirstLine) {
                    sb = sb.concat("**" + keys[k] + "** \n");
                    isFirstLine = false;
                }
                else {
                    sb = sb.concat("\n");
                    if (isRefrain) {
                        isRefrain = false;
                        sb = sb.concat("\n");
                    }
                    for (var c in chorus) {
                        if (inputSplitNewLine[strline].trim().toLowerCase()
                            .indexOf(chorus[c].toLowerCase()) == 0 && inputSplitNewLine[strline].toLowerCase().trim().length == chorus[c].length) {
                            sb = sb.concat("\n");
                            isRefrain = true;
                        }
                    }
                    sb = sb.concat("**" + keys[k] + "**\n");
                }
                isVerseStart = true;
                isFirstLine = false;
                break;
            }
        }
        if (!isVerseStart) {
            if (isRefrain) {
                if (inputSplitNewLine[strline].length > 2) {
                    sb = sb.concat(`**${inputSplitNewLine[strline].trim()}** \n`);
                }
            }
            else
                if (inputSplitNewLine[strline].length > 2) {
                    sb = sb.concat(`${inputSplitNewLine[strline].trim()} \n`);
                }
        }
        isVerseStart = false;
    }
    sb = sb.concat("\n");
    return sb;

}

module.exports = _setLyricsMarkdown;