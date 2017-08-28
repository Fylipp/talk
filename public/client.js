window.onload = function () {
    var log = document.getElementById('log');
    var input = document.getElementById('input');
    var statusTargets = document.getElementsByClassName('status-target');
    var self = document.getElementById('self');
    var selfDisplay = document.getElementById('self-display');

    var selfName = undefined;

    var heart;

    function setStatus(status) {
        for (var i = 0; i < statusTargets.length; i++) {
            statusTargets[i].setAttribute('data-status', status);
        }
    }

    function setName(n) {
        selfName = n;
        self.innerText = n;
        selfDisplay.classList.remove('hide');
    }

    setStatus('connecting');

    input.disabled = true;

    var ws = new WebSocket(location.origin.replace(/^http/, 'ws'));

    ws.onopen = function (event) {
        input.disabled = false;
        setStatus('connected');

        heart = setInterval(function () {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ heartbeat: 1 }));
            }
        }, 5000);
    };

    ws.onclose = function (event) {
        input.disabled = true;
        setStatus('disconnected');

        clearInterval(heart);
    };

    ws.onmessage = function (event) {
        try {
            var json = JSON.parse(event.data);

            if (json.assignedName !== undefined) {
                setName(json.assignedName);
            } else {
                var author = json.author;
                var message = json.message;

                if (author && message) {
                    display(author, message);
                }
            }
        } catch (e) {
            console.log('Error processing message: ', e);
        }
    };

    input.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();

            event.target.disabled = true;

            try {
                send(event.target.value);
            } catch (e) {
                console.log(e);
                alert('Error, see console (F12)');
            }

            event.target.disabled = false;

            event.target.value = "";

            event.target.focus();
        }
    });

    function display(author, message) {
        var msg = document.createElement('li');

        var msgAuthor = document.createElement('span');
        msgAuthor.classList.add('msg-author');
        msgAuthor.textContent = author;

        if (author === selfName) {
            msgAuthor.classList.add('self');
        }

        msg.appendChild(msgAuthor);
        msg.appendChild(document.createTextNode(message));

        log.appendChild(msg);
    }

    function send(message) {
        ws.send(JSON.stringify({ message: message }));
    }
};
