describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/login.html')
    cy.get("h3")
      .invoke("text")
      .should("equal", "Sign in into your account")
  })
})