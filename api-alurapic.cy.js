describe('Buscar fotos e dados', () => {

    it('Buscar fotos do Flavio', () => {

        cy.request({
            method: 'GET',
            url: 'https://apialurapic.herokuapp.com/flavio/photos',

        }).then((resp) => {
            expect(resp.status).to.be.equal(200)
            expect(resp.body).is.not.empty
            expect(resp.body[0]).to.have.property('description')
            expect(resp.body[0].description).to.be.equal('Farol iluminado')
        }
        
        
        )

        
    })

    it('fazer login do Flavio', () => {

        cy.request({
            method: 'POST',
            url: 'https://apialurapic.herokuapp.com/user/login',
            body: Cypress.env()
        }).then((resp) => {
            expect(resp.status).to.be.equal(200)
            expect(resp.body).is.not.empty
            expect(resp.body).to.have.property('id')
            expect(resp.body.id).to.be.equal(1)
            expect(resp.body).to.have.property('email')
            expect(resp.body.email).to.be.equal("flavio@alurapic.com.br")
        })

        
    })
})