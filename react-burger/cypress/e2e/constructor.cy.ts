/// <reference types="cypress" />

import {
    API_URL,
    BURGER_CONSTRUCTOR,
    INGREDIENT_CARD,
    MODAL,
    ORDER_BUTTON,
} from '../support/constants'

describe('Конструктор бургера', () => {
    beforeEach(() => {
        cy.intercept('GET', `${API_URL}ingredients`, {
            fixture: 'ingredients.json',
        }).as('getIngredients')
        cy.intercept('POST', `${API_URL}auth/login`, {
            fixture: 'user.json',
        }).as('login')
        cy.intercept('GET', `${API_URL}auth/user`, {
            fixture: 'user.json',
        }).as('getUser')
        cy.intercept('POST', `${API_URL}orders`, {
            fixture: 'order.json',
        }).as('createOrder')

        cy.visit('/')
        cy.waitForIngredients()
    })

    describe('Функциональность переноса DnD', () => {
        it('Добавление булочки', () => {
            const bunName = 'Краторная булка N-200i'

            cy.get('[data-testid="empty-constructor"]').should('exist')
            cy.getIngredient(bunName).drag(BURGER_CONSTRUCTOR)

            cy.get('[data-testid="constructor-bun-top"]').should(
                'contain',
                '(верх)'
            )
            cy.get('[data-testid="constructor-bun-bottom"]').should(
                'contain',
                '(низ)'
            )
            cy.get('[data-testid="empty-constructor"]').should('not.exist')

            cy.shouldHaveCounter(bunName, 2)
        })

        it('Добавление соуса', () => {
            const sauceName = 'Соус Spicy-X'
            const bun1 = 'Флюоресцентная булка R2-D3'

            cy.addBunToConstructor(bun1)
            cy.getIngredient(sauceName).drag(BURGER_CONSTRUCTOR)

            cy.get('[data-testid="constructor-fillings"]').should(
                'contain',
                sauceName
            )

            cy.shouldHaveCounter(sauceName, 1)
        })

        it('Замена булочки', () => {
            const bun1 = 'Флюоресцентная булка R2-D3'
            const bun2 = 'Краторная булка N-200i'

            cy.addBunToConstructor(bun1)
            cy.addBunToConstructor(bun2)

            cy.get('[data-testid="constructor-bun-top"]').should(
                'contain',
                bun2
            )
            cy.get('[data-testid="constructor-bun-bottom"]').should(
                'contain',
                bun2
            )
        })
    })

    describe('Модальное окно ингредиента', () => {
        it('Открыть и закрыть окно нажатием', () => {
            const ingredientName = 'Говяжий метеорит (отбивная)'

            cy.getIngredient(ingredientName).click()
            cy.get(MODAL).should('exist')
            cy.contains('Детали ингредиента').should('exist')
            cy.get('[data-testid="ingredient-name"]').should(
                'contain',
                ingredientName
            )

            cy.get('[data-testid="modal-close-button"]').click()
            cy.get(MODAL).should('not.exist')
        })

        it('Закрыть клавишей ESC', () => {
            cy.get(INGREDIENT_CARD).first().click()
            cy.get(MODAL).should('exist')
            cy.get('body').type('{esc}')
            cy.get(MODAL).should('not.exist')
        })
    })

    describe('Создание заказа', () => {
        const bun1 = 'Флюоресцентная булка R2-D3'
        it('Подсчет стоимости', () => {
            cy.addBunToConstructor(bun1)
            cy.get('[data-ingredient-type="sauce"]')
                .first()
                .drag(BURGER_CONSTRUCTOR)

            cy.get('[data-testid="total-price"]')
                .invoke('text')
                .should('match', /\d+/)
        })

        it('Проверка неактивной кнопки', () => {
            cy.get(ORDER_BUTTON).should('be.disabled')
        })

        it('Перенос на /login если неавторизован', () => {
            cy.addBunToConstructor(bun1)
            cy.get(ORDER_BUTTON).click()
            cy.url().should('include', '/login')
        })

        it('Создание заказа когда авторизован', () => {
            cy.loginUser()

            cy.addBunToConstructor(bun1)
            cy.get('[data-ingredient-type="main"]')
                .first()
                .drag(BURGER_CONSTRUCTOR)

            cy.get(ORDER_BUTTON).click()
            cy.wait('@createOrder')

            cy.get('[data-testid="order-details"]').should('exist')
            cy.get('[data-testid="order-number"]').should('have.text', '12345') // из order.json
        })

        it('Закрытие окна заказа', () => {
            cy.loginUser()
            cy.addBunToConstructor(bun1)
            cy.get(ORDER_BUTTON).click()
            cy.wait('@createOrder')

            cy.get('[data-testid="modal-close-button"]').click()
            cy.get('[data-testid="order-details"]').should('not.exist')
        })
    })
})
