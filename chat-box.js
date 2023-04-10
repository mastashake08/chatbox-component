<template id="chat-box-template">
  <style>
    .chat-box {
      width: 300px;
      height: 400px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      overflow: hidden;
    }

    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #333;
      color: #fff;
      padding: 10px;
      font-size: 18px;
    }

    .close-button {
      background-color: transparent;
      border: none;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }

    .chat-messages {
      height: 300px;
      overflow-y: scroll;
      padding: 10px;
    }

    .chat-message {
      background-color: #f1f1f1;
      padding: 5px;
      margin: 5px 0;
      border-radius: 4px;
    }

    .chat-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border-top: 1px solid #ddd;
    }

    .chat-input input[type="text"] {
      flex: 1;
      margin-right: 10px;
      padding: 5px;
      border: none;
      border-radius: 4px;
    }

    .chat-input button {
      background-color: #333;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  <div class="chat-box">
    <div class="chat-header">
      <h2>Chat Box</h2>
      <button class="close-button">x</button>
    </div>
    <div class="chat-messages">
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Type your message here" />
      <button class="send-button">Send</button>
    </div>
  </div>
</template>

<script>
  class ChatBox extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById('chat-box-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: 'open' })
        .appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
      const closeButton = this.shadowRoot.querySelector('.close-button');
      const sendButton = this.shadowRoot.querySelector('.send-button');
      closeButton.addEventListener('click', () => this.remove());
      sendButton.addEventListener('click', this.sendMessage.bind(this));
    }

    sendMessage() {
      const input = this.shadowRoot.querySelector('input');
      const message = input.value.trim();
      if (message) {
        const messagesDiv = this.shadowRoot.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);
        input.value = '';
      }
    }
  }

  customElements.define('chat-box', ChatBox);
</script>
