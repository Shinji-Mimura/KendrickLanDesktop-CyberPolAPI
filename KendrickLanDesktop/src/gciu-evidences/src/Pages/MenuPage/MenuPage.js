import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();

  useEffect(() => {
      window.dragElement(document.getElementById("page-menu"));
  }, [])

  function handleWindowClose() {
    if (window.confirm("Deseja fechar o programa?")) {
        navigate('/')
    }
  }

  return (
    <div id="page-menu" class="window" >
        <div id="page-menu-title-bar" class="title-bar" >
            <div class="title-bar-text">Buscador de Arquivos - Menu</div>
            <div class="title-bar-controls">
                <button aria-label="Fechar" id="close-btn" onClick={handleWindowClose}></button>
            </div>
        </div>
        <div class="window-body">
            <div class="Menu">
                <table id="results-table">
                    <tbody>
                        <tr>
                            <td width='50%'><button class="menu-button" onClick={() => navigate('/evidences')}>
                                <img src="search.png" alt="Pesquisar Evidências"/>
                                Pesquisar Evidências
                            </button></td>
                            <td width='50%'><button class="menu-button" onClick={() => navigate('/profile')}>
                                <img src="user.png" alt="Perfil do Usuário"/>
                                Perfil do Usuário
                            </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default MenuPage;
