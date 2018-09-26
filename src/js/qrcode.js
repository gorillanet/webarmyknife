var qrcode = new QRCode("qrcode");

function makeCode () {
    var text = document.getElementById("qrtext");
    qrcode.makeCode(text.value);
}
document.getElementById("qrtext").value = isvalidurl(currentURL) ? currentURL : "";
makeCode();
