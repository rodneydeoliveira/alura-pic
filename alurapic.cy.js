describe('Login e registro de usuários da AluraPic', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/')

    })
    it('verifica mensagens de validacao', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');


    })

    it('verifica mensagem de email invalido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('rodney');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })
    it('verifica mensagem de full name com menos de 2 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="fullName"]').type('r');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })
    it('verifica mensagem de user name com menos de 2 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('r');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })
    it('verifica mensagem de senha com menos de 6 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })
    it('verifica mensagem de User Name com letra maiúscula', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('RODNEY');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })
    it('fazer login de usuário válido', () => {
        cy.login('flavio', '123');
        cy.contains('a', '(Logout)').should('be.visible');
        })
    it('fazer login de usuário inválido', () => {
        cy.login('rodney', '1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password');
    })
}) 
    it('registrar usuário válido', () => {
    cy.novoUsuario('rodney@lucas', 'Rodney', 'Rodney', '12345678');
    })
    it('Tentativa de registro de usuário cadastrado', () => {
        cy.login_usuario_cadastrado('rodney@lucas', 'rodney', 'rodney', '12345678');
    })
    
})

