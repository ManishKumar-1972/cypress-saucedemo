describe('SauceDemo Login Scenarios', () => {

  const baseUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Successful login with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Assert we land on the inventory page
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it('Login fails with invalid credentials', () => {
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('invalid_pass');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('Login fails when fields are empty', () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username is required');
  });
});
