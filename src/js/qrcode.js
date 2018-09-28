var qrcode = new QRCode("qrcode");

function makeCode () {
    var text = document.getElementById("qrtext");
    qrcode.makeCode(text.value);
}

makeCode();
