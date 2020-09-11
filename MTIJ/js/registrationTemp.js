function reverseString(str) {
    var month = "",
        day = "",
        year = "";
    for (var i = 0; i < str.length; i++) {
        if (i < 2) day += str[i];
        else if (i > 3) year += str[i];
        else month += str[i];
    }
    return (str = year + month + day);
}
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) { t = t + String.fromCharCode(r) }
            if (a != 64) { t = t + String.fromCharCode(i) }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

function base64encode(str) {
    // Hàm dùng để mã hóa
    return Base64.encode(str);
}

$("#btntemp").click(function(event) {
    event.preventDefault();
    var creditNo = $("#creditNo").val();
    var kanaName = $("#kanaName").val();
    var birthday = $("#datepicker").val();
    birthday = birthday.split("/").join("");
    birthday = reverseString(birthday);
    var mailaddress = $("#mailaddress").val();
    if (creditNo == "" || kanaName == "" || birthday == "" || mailaddress == "")
        alert("Bạn chưa nhập đầy đủ thông tin ");
    else {
        let xhr = new XMLHttpRequest();
        let data = `
            {
                \n        \"applicationId\": \"QWERTYUIOASDFGHJKZXC\",
                \n        \"applicationSecret\": \"GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk\",
                \n        \"creditNo\": \"${creditNo}\",
                \n        \"kanaName\": \"${kanaName}\",
                \n        \"birthday\": \"${birthday}\",
                \n        \"mailaddress\":\"${mailaddress}\"
                \n    }
            `;
        console.log(data)
        xhr.open("POST", "http://localhost:44396/members/tempregist");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data)
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState == 4) {
                let tempregist = JSON.parse(this.responseText);
                if (this.status === 200) {
                    let encode = base64encode(tempregist.temporaryId + "01012020");
                    let sendmail = `
                {
                    \n        \"mailaddress\": \"${mailaddress}\",
                    \n        \"encode\":\"${encode}\"
                    \n    }
                `;
                    xhr.open("POST", "http://localhost:9798/Home/sendmail");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(sendmail);
                    window.location = "/notifiCheckmail.html"
                } else {
                    alert(tempregist.error.message)
                }
            }
        });
    }
});