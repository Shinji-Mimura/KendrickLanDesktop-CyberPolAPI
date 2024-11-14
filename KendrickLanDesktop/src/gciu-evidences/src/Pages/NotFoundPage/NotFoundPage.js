import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.dragElement(document.getElementById("page-notfound"));
}, [])

function handleWindowClose() {
  if (window.confirm("Deseja fechar o programa?")) {
      navigate('/')
  }
}

  return (
    <div id="page-notfound" class="window">
        <div id="page-notfound-title-bar" class="title-bar">
            <div class="title-bar-text">Erro 404 - Página Não Encontrada</div>
            <div class="title-bar-controls">
              <button aria-label="Fechar" id="close-btn" onClick={handleWindowClose}></button>
            </div>
        </div>
        <div class="window-body">
            <div class="error-icon">
                <img src="/error.png" alt="Erro 404"/>
            </div>
            <div>
                <h2>Oops! Algo deu errado...</h2>
                <p>A página que você está procurando não foi encontrada!</p>
                <p>Você pode ter digitado o endereço errado <br/>ou a página pode ter sido removida.</p>
            </div>
        </div>
    </div>
  );
}

export default NotFoundPage;
