import { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import './EvidencesPage.css';
import api from '../../Services/api'

function EvidencesPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  function searchHandler(){
    console.log(`Carregando evidências...`)

    let authToken = localStorage.getItem('token');

    api.get(`/api/evidences/list`, {headers:{Authorization: authToken}, params:{ search:input} })
      .then(res => {
        // Salva o token e redireciona para o próximo step
        setEvidences(res.data.evidences)
        setErrorMessage('')
      })
      .catch(err =>{
        if(err.response.data){
          console.error(err.response.data.error)
          setErrorMessage(err.response.data.error)
        } else {
          console.error(err.message)
          setErrorMessage('Não foi possível se comunicar com a API!')
        }
      })
  }

  function downloadZip(files){
    console.log(`Baixando .zip das evidências...`)
    console.log(`Files: ${files}`)

    let authToken = localStorage.getItem('token');

    api.post(`/api/evidences/download`, {files: files},{headers:{Authorization: authToken}})
      .then(res => {
        // Salva o token e redireciona para o próximo step
        window.open(res.data.downloadURI,'evidences.zip', '_blank')
        setErrorMessage('')
      })
      .catch(err =>{
        if(err.response.data){
          console.error(err.response.data.error)
          setErrorMessage(err.response.data.error)
        } else {
          console.error(err.message)
          setErrorMessage('Não foi possível se comunicar com a API!')
        }
      })

  }

  useEffect(() => {
    searchHandler()
    window.dragElement(document.getElementById("page-evidences"));
    window.dragElement(document.getElementById("page-evidence-details"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleWindowClose() {
    if (window.confirm("Deseja voltar ao Menu?")) {
        navigate('/menu')
    }
  }

  return (
    <div className="App">
      <div id="page-evidences" class="window" >
        <div id="page-evidences-title-bar" class="title-bar" >
            <div class="title-bar-text">Buscador de Arquivos</div>
            <div class="title-bar-controls">
                <button aria-label="Minimizar" id="minimize-btn"></button>
                <button aria-label="Maximizar" id="maximize-btn"></button>
                <button aria-label="Fechar" id="close-btn" onClick={handleWindowClose}></button>
            </div>
        </div>
        <div class="window-body">
            <div class="search-bar">
                <label for="search">Pesquisar:</label>
                <input type="text" id="search" name="search" value={input} onInput={e => setInput(e.target.value)}/>
                &nbsp;
                <button id="search-btn" onClick={searchHandler}>Buscar</button>
                <small class="error-message">{errorMessage}</small>
            </div>
            <div class="results">
                <table id="results-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Evidência</th>
                            <th>Arquivos</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                      {evidences.map(e => (
                        <tr>
                          <td>{e.evidence_cid}</td>
                          <td>{e.title}</td>
                          <td>{e.files && e.files.split(',').map(f => ( 
                            <p class="evidence-link"><a href={`/uploads/evidences/${f}`} rel="noreferrer" target='_blank'>{f}</a></p> 
                            ))}</td>
                          <td>{e.created_at}<br/><small>Registered by {e.created_by}</small></td>
                          <td>
                            <button class="link-btn" onClick={() => setSelectedEvidence(e)}>Detalhes</button>
                            &nbsp;
                            <button class="link-btn" onClick={() => downloadZip(e.files)}>Zip</button>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <div id="page-evidence-details" class="window" style={{visibility: (selectedEvidence) ? 'visible' : 'hidden'}}>
      <div id="page-evidence-details-title-bar" class="title-bar" >
        <div class="title-bar-text">Buscador de Arquivos - {selectedEvidence && selectedEvidence.id}</div>
        <div class="title-bar-controls">
            <button aria-label="Minimizar" id="minimize-btn"></button>
            <button aria-label="Maximizar" id="maximize-btn"></button>
            <button aria-label="Fechar" id="close-btn" onClick={() => setSelectedEvidence(null)}></button>
        </div>
      </div>
      <div class="window-body">
        <h3>{selectedEvidence && selectedEvidence.title}</h3>
        <p>{selectedEvidence && selectedEvidence.details}</p>
        <p><strong>ID Evidência:</strong> {selectedEvidence && `${selectedEvidence.case_cid}${selectedEvidence.evidence_cid}`}</p>
        <p><strong>Nome do Caso:</strong> {selectedEvidence && selectedEvidence.case_title}</p>
        <p><strong>Responsável:</strong> {selectedEvidence && selectedEvidence.case_leader}</p>
        <p><strong>Data Inclusão:</strong> {selectedEvidence && selectedEvidence.created_at}</p>
        <p><strong>Arquivos:</strong></p>
        <ul>
          {selectedEvidence && selectedEvidence.files && selectedEvidence.files.split(',').map(f => ( 
            <li><a href={`/uploads/evidencias/${selectedEvidence.caseId}/${f}`} rel="noreferrer" target='_blank'>{f}</a></li> 
            ))}
        </ul>
      </div>
    </div>

    </div>
  );
}

export default EvidencesPage;
