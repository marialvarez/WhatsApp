function Chat()
{
	this.nombre = '';
	this.people = [];
	this.messages = [];
	this.chatAvatar = '';
}
function Person(_name, _avatar)
{
	this.name = _name;
	this.avatar = _avatar;
    this.colorPerson = null;
}
function Message(_message, _sender)
{
	this.message = _message;
	this.sender = _sender;
	this.received = false;
}
function Whatsapp()
{
	this.chats = [];
	this.selectedChat = null;
	this.searchChat		= function(_keyword){};
	this.getChatFromId	= function(_chatId){};
	this.drawChatList	= function(_htmlTarget){
        
		var ulChatList = document.getElementById('chat-list');

		for (var i in this.chats) {
			console.log(this.chats[i].messages);
			var htmlChatList = '<li><div class="avatar avatarChat">' +
					'<img src="' + this.chats[i].chatAvatar + '" alt="" class="wh-44">' +
					'<h4 class="w-contact-name">' + this.chats[i].nombre +'</h4>' +
					'<p class="w-last-message">' + this.chats[i].messages[this.chats[i].messages.length-1].message + '</p>' +
				'</div>' +
				'<div class="time">03/01/2016</div>' +
			'</li>';
			ulChatList.innerHTML += htmlChatList;
		}
	};
    
	this.drawMessageList= function(){
		var divChat = document.getElementById('chat');
		divChat.innerHTML = '';

		for (var i in this.selectedChat.messages) {
			if (object.hasOwnProperty(i)) {
				console.log(this.selectedChat.messages[i]);
				this.sendMessage(this.selectedChat.messages[i], false);
			}
		}
	};
    
	this.getLastMessage = function(){
		return this.selectedChat.messages[this.selectedChat.messages.length-1];
	};
    
	this.sendMessage	= function(_message, _in){
        
        var divChat = document.getElementById('chat');
        var time = document.getElementsByClassName("time");
        
        //Agregar hora
        var fecha = new Date();
        var hour = fecha.getHours()+':'+fecha.getMinutes(); 
        
		var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><p>'+'<h5 style="color:'+_in.colorPerson+'">'+_in.name+'</h5></p>' + _message.message + '</p><div class="time">'+hour+'</div></div></div>';
		var htmlMessageOut = '<div class="w-message w-message-out"><div class="w-message-text"><p>' + _message.message +'</p><div class="time">'+hour+'</div></div></div>';
		

		this.selectedChat.messages.push(_message);

		if(_in.name=="Mari")
		{
			divChat.innerHTML += htmlMessageOut;
		}else{
			divChat.innerHTML += htmlMessageIn;
		}

		divChat.scrollTop = divChat.scrollHeight;
	};
}

//Llamando objeto Whatsapp y añadiendolo a variable wapp
var wapp = new Whatsapp();

var me = new Person('Mari');
var isa = new Person('Isa');
var fabi = new Person('Fabi');
var clau = new Person('Clau');

/*isa.colorPerson = "Blue";
fabi.colorPerson = "Pink";
clau.colorPerson = "Green";*/

//Creando Chat 1
var chat = new Chat();
chat.nombre = "Isa";
chat.chatAvatar = 'https://scontent.flim5-1.fna.fbcdn.net/v/t1.0-9/15078870_1187236971355462_2775515991186644246_n.jpg?oh=0f7d96282b372b17353e7dd04e99c2e1&oe=591BB2F2';
chat.people.push(isa);

wapp.chats.push(chat);

//Creando Chat 2
var chat2 = new Chat();
chat2.nombre = "Fabi";
chat2.chatAvatar = 'https://scontent.flim5-1.fna.fbcdn.net/v/t1.0-9/555477_10200777656661310_1627703763_n.jpg?oh=cc98b325df73ba33215a659bd2d5fd0a&oe=591072BA';
chat2.people.push(fabi);

wapp.chats.push(chat2);

//Creando Chat 3
var chat3 = new Chat();
chat3.nombre = "Clau";
chat3.chatAvatar = "https://scontent.flim5-1.fna.fbcdn.net/v/t1.0-1/16425854_698484870318058_6002538839610456083_n.jpg?oh=b857c6081a904bc075ce9faafe33e1ca&oe=5901B12F";
chat3.people.push(clau);

wapp.chats.push(chat3);



//Agregar mensajes a cada chat
wapp.selectedChat = chat;

wapp.sendMessage(new Message('Hola', isa),isa);
wapp.sendMessage(new Message('Que tal?',me),me);
wapp.sendMessage(new Message('Yo muy bien, tu que tal?',isa),isa);

wapp.selectedChat = chat2;

wapp.sendMessage(new Message('Hola',me),me);
wapp.sendMessage(new Message('Tienes un peine?',fabi),fabi);

wapp.selectedChat = chat3;

wapp.sendMessage(new Message('Holiiii Mari',clau),clau);

wapp.drawChatList();

//console.log(wapp.getLastMessage().sender);

window.onload = init;

var inputMessage;
var divChat;
var chatPanel;

function init()
{
	inputMessage = document.getElementById('mensajes');
	divChat = document.getElementById('chat');
	//chatPanel = document.querySelector('.w-chat-panel');

	inputMessage.addEventListener('keyup', onInputKeyUp);
}

function onInputKeyUp(evt)
{
	console.log(evt.keyCode);
	if(evt.keyCode == 13)
	{
		wapp.sendMessage(new Message(evt.target.value,me),me);
		evt.target.value = '';
	}
}

//Funcion buscador
var search = document.getElementById("search");
var contacto = document.getElementsByTagName("h4");
var forEach = Array.prototype.forEach;

search.addEventListener("keyup", function(e){
  var choice = this.value;

  forEach.call(contacto, function(f){
      if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
          f.parentNode.parentNode.style.display = "none";   
      else
         f.parentNode.parentNode.style.display = "block";        
  });
}, 
false);

//Cambiar header
var imgContact = document.getElementById("imgContact");
var contactName = document.getElementById("contactName");
var listContact = document.getElementById("listContact");
var ventanaChat = document.getElementById("chat");

var avatarChat = document.getElementsByClassName("avatarChat");
var arreglo = [];

arreglo.push(avatarChat);

for(var i=0; i<=avatarChat.length; i++){
    avatarChat[i].addEventListener("click",changeHeader);
  
}

function changeHeader(){
    imgContact.src = this.children[0].src;
    contactName.textContent = this.children[1].textContent;
    listContact.innerHTML = "";
    ventanaChat.innerHTML = "";
    
    if(imgContact.src == chat.chatAvatar) {
        wapp.selectedChat = chat;

        wapp.sendMessage(new Message('Hola', isa),isa);
        wapp.sendMessage(new Message('Que tal?',me),me);
        wapp.sendMessage(new Message('Yo muy bien, tu que tal?',isa),isa); 
    }
    
    if(imgContact.src == chat2.chatAvatar){
        wapp.selectedChat = chat2;

        wapp.sendMessage(new Message('Hola',me),me);
        wapp.sendMessage(new Message('Tienes un peine?',fabi),fabi);
    }
    
    if(imgContact.src == chat3.chatAvatar){
        wapp.selectedChat = chat3;

        wapp.sendMessage(new Message('Holiiii Mari',clau),clau);
    }
    


    
    
    
}