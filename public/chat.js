console.log('int')

const socket = io()

// let btn = document.getElementById('send')

// btn.addEvenListener('click', function() {
//     console.log('click')

//     // socket.emit('chat:message', {
//     //     message: 'hola',
//     //     username: 'pepe'
//     // })

// })

$("#send").click(function() {
    send_message()
})

function send_message() {

    let user = $("#username").val()
    let msg = $("#message").val()

    socket.emit('chat:message', {
        message: msg,
        username: user
    })
    $('#message').val('');

}

$('#message').keypress(function(e) {
    if (e.keyCode == 13) {
        send_message()
            // console.log(mensajes);
    }
});


$("#message").keypress(function() {
    // console.log("typing..")
    socket.emit('chat:typing', $("#username").val())
})

socket.on('chat:message', function(data) {
    console.log('emit from server:', data)

    // let user = $("#username").val()
    // let msg = $("#message").val()

    let html = `<p>${data.username}: ${data.message}</p>`
    $("#output").html($("#output").html() + html)

    $('#output')[0].scrollTop = $('#output')[0].scrollHeight;

})

socket.on('chat:typing', function(data) {
    // console.log(data + ' is typing')
    $("#status").html("status: " + data + ' is typing')
})