describe('checkout work correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('[class^=IngredientCard_card__]')
      .contains('Флюоресцентная булка R2-D3')
      .as('bunElement');
    cy.get('[class^=IngredientCard_card__]')
      .contains('Соус Spicy-X')
      .as('toppingElement');
  });
  it('should open modal', () => {
    cy.get('@bunElement').click();
    cy.get('[class^=Modal_modalContainer__]').should(
      'contain',
      'Флюоресцентная булка R2-D3'
    );
  });
});
