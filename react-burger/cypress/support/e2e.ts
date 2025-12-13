/// <reference types="cypress" />
import '@4tw/cypress-drag-drop'

declare global {
    namespace Cypress {
        interface Chainable {
            waitForIngredients(): Chainable<void>

            addBunToConstructor(name: string): Chainable<void>

            dragIngredientToConstructor(index: number): Chainable<void>

            loginUser(): Chainable<void>

            getIngredient(name: string): Chainable<JQuery<HTMLElement>>

            shouldHaveCounter(name: string, count: number): Chainable<void>
        }
    }
}

Cypress.Commands.add('waitForIngredients', () => {
    cy.wait('@getIngredients', { timeout: 10000 })
})

Cypress.Commands.add('loginUser', () => {
    window.localStorage.setItem('accessToken', 'Bearer test-access-token')
    window.localStorage.setItem('refreshToken', 'test-refresh-token')

    cy.visit('/')
    cy.waitForIngredients()
})

Cypress.Commands.add('addBunToConstructor', (name: string) => {
    cy.contains('[data-ingredient-type="bun"]', name, {
        timeout: 10000,
    }).trigger('dragstart')

    cy.get('[data-testid="burger-constructor"]').trigger('drop', {
        force: true,
    })
})

Cypress.Commands.add('dragIngredientToConstructor', (index: number) => {
    cy.get('[data-testid="ingredient-card"]')
        .eq(index)
        .drag('[data-testid="burger-constructor"]')
})

Cypress.Commands.add('getIngredient', (name: string) => {
    return cy.contains('[data-testid="ingredient-card"]', name)
})

Cypress.Commands.add('shouldHaveCounter', (name: string, count: number) => {
    cy.getIngredient(name).find('[class*="counter"]').should('contain', count)
})
