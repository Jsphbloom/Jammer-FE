describe('SchedulesPage spec', () => {
  it('visits the schedule page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('contain', "Jammer")
    cy.get('p').should('contain', "Welcome to Jammer! Please select a user to continue.")
    cy.get('.schedule-list').click()

    cy.get('h2').should('contain', "All Schedules")
  })

  it('can open and close schedules', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.schedule-list').click()
    cy.get('[open=""] > ul > :nth-child(1) > details > summary').should('not.exist');

    cy.get('.all-schedules-container > :nth-child(2) > :nth-child(1) > :nth-child(1)').click()
    cy.get('[open=""] > ul > :nth-child(1) > details > summary').should('contain', 'Jazz Eruption')
    
    cy.get('.all-schedules-container > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1)').click()
    cy.get('[open=""] > ul > :nth-child(1) > details > summary').should('not.exist');

    cy.get('.all-schedules-container > :nth-child(2) > :nth-child(2) > :nth-child(1)').click()
    cy.get('[open=""] > ul > :nth-child(1) > details > summary').should('contain', 'Metalcore')
  })
})