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
    console.log('click')
    let user = $("#username").val()
    let msg = $("#message").val()

    socket.emit('chat:message', {
        message: msg,
        username: user
    })
})

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

})

socket.on('chat:typing', function(data) {
    // console.log(data + ' is typing')
    $("#status").html("status: " + data + ' is typing')
})