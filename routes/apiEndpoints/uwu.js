var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send({ success: false, message: `send a string to uwuify!`})
});

router.get('/:string', function(req, res) {
    res.send({ success: true, message: uwuify(req.params.string)})
});

//ez code copy from Onryx
function uwuify(pre) {
    var str = pre

    str = str.replace('L', 'W')
    str = str.replace('R', 'W')
    str = str.replace('l', 'w')
    str = str.replace('r', 'w')
    str = str.replace(" n", " ny")
    str = str.replace(" N", " Ny")
    str = str.replace("ove", "uv")
    str = str.replace("OVE", "UV")
    str = str.replace("this", "dis")
    str = str.replace("no", "nyo")
    str = str.replace("mo", "myo")
    str = str.replace("No", "Nyo")
    str = str.replace("Mo", "Myo")
    str = str.replace("na", "nya")
    str = str.replace("ni", "nyi")
    str = str.replace("nu", "nyu")
    str = str.replace("ne", "nye")
    str = str.replace("anye", "ane")
    str = str.replace("inye", "ine")
    str = str.replace("onye", "one")
    str = str.replace("unye", "une")

        if (str[0].match(/[a-z]/i))
            str = str[0] + "-" + str;

        if (str[str.length - 1].match(/[a-z]/i))
            str = str + "\~\~";

            return str
}

module.exports = router;