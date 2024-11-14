const USERS = {
    "PD87654321": {
        "login": "PD87654321",
        "firstName": "Kendrick",
        "lastName": "Lan",
        "mail": "kendrick.lan@delegaciadigital.pol",
        "created_at": "2023/10/21 09:05:00",
        "otpCode": "654821"
    },
    "PD11223344": {
        "login": "PD11223344",
        "firstName": "Mariana",
        "lastName": "Costa",
        "mail": "mariana.costa@delegaciadigital.pol",
        "created_at": "2023/10/21 09:10:00",
        "otpCode": "112233"
    },
    "CORPO5678901": {
        "login": "CORPO5678901",
        "firstName": "João",
        "lastName": "Pereira",
        "mail": "joao.pereira@delegaciadigital.pol",
        "created_at": "2023/10/21 09:15:00",
        "otpCode": "445566"
    },
    "CORPO0987654": {
        "login": "CORPO0987654",
        "firstName": "Luiza",
        "lastName": "Fernandes",
        "mail": "luiza.fernandes@delegaciadigital.pol",
        "created_at": "2023/10/21 09:20:00",
        "otpCode": "778899"
    },
}

const CASES = {
    "OA2025": {
        "id": "OA2025",
        "title": "Operação Automata",
        "leader": "Carlos Santos",
    },
    "SAZ2025": {
        "id": "SAZ2025",
        "title": "Sequestro de A.Z.",
        "leader": "Mariana Costa",
    }
}

const EVIDENCES = {
    "OA2025EV00001": {
        "id":       "OA2025EV00001",
        "title":    "Relatório Financeiro Confidencial - Parte 1",
        "details":  "Documento vazado contendo análises das contas offshore e movimentações suspeitas.",
        
        "caseId":     "OA2025",
        "caseTitle":  "Operação Automata",
        "caseLeader": "Carlos Santos",

        "createdAt": "2025/03/15 10:00:00",
        "createdBy": "Kendrick Lan (kedrick.lan@delegaciadigital.pol)",

        "files": [
            "Relatorio_Confidencial_Parte1.pdf",
        ]
    },

    "OA2025EV00002": {
        "id":       "OA2025EV00002",
        "title":    "Relatório Financeiro Confidencial - Parte 2",
        "details":  "Documento vazado contendo expansões das operações financeiras e novas conexões políticas.",
        
        "caseId":     "OA2025",
        "caseTitle":  "Operação Automata",
        "caseLeader": "Carlos Santos",

        "createdAt": "2025/05/10 14:30:00",
        "createdBy": "Kendrick Lan (kendrick.lan@delegaciadigital.pol)",

        "files": [
            "Relatorio_Confidencial_Parte2.pdf",
        ]
    },

    "SAZ2025EV00001": {
        "id":       "SAZ2025EV00001",
        "title":    "Carta de A.Z.",
        "details":  "Carta poética relatando o sequestro de A.Z. e solicitando ajuda.",
        
        "caseId":     "SAZ2025",
        "caseTitle":  "Sequestro de A.Z.",
        "caseLeader": "Mariana Costa",

        "createdAt": "2025/09/05 18:00:00",
        "createdBy": "Kendrick Lan (kendrick.lan@delegaciadigital.pol)",

        "files": [
            "Carta_AZ.pdf",
        ]
    },

    "OA2025EV00003": {
        "id":       "OA2025EV00003",
        "title":    "Código Malware ShadowNet",
        "details":  "Código fonte do malware utilizado para espionagem tecnológica.",
        
        "caseId":     "OA2025",
        "caseTitle":  "Operação Automata",
        "caseLeader": "Carlos Santos",

        "createdAt": "2025/05/15 16:45:00",
        "createdBy": "Kendrick Lan (kendrick.lan@delegaciadigital.pol)",

        "files": [
            "ShadowNet.py",
        ]
    },

    "OA2025EV00004": {
        "id":       "OA2025EV00004",
        "title":    "Logs de Comunicação Interceptados",
        "details":  "Logs de comunicação criptografados enviados pelo malware ShadowNet.",
        
        "caseId":     "OA2025",
        "caseTitle":  "Operação Automata",
        "caseLeader": "Carlos Santos",

        "createdAt": "2025/05/20 20:15:00",
        "createdBy": "Kendrick Lan (kendrick.lan@delegaciadigital.pol)",

        "files": [
            "Logs_Comunicacao.txt",
        ]
    },
}

module.exports = {
    USERS,
    CASES,
    EVIDENCES
}
