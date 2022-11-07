describe("check user input", () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/login.html')
    cy.get("#email").type("hsjksoospsospsosps")
    cy.get("#password").type("super")
    cy.get("button").click();
    cy.get("#emailErrorNotValid").contains("Email is not valid must be a valid stud.noroff.no or noroff.no email address")
  })
})