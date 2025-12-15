/// <reference types="cypress" />
import '@4tw/cypress-drag-drop'

import { BURGER_CONSTRUCTOR, INGREDIENT_CARD } from './constants'

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

    cy.get(BURGER_CONSTRUCTOR).trigger('drop', {
        force: true,
    })
})

Cypress.Commands.add('dragIngredientToConstructor', (index: number) => {
    cy.get(INGREDIENT_CARD).eq(index).drag(BURGER_CONSTRUCTOR)
})

Cypress.Commands.add('getIngredient', (name: string) => {
    return cy.contains(INGREDIENT_CARD, name)
})

Cypress.Commands.add('shouldHaveCounter', (name: string, count: number) => {
    cy.getIngredient(name).find('[class*="counter"]').should('contain', count)
})
