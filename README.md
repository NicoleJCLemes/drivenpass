# DrivenPass
## Usage

$ git clone https://github.com/NicoleJCLemes/drivenpass

$ cd drivenpass

$ npm install

$ npm run dev

## API:

### Rota de usuário
- POST /sign-up
    - Rota para o usuário criar uma conta
    - body: {
        "email": "",
        "password": "" (10 caracteres)
    }

- POST /sign-in
    - Rota para o usuário se logar em uma conta
    - Retorna um token
    - body: {
        "email": "",
        "password": "" (10 caracteres)
    }

### Rota de credenciais
- POST /credentials
    - Rota para o usuário guardar credenciais
    - headers: {
		"Authorization": "Bearer token_recebido"
	}
    - body: {
        "title": "",
        "url": "",
        "nickName": "",
        "password": ""
        "userId": ""
    }

- GET /credentials?id=1
    - Rota para listar credenciais
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

- DELETE /credentials/:id
    - Rota para apagar credenciais pelo id
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

### Rota de cartões
- POST /cards
    - Rota para o usuário guardar cartões
    - headers: {
		"Authorization": "Bearer token_recebido"
	}
    - body: {
        "title": "",
        "cardNumber": "",
        "cardName": "",
        "securityCode": "",
        "expirationDate": "MM/YYYY",
        "password": "",
        "isVirtual": "false" | "true",
        "type": "dual" | "debit" | "credit"
    }

- GET /cards?id=1
    - Rota para listar cartões
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

- DELETE /cards/:id
    - Rota para apagar cartões pelo id
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

### Rota de notas seguras
- POST /safe-notes
    - Rota para o usuário guardar notas seguras
    - headers: {
		"Authorization": "Bearer token_recebido"
	}
    - body: {
        "title": "" (max: 50),
        "note": "" (max: 1000)
    }

- GET /safe-notes?id=1
    - Rota para listar notas seguras
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

- DELETE /safe-notes/:id
    - Rota para apagar notas seguras pelo id
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

### Rota de redes wifi
- POST /networks
    - Rota para o usuário guardar redes wifi
    - headers: {
		"Authorization": "Bearer token_recebido"
	}
    - body: {
        "title": "",
        "networkName": "",
        "password": ""
    }

- GET /networks?id=1
    - Rota para listar redes wifi
    - headers: {
		"Authorization": "Bearer token_recebido"
	}

- DELETE /networks/:id
    - Rota para apagar redes wifi pelo id
    - headers: {
		"Authorization": "Bearer token_recebido"
	}
