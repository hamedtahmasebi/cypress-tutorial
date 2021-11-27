/* eslint-disable no-undef */
import { todos } from "../fixtures/todos.json";
const todoAPI = "http://localhost:8000/todos";
describe("app initialization", () => {
    context("error check", () => {
        it("should show error if couldn't get data from API", () => {
            cy.visit("/");
            cy.intercept("GET", todoAPI, {
                statusCode: 500,
                response: {},
            });
            cy.get("#todo-list li").should("have.length", 0);
            cy.get("#todos-left").should("exist");
        });
    });
});
describe("APP", () => {
    context("API Integration", () => {
        beforeEach(() => {
            cy.visit("/");
            cy.intercept("GET", todoAPI, todos);
        });
        it("should get todos", () => {
            cy.get("#todo-list .todo-text").should("have.length", todos.length);
        });

        it("should be able to show completed todos with class completed", () => {
            cy.fixture("todos").then(({ todos }) => {
                const target = Cypress._.head(todos);
                cy.intercept(
                    "PUT",
                    `${todoAPI}/${target.id}`,
                    Cypress._.merge(target, { isCompleted: true })
                );
            });
            cy.get("#todo-list li").first().as("first-todo");

            cy.get("@first-todo").find(".toggle").click().should("be.checked");

            cy.get("#todo-list li").should("have.class", "completed");

            cy.get("#todos-left").should("contain", 2);
        });
        it("should show the number of uncompleted todos correctly", () => {
            cy.get("#todos-left").should("contain", 3);
        });
        it("should be able to delete a todo", () => {
            cy.intercept("DELETE", `${todoAPI}/1`, { response: {} });
            cy.get("#todo-list li").as("list");
            cy.get("@list").first().find(".delete-btn").invoke("show").click();

            cy.get("@list")
                .should("have.length", 3)
                .and("not.contain", "Todo 1");
        });
    });
    // it("should be able to set todos to completed", () => {
    //     cy.fixture("todos").then((todos) => Cypress._.head());
    // });
});
