let NameBox = document.getElementById('username')
let ChatBox = document.getElementById('chat-box')
let MessageBox = document.getElementById('text-box')
let CharCount = document.getElementById('char-count')
let StressTest = document.getElementById('not-so-fun-button')


MessageBox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        let TypeText = MessageBox.value
        MessageBox.value = ''
        let message = document.createElement('p')

        message.textContent = `${NameBox.value}: ${TypeText}`
        ChatBox.appendChild(message)

        console.log(`${NameBox.value}: ${TypeText}`)

        fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: NameBox.value,
                message: TypeText
            })
        })

    }

    if (MessageBox.value.length == 0) { CharCount.textContent = 0 }
})
// Might need to make the messages Server side so it doesn't give ghost messages


MessageBox.addEventListener('input', () => {
    CharCount.textContent = MessageBox.value.length
})

async function LoadChatHistory() {
    let response = await fetch('/api/chat_history')
    let history = await response.json()

    ChatBox.textContent = ''

    history.forEach(chat => {
        let msgElement = document.createElement('p')
        msgElement.textContent = `${chat.username}: ${chat.message}`
        ChatBox.appendChild(msgElement)
        ChatBox.scrollTop = ChatBox.scrollHeight;
    })
}

window.onload = LoadChatHistory
setInterval(LoadChatHistory, 2000)
