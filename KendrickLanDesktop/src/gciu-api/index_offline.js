const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const path = require('path')

const { USERS, EVIDENCES, CASES } = require('./mockdata/data')


const app = express()
const port = 8080
const jwt_secret = "peldR3qIx8x363GB0orvX/VQA9cKPy25sRn/ifY5UkA1PR1M4EcfsaWzhdqv9jYWxNMYCCuFfswxGC1Pz9fy2B3Cb6G7NuM1deyknFRAyp99Jw3vZGRGU9w5ut16ZhHMZcP6RkaK4YyHNtqgZLun8OAUPZdvzgTHbmBvdcb7JKBD48YAAt3LDUYA3qAJUnhIHS+T37c7KS4DnKrcqUKRXk2J+lpXzhBM9x3pxMM3QVSoT7IhybSmh2PV58l+ZzBq3uzfYZv6O4E4XRvNbO2j7AoW/S92PU8gCfMyTRQqef0MvsHjiME6+b++YYPeKZmkhFiREHeWZ0KzP4/ADy3BDw==";

// Best practices
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded())

// Static Files
app.use('/', express.static('react-build'))

// Enable Cors
app.use(cors({
    origin: "*",
    exposedHeaders: ['Content-Type', 'Authorization']
}))

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
    res.json({ "status": "ok" })
})

app.post('/api/auth/login', (req, res) => {
    try {
        // Lendo e validando variáveis
        let login = (req.body.login && typeof req.body.login === 'string') ? req.body.login : null;

        if(!login)
            return res.status(400).json({"error": "Campo login é obrigatório!"});
        
        // Gerando pre_auth token
        const authtoken = jwt.sign({ 
                "login": login, 
                "token_type": "preauthorization"
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
})

app.post('/api/auth/otp', authorizationMiddleware, (req, res) => {
    try {
        // Lendo e validando variáveis
        let login = (req.authToken.login) ? req.authToken.login : null   
        let otpCode = (req.body.otpCode && typeof req.body.otpCode === 'string') ? req.body.otpCode : null;

        if(!otpCode)
            return res.status(400).json({"error": "Campo otpCode é obrigatório!"});

        // Validando usuário e otp
        if(USERS[login] === undefined || USERS[login].otpCode !== otpCode)
            return res.status(400).json({"error": "Usuário ou otpCode inválido!"});

        // Gerando auth token
        const authtoken = jwt.sign({ 
                "login": USERS[login].login,
                "firstName": USERS[login].firstName,
                "lastName": USERS[login].lastName, 
                "mail": USERS[login].mail,  
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
    } catch(err) {
        return res.status(400).json({"error": err});
    }
})


app.get('/api/users/list', authorizationMiddleware, (req, res) => {
    // Lendo e validando variáveis
    let login = (req.query.login && typeof req.query.login === 'string') ? req.query.login : null;

    if(login)
        return res.json({'users': Object.values(USERS).filter(v => v.login.startsWith(login) ) })

    return res.json({'users': Object.values(USERS) })
})


app.get('/api/evidences/list', authorizationMiddleware, (req, res) => {
    // Verificando tipo do token
    if(req.authToken["token_type"] !== "authorization")
        return res.status(403).json({"error": "Acesso não autorizado!"});

    // Lendo e validando variáveis
    let search = (req.query.search && typeof req.query.search === 'string') ? req.query.search : null;

     if(search)
         return res.json({'evidences': Object.values(EVIDENCES).filter(v => v.title.startsWith(search)) })
 
     return res.json({'evidences': Object.values(EVIDENCES) })
})

app.get('/api/evidences/:id', authorizationMiddleware, (req, res) => {
    // Verificando tipo do token
    if(req.authToken["token_type"] !== "authorization")
        return res.status(403).json({"error": "Acesso não autorizado!"});

    // Lendo e validando variáveis
    let evidenceId = (req.params.evidenceId && typeof req.params.evidenceId === 'string') ? req.params.evidenceId : null;

    if(EVIDENCES[evidenceId])
        return res.json({'evidence': EVIDENCES[evidenceId] })
 
    return res.status(404).json({"error": "Evidência não encontrada!"});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/react-build/index.html'))
})

// Enable Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
