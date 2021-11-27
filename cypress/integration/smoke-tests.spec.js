/* eslint-disable no-undef */
import { todos } from "../fixtures/todos.json";
describe("Smoke tests", () => {
    const todosAPI = "http://localhost:8000/todos";
    beforeEach(() => {
        cy.request("GET", todosAPI)
            .its("body")
            .each((todo) => {
                cy.request("DELETE", `${todosAPI}/${todo.id}`);
            });
    });
    context("With no todos", () => {
        it("Saves new todos", () => {
            const todos = [
                { text: "CYPRESS SMOKE TEST 1", expectedLength: 1 },
                { text: "CYPRESS SMOKE TEST 2", expectedLength: 2 },
                { text: "CYPRESS SMOKE TEST 3", expectedLength: 3 },
            ];

            cy.wrap(todos).each((todo) => {
                cy.intercept("POST", todosAPI).as("addTodo");
                cy.visit("/");
                cy.focused().type(`${todo.text}{enter}`);
                cy.wait("@addTodo");

                cy.get("#todo-list li").should(
                    "have.length",
                    todo.expectedLength
                );
            });
        });
    });
    context("With active todos", () => {
        beforeEach(() => {
            todos.forEach((todo) => {
                const newTodo = Cypress._.merge(todo, { isCompleted: false });
                cy.request("POST", todosAPI, newTodo);
            });
            cy.visit("/");
        });
        it("Loads existing data from database", () => {
            cy.get("#todo-list li").should("have.length", todos.length);
        });
        it("Deletes todos", () => {
            cy.intercept("DELETE", `${todosAPI}/*`).as("delete");
            cy.get("#todo-list li ").each((el) => {
                cy.wrap(el).find(".delete-btn").invoke("show").click();
                cy.wait(`@delete`);
            });
            cy.get("#todo-list li").should("have.length", 0);
        });
        it("should toggle todos", () => {
            const clickAndWait = (el) => {
                cy.wrap(el).as("item");
                cy.get("@item").find(".toggle").click();
                cy.wait("@update");
            };

            cy.intercept("PUT", `${todosAPI}/*`).as("update");
            cy.get("#todo-list li")
                .each((el) => {
                    clickAndWait(el);
                    cy.get("@item").find(".toggle").should("be.checked");
                    cy.get("@item").should("have.class", "completed");
                })
                .each((el) => {
                    clickAndWait(el);
                    cy.get("@item").find(".toggle").should("not.be.checked");
                    cy.get("@item").should("not.have.class", "completed");
                });
        });
    });
});
