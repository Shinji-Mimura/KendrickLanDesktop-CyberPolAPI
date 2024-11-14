-- Removendo o Database caso o mesmo já exista
DROP DATABASE IF EXISTS evidences_archive_db;

-- Criando a Base de Dados
CREATE DATABASE evidences_archive_db;

USE evidences_archive_db;

-- Criando as Tabelas
CREATE TABLE users_tb (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(32) UNIQUE,
    otp_code VARCHAR(32),
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    mail VARCHAR(64),
    created_at VARCHAR(64)
);

CREATE TABLE cases_tb (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    case_cid VARCHAR(64) UNIQUE,
    case_title VARCHAR(128),
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users_tb(id)
);

CREATE TABLE evidences_tb (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    evidence_cid VARCHAR(32) UNIQUE,
    title VARCHAR(128),
    details TEXT,
    created_at VARCHAR(64),
    user_id INT UNSIGNED,
    case_id INT UNSIGNED,
    files TEXT,
    FOREIGN KEY (user_id) REFERENCES users_tb(id),
    FOREIGN KEY (case_id) REFERENCES cases_tb(id)
);

CREATE TABLE flag_tb (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    flag VARCHAR(512)
);

-- Inserindo dados de usuários
INSERT INTO users_tb (login, otp_code, first_name, last_name, mail, created_at) VALUES
("KDL0001", "112233", "Kendrick", "Lan", "kendrick.lan@delegaciadigital.pol", "2023/10/21 09:00:00"),
("CSA0002", "445566", "Carlos", "Santos", "carlos.santos@delegaciadigital.pol", "2023/10/21 09:05:00"),
("MCO0003", "778899", "Mariana", "Costa", "mariana.costa@delegaciadigital.pol", "2023/10/21 09:10:00"),
("JPP0004", "112244", "João", "Pereira", "joao.pereira@rede.corrupta", "2023/10/21 09:15:00"),
("LFN0005", "556677", "Luiza", "Fernandes", "luiza.fernandes@rede.corrupta", "2023/10/21 09:20:00"),
("RAF0006", "889900", "Ricardo", "Almeida", "ricardo.almeida@rede.corrupta", "2023/10/21 09:25:00"),
("HFR0007", "334455", "Helena", "Ramos", "helena.ramos@rede.corrupta", "2023/10/21 09:30:00"),
("EOI0008", "667788", "Eduardo", "Oliveira", "eduardo.oliveira@rede.corrupta", "2023/10/21 09:35:00"),
("BIS0009", "990011", "Bianca", "Silva", "bianca.silva@rede.corrupta", "2023/10/21 09:40:00"),
("EGO0010", "223344", "Eduardo", "Gomes", "eduardo.gomes@rede.corrupta", "2023/10/21 09:45:00"),
("JAS0011", "556677", "Joana", "Sousa", "joana.sousa@delegaciadigital.pol", "2023/10/21 09:50:00"),
("MMM0012", "889900", "Marcelo", "Mendes", "marcelo.mendes@delegaciadigital.pol", "2023/10/21 09:55:00"),
("LPR0013", "112244", "Laura", "Pereira", "laura.pereira@delegaciadigital.pol", "2023/10/21 10:00:00"),
("DCC0014", "334455", "Daniel", "Costa", "daniel.costa@delegaciadigital.pol", "2023/10/21 10:05:00"),
("SGZ0015", "667788", "Sofia", "Gonzalez", "sofia.gonzalez@delegaciadigital.pol", "2023/10/21 10:10:00"),
("MTP0016", "990011", "Matthew", "Pereira", "matthew.pereira@delegaciadigital.pol", "2023/10/21 10:15:00"),
("IAL0017", "223344", "Isabella", "Alves", "isabella.alves@delegaciadigital.pol", "2023/10/21 10:20:00"),
("HST0018", "556677", "Henry", "Santos", "henry.santos@delegaciadigital.pol", "2023/10/21 10:25:00"),
("AHL0019", "889900", "Ana", "Hernandez", "ana.hernandez@delegaciadigital.pol", "2023/10/21 10:30:00"),
("GSS0020", "112244", "Gabriel", "Silva", "gabriel.silva@delegaciadigital.pol", "2023/10/21 10:35:00");

