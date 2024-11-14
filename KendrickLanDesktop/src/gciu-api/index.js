const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

const { USERS, EVIDENCES } = require('./mockdata/data');

const app = express();
const port = 8080;
const jwt_secret = "peldR3qIx8x363GB0orvX/VQA9cKPy25sRn/ifY5UkA1PR1M4EcfsaWzhdqv9jYWxNMYCCuFfswxGC1Pz9fy2B3Cb6G7NuM1deyknFRAyp99Jw3vZGRGU9w5ut16ZhHMZcP6RkaK4YyHNtqgZLun8OAUPZdvzgTHbmBvdcb7JKBD48YAAt3LDUYA3qAJUnhIHS+T37c7KS4DnKrcqUKRXk2J+lpXzhBM9x3pxMM3QVSoT7IhybSmh2PV58l+ZzBq3uzfYZv6O4E4XRvNbO2j7AoW/S92PU8gCfMyTRQqef0MvsHjiME6+b++YYPeKZmkhFiREHeWZ0KzP4/ADy3BDw==";

const pool = mysql.createPool({
    host     : process.env.MYSQL_HOST || '127.0.0.1',
    port     : process.env.MYSQL_PORT || '3306',
    user     : process.env.MYSQL_USER || 'mysql',
    password : process.env.MYSQL_PASSWORD || 'mysql',
    database : process.env.MYSQL_DATABASE || 'evidences_archive_db',
    connectionLimit: 10
});

// Congratz, here is the flag!
// TAC{NoComments:39e31bc69e1f95fdfa0ebbc56e369a8ffa520fc661b39ef998599069f339852a}

// Best practices
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/', express.static('react-build'));
app.use('/uploads/evidences/', express.static('evidences'));

// Enable Cors
app.use(cors({
    origin: "*",
    exposedHeaders: ['Content-Type', 'Authorization']
}));

// Authorization Middlewares
const authorizationMiddleware = (req, res, next) => {
    const authtokenHeader = (req.headers["authorization"]) ? req.headers["authorization"] : '';

    try {
        let authToken = jwt.verify(authtokenHeader, jwt_secret);

        if(authToken) {
            req.authToken = authToken;
            return next();
        }
        return res.status(403).json({"error": "Acesso não autorizado!"});
    } catch(err) {
        return res.status(403).json({"error": "Acesso não autorizado!"});
    }
}

// API Endpoints
app.get('/api/health', (req, res) => {
    res.json({ "status": "ok" });
});

app.post('/api/auth/login', (req, res) => {
    try {
        let login = (req.body.login && typeof req.body.login === 'string') ? req.body.login : null;

        if(!login)
            return res.status(400).json({"error": "Campo login é obrigatório!"});
        
        const authtoken = jwt.sign({ 
                "login": login, 
                "token_type": "preauthorization",
                "flag": "TAC{JaSON:b053e86ed56c00ff78bab833b0211f22a1d5b21291da6d3f48381ecaa1ccb537}"
            }, 
            jwt_secret, 
            { algorithm: 'HS256', expiresIn: '1h' }
        );

        return res.json({
            "authorization": authtoken,
            'expiresIn': '1h',
            "token_type": "preauthorization"
        });
    } catch(err) {
        return res.status(400).json({"error": err});
    }
});

app.post('/api/auth/otp', authorizationMiddleware, (req, res) => {
    try {
        let login = (req.authToken.login && typeof req.authToken.login === 'string') ? req.authToken.login : null;
        let otp_code = (req.body.otp_code && typeof req.body.otp_code === 'string') ? req.body.otp_code : null;

        if(!otp_code)
            return res.status(400).json({"error": "Campo otp_code é obrigatório!"});

        pool.query({
            sql: 'SELECT * FROM `users_tb` WHERE `login` = ? AND otp_code = ? LIMIT 1',
            timeout: 3000,
            values: [login, otp_code]
            }, function (error, results, fields) {
                if(error)
                    return res.status(400).json({"error": error});
                
                if(results.length === 0)
                    return res.status(400).json({"error": "login ou otp_code inválidos!"});
                
                const authtoken = jwt.sign({ 
                        "login": results[0].login,
                        "first_name": results[0].first_name,
                        "last_name": results[0].last_name, 
                        "mail": results[0].mail,  
                        "token_type": "authorization"
                    }, 
                    jwt_secret, 
                    { algorithm: 'HS256', expiresIn: '1h' }
                );

                return res.json({
                    "login": login,
                    "authorization": authtoken,
                    'expiresIn': '1h',
                    "token_type": "authorization"
                });
            }
        );
    } catch(err) {
        return res.status(400).json({"error": err});
    }
});

