describe('modals work correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('[class^=IngredientCard_card__]')
      .contains('Флюоресцентная булка R2-D3')
      .as('bunElement');

  });
  it('should open bun modal', () => {
    cy.get('@bunElement').click();
    cy.get('[class^=Modal_modalContainer__]').as('modal').should(
      'contain',
      'Флюоресцентная булка R2-D3'
    );
  });
  it('should close bun modal', () => {
    cy.get('[class^=Modal_modalContainer__]').as('modal').find('svg').click();
    cy.get('@modal').should('not.exist');
  });
  it('should open topping modal', () => {
    cy.get('[class^=IngredientCard_card__]')
    .contains('Соус Spicy-X').click();
    cy.get('[class^=Modal_modalContainer__]').should(
      'contain',
      'Соус Spicy-X'
    );
  });
  it('should close topping modal', () => {
    cy.get('[class^=Modal_modalContainer__]').as('modal').find('svg').click();
    cy.get('@modal').should('not.exist');
  });
});