-- Inserindo dados de casos
INSERT INTO cases_tb (case_cid, case_title, user_id) VALUES
("OA2025", "Operação Automata", 1),
("SAZ2025", "Sequestro de A.Z.", 2),
("OC2025", "Operação Cayman Secrets", 1),
("MT2025", "Operação Money Trail", 3),
("SC2025", "Operação Shell Company", 3),
("ON2025", "Operação Offshore Network", 2),
("MS2025", "Operação Money Sweep", 4),
("BG2025", "Operação Black Gate", 5),
("WH2025", "Operação White Hat", 6),
("DF2025", "Operação Digital Fortress", 7),
("CH2025", "Operação Cyber Hunt", 8),
("GP2025", "Operação Ghost Protocol", 9),
("IC2025", "Operação Iron Curtain", 10),
("DN2025", "Operação Dark Net", 11),
("EL2025", "Operação Eagle Eye", 12),
("CS2025", "Operação Cyber Storm", 13),
("BL2025", "Operação Blue Light", 14),
("RD2025", "Operação Red Dawn", 15),
("BS2025", "Operação Black Swan", 16),
("SE2025", "Operação Silent Echo", 17);

-- Inserindo dados de evidências
INSERT INTO evidences_tb (evidence_cid, title, details, created_at, user_id, case_id, files) VALUES
("OA2025EV0001", "Relatório Financeiro Confidencial - Parte 1", "Documento vazado contendo análises das contas offshore e movimentações suspeitas.", "2025/03/15 10:00:00", 1, 1, "Relatorio_Confidencial_Parte1.pdf"),
("OA2025EV0002", "Relatório Financeiro Confidencial - Parte 2", "Documento vazado contendo expansões das operações financeiras e novas conexões políticas.", "2025/05/10 14:30:00", 1, 1, "Relatorio_Confidencial_Parte2.pdf"),
("SAZ2025EV0001", "Carta de A.Z.", "Carta poética relatando o sequestro de A.Z. e solicitando ajuda.", "2025/09/05 18:00:00", 2, 2, "Carta_AZ.pdf"),
("OA2025EV0003", "Código Malware ShadowNet", "Código fonte do malware utilizado para espionagem tecnológica.", "2025/05/15 16:45:00", 2, 1, "ShadowNet.py"),
("OA2025EV0004", "Logs de Comunicação Interceptados", "Logs de comunicação criptografados enviados pelo malware ShadowNet.", "2025/05/20 20:15:00", 3, 1, "Logs_Comunicacao.txt"),
("OC2025EV0001", "Conta Offshore UVW345", "Detalhes das contas offshore usadas para lavagem de dinheiro.", "2025/04/10 09:30:00", 4, 3, "Conta_UVW345.pdf"),
("OC2025EV0002", "Transações Suspeitas Cayman", "Registro de transações financeiras suspeitas realizadas nas Ilhas Cayman.", "2025/04/15 11:45:00", 5, 3, "Transacoes_Cayman.xlsx"),
("MT2025EV0001", "Rastreamento de Fundos", "Mapeamento do fluxo de fundos entre contas suspeitas.", "2025/05/05 13:20:00", 6, 4, "Fundos_Rastreamento.pdf"),
("SC2025EV0001", "Documentos de Shell Companies", "Documentos legais de empresas fantasma usadas para ocultar ativos.", "2025/05/10 14:00:00", 7, 5, "Shell_Companies_Documents.pdf"),
("ON2025EV0001", "Rede Offshore Network", "Diagramas e descrições das redes offshore utilizadas pela organização criminosa.", "2025/06/01 15:30:00", 8, 6, "Rede_Offshore_Network.pdf"),
("MS2025EV0001", "Varredura de Dinheiro", "Relatório sobre as técnicas de varredura de dinheiro empregadas.", "2025/06/10 16:45:00", 9, 7, "Money_Sweep_Report.pdf"),
("BG2025EV0001", "Porta de Entrada Black Gate", "Informações sobre a porta de entrada utilizada para acessar redes protegidas.", "2025/07/01 18:00:00", 10, 8, "Black_Gate_Entry.pdf"),
("WH2025EV0001", "Ferramentas White Hat", "Lista de ferramentas usadas por hackers white hat para combater ameaças.", "2025/07/15 19:30:00", 11, 9, "White_Hat_Tools.pdf"),
("DF2025EV0001", "Fortaleza Digital Segurança", "Relatório de segurança detalhado da fortaleza digital.", "2025/08/01 20:45:00", 12, 10, "Digital_Fortress_Security.pdf"),
("CH2025EV0001", "Kit de Exploração Cyber Hunt", "Kit de exploração utilizado na operação Cyber Hunt.", "2025/08/10 21:55:00", 13, 11, "Cyber_Hunt_Exploit_Kit.zip"),
("GP2025EV0001", "Protocolo Fantasma Relatório", "Documentos detalhando as atividades do protocolo fantasma.", "2025/08/20 23:15:00", 14, 12, "Ghost_Protocol_Report.pdf"),
("IC2025EV0001", "Chaves de Criptografia Iron Curtain", "Chaves de criptografia recuperadas durante a operação Iron Curtain.", "2025/09/01 09:25:00", 15, 13, "Iron_Curtain_Keys.pem"),
("DN2025EV0001", "Análise de Tráfego Dark Net", "Análise detalhada do tráfego na Dark Net relacionado ao caso.", "2025/09/10 10:35:00", 16, 14, "Dark_Net_Traffic_Analysis.pcap"),
("EL2025EV0001", "Filmagens Drone Eagle Eye", "Filmagens capturadas por drones durante a vigilância Eagle Eye.", "2025/09/20 11:45:00", 17, 15, "Eagle_Eye_Drone_Footage.mp4"),
("CS2025EV0001", "Emails de Phishing Cyber Storm", "Emails de phishing identificados durante a operação Cyber Storm.", "2025/10/01 12:55:00", 18, 16, "Cyber_Storm_Phishing.eml"),
("BL2025EV0001", "Servidores C2 Blue Light", "Servidores de comando e controle identificados durante a operação Blue Light.", "2025/10/10 14:05:00", 19, 17, "Blue_Light_C2_Servers.log"),
("RD2025EV0001", "Transações Financeiras Red Dawn", "Transações financeiras relacionadas à operação Red Dawn.", "2025/10/20 15:15:00", 20, 18, "Red_Dawn_Financial_Transactions.csv"),
("BS2025EV0001", "Atividades Botnet Black Swan", "Atividades da botnet monitoradas durante a operação Black Swan.", "2025/11/01 16:25:00", 1, 19, "Black_Swan_Botnet_Activities.pcap"),
("SE2025EV0001", "Dados de Vigilância Silent Echo", "Dados coletados durante a operação Silent Echo.", "2025/11/10 17:35:00", 2, 20, "Silent_Echo_Surveillance_Data.json"),
("OA2025EV0005", "Clientes Offshore XPTO", "Lista de clientes offshore associados à rede corrupta.", "2025/03/25 10:15:00", 3, 1, "Clientes_Offshore_XPTO.csv"),
("OA2025EV0006", "Transações Suspeitas Panama", "Detalhes das transações financeiras suspeitas relacionadas ao Panamá.", "2025/04/05 11:25:00", 4, 1, "Transacoes_Panama.xlsx"),
("OA2025EV0007", "Contratos Shell Alpha", "Contratos de shell companies Alpha utilizadas para ocultação de ativos.", "2025/04/15 12:35:00", 5, 5, "Shell_Alpha_Contracts.pdf"),
("OA2025EV0008", "Email Comunicação Ricardo Almeida", "Comunicações internas de Ricardo Almeida sobre movimentações ilícitas.", "2025/05/05 13:45:00", 6, 1, "Ricardo_Almeida_Emails.eml"),
("OA2025EV0009", "Relatórios Helena Ramos", "Relatórios de Helena Ramos sobre investimentos suspeitos.", "2025/05/15 14:55:00", 7, 1, "Helena_Ramos_Reports.pdf"),
("OA2025EV0010", "Backdoor Access Eduardo Oliveira", "Registros de acesso backdoor de Eduardo Oliveira aos sistemas da delegacia.", "2025/06/01 16:05:00", 8, 1, "Eduardo_Oliveira_Backdoor.log"),
("OA2025EV0011", "Atividades Bianca Silva", "Relatórios das atividades de Bianca Silva dentro da rede corrupta.", "2025/06/10 17:15:00", 9, 1, "Bianca_Silva_Activities.pdf"),
("OA2025EV0012", "Documentos Eduardo Gomes", "Documentos financeiros de Eduardo Gomes vinculados à lavagem de dinheiro.", "2025/06/20 18:25:00", 10, 1, "Eduardo_Gomes_Financial_Documents.pdf");

-- Inserindo a flag final
INSERT INTO flag_tb (flag) VALUES ('TAC{DataInside:541b7135666e28b2773121860dc698b7d0aa139eb11cf29cda1a6fe83e9f079e}');

-- Criando novo usuário com permissões restritas
--CREATE USER 'gciu_user'@'localhost' IDENTIFIED BY 'crimpackbolacubanookneat';
--GRANT ALL PRIVILEGES ON evidences_archive_db.* TO 'gciu_user'@'localhost';
--FLUSH PRIVILEGES;

-- Grant necessary permissions to the existing 'mysql' user
GRANT ALL PRIVILEGES ON evidences_archive_db.* TO 'mysql'@'%';
GRANT ALL PRIVILEGES ON evidences_archive_db.* TO 'mysql'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;