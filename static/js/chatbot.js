document.addEventListener("DOMContentLoaded", function () {
  const chatBody = document.getElementById('chat-body');
  const chatFooter = document.querySelector('.chat-footer');

  function appendMessage(content, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.innerText = content;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      message.style.opacity = '1';
      message.style.transform = 'translateY(0)';
    }, 50);
  }

  chatFooter.addEventListener('submit', function (event) {
    event.preventDefault();
    const input = chatFooter.querySelector('input');
    const userMessage = input.value.trim();

    if (userMessage !== '') {
      appendMessage(userMessage, 'user'); 
      input.value = ''; 

      setTimeout(() => {
        appendMessage('Estoy aquí para ayudarte, pero aún no tengo respuestas automáticas.', 'bot');
      }, 1000); 
    }
  });

  appendMessage('¡Hola! Escribe tu mensaje para empezar.', 'bot');
});
