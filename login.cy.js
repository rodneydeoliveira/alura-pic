describe('Login de usuários da AluraPic', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/')
        cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
            statuscode: 400
        }).as('stubPost')

    })
    it('fazer login de usuário válido', () => {
        cy.login(Cypress.env('userName'), Cypress.env('password'));
        cy.wait('@stubPost')
        cy.contains('a', '(Logout)').should('be.visible');
        })
    it('fazer login de usuário inválido', () => {
        cy.login('rodney', '1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password');
    })
}) 
    it('registrar usuário válido', () => {
    cy.novoUsuario('rodney@lucas', 'Rodney', 'rodney', '12345678');
    })
    it('Tentativa de registro de usuário cadastrado', () => {
        cy.login_usuario_cadastrado('rodney@lucas', 'rodney', 'rodney', '12345678');
    })
    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it(`Registra novo usuário ${usuario.userName}`,() => {
            cy.contains('a', 'Register now').click();
            cy.contains('button', 'Register').click();
            cy.get('input[formcontrolname="email"]').type(usuario.email);
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuario.userName);
            cy.get('input[formcontrolname="password"]').type(usuario.password);
            cy.contains('button', 'Register').click();
         })
    })
})  