$(document).ready(function() {
    $('#btn').click(function(e) {
        var accountId = $('#accountId').val()
        var password = $('#password').val()
        if (accountId == "" || password == "")
            alert("Bạn chưa nhập đầy đủ thông tin ")
        else {
            let xhr = new XMLHttpRequest();
            let data = `
            {
                \n        \"applicationId\": \"QWERTYUIOASDFGHJKZXC\",
                \n        \"applicationSecret\": \"GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk\",
                \n        \"accountId\": \"${accountId}\",
                \n        \"password\": \"${password}\"
                \n    }
            `
            console.log(data)
            xhr.open("POST", "http://localhost:44396/members/auth");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState == 4 && this.status === 200) {
                    alert("You have successfully login!")
                } else {
                    let temp = JSON.parse(this.responseText);
                    alert(temp.error.message)
                }
            });
        }
    })
});