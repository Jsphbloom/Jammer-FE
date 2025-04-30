describe('HomeContainer spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('contain', "Jammer")
    cy.get('p').should('contain', "Welcome to Jammer! Please select a user to continue.")
    cy.get('.schedule-list').should('exist')
  })
})