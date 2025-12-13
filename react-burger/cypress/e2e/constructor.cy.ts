/// <reference types="cypress" />

describe('Конструктор бургера', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            'https://norma.education-services.ru/api/ingredients',
            { fixture: 'ingredients.json' }
        ).as('getIngredients')
        cy.intercept(
            'POST',
            'https://norma.education-services.ru/api/auth/login',
            { fixture: 'user.json' }
        ).as('login')
        cy.intercept(
            'GET',
            'https://norma.education-services.ru/api/auth/user',
            { fixture: 'user.json' }
        ).as('getUser')
        cy.intercept(
            'POST',
            'https://norma.education-services.ru/api/orders',
            {
                fixture: 'order.json',
            }
        ).as('createOrder')

        cy.visit('/')
        cy.waitForIngredients()
    })

    describe('Функциональность переноса DnD', () => {
        it('Добавление булочки', () => {
            const bunName = 'Краторная булка N-200i'

            cy.get('[data-testid="empty-constructor"]').should('exist')
            cy.getIngredient(bunName).drag(
                '[data-testid="burger-constructor"]'
            )

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
            cy.getIngredient(sauceName).drag(
                '[data-testid="burger-constructor"]'
            )

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
            cy.get('[data-testid="modal"]').should('exist')
            cy.contains('Детали ингредиента').should('exist')
            cy.get('[data-testid="ingredient-name"]').should(
                'contain',
                ingredientName
            )

            cy.get('[data-testid="modal-close-button"]').click()
            cy.get('[data-testid="modal"]').should('not.exist')
        })

        it('Закрыть клавишей ESC', () => {
            cy.get('[data-testid="ingredient-card"]').first().click()
            cy.get('[data-testid="modal"]').should('exist')
            cy.get('body').type('{esc}')
            cy.get('[data-testid="modal"]').should('not.exist')
        })
    })

    describe('Создание заказа', () => {
        const bun1 = 'Флюоресцентная булка R2-D3'
        it('Подсчет стоимости', () => {
            cy.addBunToConstructor(bun1)
            cy.get('[data-ingredient-type="sauce"]')
                .first()
                .drag('[data-testid="burger-constructor"]')

            cy.get('[data-testid="total-price"]')
                .invoke('text')
                .should('match', /\d+/)
        })

        it('Проверка неактивной кнопки', () => {
            cy.get('[data-testid="order-button"]').should('be.disabled')
        })

        it('Перенос на /login если неавторизован', () => {
            cy.addBunToConstructor(bun1)
            cy.get('[data-testid="order-button"]').click()
            cy.url().should('include', '/login')
        })

        it('Создание заказа когда авторизован', () => {
            cy.loginUser()

            cy.addBunToConstructor(bun1)
            cy.get('[data-ingredient-type="main"]')
                .first()
                .drag('[data-testid="burger-constructor"]')

            cy.get('[data-testid="order-button"]').click()
            cy.wait('@createOrder')

            cy.get('[data-testid="order-details"]').should('exist')
            cy.get('[data-testid="order-number"]').should('have.text', '12345') // из order.json
        })

        it('Закрытие окна заказа', () => {
            cy.loginUser()
            cy.addBunToConstructor(bun1)
            cy.get('[data-testid="order-button"]').click()
            cy.wait('@createOrder')

            cy.get('[data-testid="modal-close-button"]').click()
            cy.get('[data-testid="order-details"]').should('not.exist')
        })
    })
})
