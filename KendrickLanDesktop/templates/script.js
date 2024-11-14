document.getElementById('search-btn').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery) {
        fetchResults(searchQuery);
    }
});

function fetchResults(query) {
    // Simulação de resultados de busca
    const results = [
        { arquivo: 'evidencia1.pdf', descricao: 'Evidência 1 Descrição' },
        { arquivo: 'evidencia2.pdf', descricao: 'Evidência 2 Descrição' },
        { arquivo: 'evidencia3.pdf', descricao: 'Evidência 3 Descrição' }
    ];
    
    displayResults(results);
}

function displayResults(results) {
    const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
    resultsTable.innerHTML = '';

    results.forEach(result => {
        const row = resultsTable.insertRow();
        const cellArquivo = row.insertCell(0);
        const cellDescricao = row.insertCell(1);
        const cellAcao = row.insertCell(2);

        cellArquivo.textContent = result.arquivo;
        cellDescricao.textContent = result.descricao;
        cellAcao.innerHTML = `
            <div class="action-buttons">
                <a href="#" class="visit" onclick="visitFile('${result.arquivo}')"></a>
                <a href="#" class="remove" onclick="removeFile(this)"></a>
            </div>
        `;
    });
}

function visitFile(fileName) {
    alert('Visitando ' + fileName);
}

function removeFile(element) {
    const row = element.closest('tr');
    row.parentNode.removeChild(row);
}

// Função para permitir que a janela seja reposicionada pelo usuário
dragElement(document.getElementById("window"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "title-bar")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "title-bar").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === "admin" && password === "password") {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; // Redireciona para a página principal
    } else {
        alert('Usuário ou senha incorretos.');
    }
});