app.get('/api/users/list', authorizationMiddleware, (req, res) => {
    try {
        let login = (req.query.login && typeof req.query.login === 'string') ? req.query.login : null;

        pool.query({
            sql: 'SELECT * FROM `users_tb`',
            timeout: 3000,
            values: []
            }, function (error, results, fields) {
                if(error)
                    return res.status(400).json({"error": JSON.stringify(error)});
                
                if(login)
                    return res.json({'users': Object.values(results).filter(v => v.login && v.login.startsWith(login) ) });
        
                return res.json({'users': Object.values(results), 'flag': 'TAC{LittleDetail:56765c6961530b48b2b75fc9b67e44eb58dc1ed2f7f16b8d5a0ecb87e763206b}' });
            }
        );    
    } catch(err) {
        return res.status(400).json({"error": JSON.stringify(err)});
    }
});

app.get('/api/evidences/list', authorizationMiddleware, (req, res) => {
    try {
        let search = (req.query.search && typeof req.query.search === 'string') ? req.query.search : null;

        if(req.authToken["token_type"] !== "authorization")
            return res.status(403).json({"error": "Acesso não autorizado!"});

        pool.query({
            sql: 'SELECT e.evidence_cid, e.title, e.details, e.created_at, e.files, c.case_cid, c.case_title, CONCAT(u1.first_name, " ", u1.last_name) as created_by, CONCAT(u2.first_name, " ", u2.last_name, " (", u2.mail, ")") as case_leader FROM `evidences_tb` e LEFT JOIN `cases_tb` c ON e.case_id = c.id LEFT JOIN `users_tb` u1 ON e.user_id = u1.id LEFT JOIN `users_tb` u2 ON c.user_id = u2.id ' + ((search) ? ' WHERE e.title LIKE "%'+ search + '%"' : ''),
            timeout: 3000,
            values: []
            }, function (error, results, fields) {
                if(error)
                    return res.status(400).json({"error": JSON.stringify(error)});
                
                return res.json({'evidences': Object.values(results) });
            }
        );  
    } catch(err) {
        return res.status(400).json({"error": JSON.stringify(err)});
    }
});

app.post('/api/evidences/download', authorizationMiddleware, (req, res) => {
    try {
        let files = (req.body.files && typeof req.body.files === 'string') ? req.body.files : null;
        
        if(!files)
            return res.status(400).json({"error": "Campo files é obrigatório!"});

        files = files.split(',').map((f) => path.join(__dirname,`/evidences/${f.trim()}`));

        if(req.authToken["token_type"] !== "authorization")
            return res.status(403).json({"error": "Acesso não autorizado!"});

        const zipFileName = `files-${uuidv4()}.zip`;
        const zipPath = path.join(__dirname, `/zips/${zipFileName}`);
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        output.on('close', () => {
            const zipBuffer = fs.readFileSync(zipPath);
            const base64Zip = zipBuffer.toString('base64');
            const downloadURI = `data:application/zip;base64,${base64Zip}`;
            fs.unlinkSync(zipPath);
            return res.json({ downloadURI: downloadURI });
        });

        archive.on('error', (err) => {
            return res.status(500).json({"error": JSON.stringify(err)});
        });

        archive.pipe(output);

        files.forEach((file) => {
            const filePath = path.resolve(file);
            if (fs.existsSync(filePath)) {
                archive.file(filePath, { name: path.basename(filePath) });
            }
        });

        archive.finalize();
    } catch(err) {
        return res.status(400).json({"error": JSON.stringify(err)});
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/react-build/index.html'));
});

// Enable Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Graceful shutdown for connection pool
process.on('SIGINT', () => {
    pool.end(err => {
        if (err) console.error('Error closing MySQL pool:', err);
        else console.log('MySQL pool closed');
        process.exit(0);
    });
});
