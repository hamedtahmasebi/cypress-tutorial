/* eslint-disable no-undef */
describe("todo list", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    const testString = "A string to test this awesome app I wrote.";
    it("should focus on input on page load", () => {
        cy.focused().should("have.id", "new-todo");
    });
    it("should be able to type into input", () => {
        cy.get("#new-todo").type(testString).should("have.value", testString);
    });
    context("Form submit", () => {
        const testTodoObject = {
            text: "Hamed",
            id: "1",
        };
        it("should submit a new todo", () => {
            // Commented lines are not supported since Cypress@6.0.0 , use cy.intercept instead

            // cy.server();
            // cy.route("POST", "/api/todos", {
            //     text: "A todo Item",
            //     isCompleted: false,
            //     date: "12/8/2021",
            // });
            cy.intercept("POST", "http://localhost:8000/todos", {
                statusCode: 201,
                body: testTodoObject,
            }).as("addTodo");

            cy.get("#new-todo")
                .type("Hamed")
                .type("{enter}")
                .should("have.value", "");

            cy.wait("@addTodo")
                .its("request.body")
                .should("have.property", "text", "Hamed");

            cy.get("#todo-list li").should("contain", testTodoObject.text);
        });
        it("should show an error message on a failed submision", () => {
            cy.intercept("POST", "http://localhost:8000/todos", {
                statusCode: 500,
                response: {},
            });
            cy.get("#new-todo").type("something{enter}");
            cy.get("#submision-error").should("exist");
        });
    });
});
