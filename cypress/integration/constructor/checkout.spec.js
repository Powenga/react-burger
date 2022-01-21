describe('checkout work correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  beforeEach(() => {
    cy.get('[class^=IngredientCard_card__]')
      .contains('Флюоресцентная булка R2-D3')
      .as('bunElement');
    cy.get('[class^=IngredientCard_card__]')
      .contains('Соус Spicy-X')
      .as('toppingElement');
    cy.get('[class^=BurgerConstructor_constructorWrap__]').as('targetElement');
  });
  it('should drag bun', () => {
    cy.get('@bunElement')
      .trigger('dragstart')
      .then(() => {
        cy.get('@targetElement').trigger('drop');
      })
      .then(() => {
        cy.get('@targetElement')
          .find('[class^=constructor-element]')
          .should('contain', 'Флюоресцентная булка R2-D3');
      });
  });
  it('should add topping', () => {
    cy.get('@toppingElement')
      .trigger('dragstart')
      .then(() => {
        cy.get('@targetElement').trigger('drop');
      })
      .then(() => {
        cy.get('@targetElement')
          .find('[class^=constructor-element]')
          .as('element')
          .should('contain', 'Флюоресцентная булка R2-D3');
        cy.get('@element').should('contain', 'Соус Spicy-X');
      });
  });
  it('should get the order', () => {
    cy.get('button')
      .contains('Оформить заказ')
      .as('checkOutButton')
      .click()
      .then(() => {
        if (cy.contains('Вход')) {
          cy.get('input[name^=email]')
            .type('rcomrades@ya.ru')
            .then(() => {
              cy.get('input[name^=password]').type('0000');
            })
            .then(() => {
              cy.get('button').contains('Войти').click();
              cy.intercept('POST', '/api/auth/login').as('login');
              cy.wait('@login');
            })
            .then(() => {
              cy.url().should('eq', 'http://localhost:3000/');
            })
            .then(() => {
              cy.get('@checkOutButton').click();
              cy.intercept('POST', 'api/orders').as('checkout');
              cy.wait('@checkout');
            })
            .then(() => {
              cy.get('[class^=Modal_modalContainer__]')
                .as('modal')
                .should('contain', 'идентификатор заказа');
              cy.get('@modal').find('svg').click();
              cy.get('@modal').should('not.exist');
            });
        } else {
          cy.get('@checkOutButton').click();
          cy.intercept('POST', 'api/orders').as('checkout');
          cy.wait('@checkout');
          cy.get('[class^=Modal_modalContainer__]').should(
            'contain',
            'идентификатор заказа'
          );
        }
      });
  });
});
