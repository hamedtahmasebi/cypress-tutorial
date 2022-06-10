// /* eslint-disable no-undef */
// import { todos } from "../fixtures/todos.json";
// const todoAPI = "http://localhost:8000/todos";
// const notCompletedTodos = todos.filter((todo) => todo.isCompleted === false);
// describe("Footer", () => {
//     context("Display singular or plural text", () => {
//         beforeEach(() => {
//             cy.visit("/");
//         });
//         it("should dispaly singular form for single todo", () => {
//             cy.intercept("GET", todoAPI, [
//                 {
//                     id: 10,
//                     text: "Single Todo Item",
//                     isCompleted: false,
//                 },
//             ]).as("getSingleTodo");
//             cy.visit("/");
//             cy.wait("@getSingleTodo");
//             cy.get("#todo-list li").should("have.length", 1);
//             cy.get("#todos-left").should("contain", 1);
//             cy.get("#todos-left-text").should("contain", "todo left");
//         });
//         it("should dispaly plural form for multiple todo", () => {
//             cy.intercept("GET", todoAPI, todos);
//             cy.get("#todo-list li").should("have.length", todos.length);
//             cy.get("#todos-left").should("contain", notCompletedTodos.length);
//             cy.get("#todos-left-text").should("contain", "todos left");
//         });
//     });
//     context("Footer Operations", () => {
//         beforeEach(() => {
//             cy.visit("/");
//             cy.intercept("GET", todoAPI, todos);
//         });
//         it("Filter Todos", () => {
//             const filters = [
//                 { status: "active", expectedLength: 3 },
//                 { status: "completed", expectedLength: 1 },
//             ];

//             filters.forEach((filter) => {
//                 cy.get(`#show-${filter.status}-todos`).click();
//                 cy.get("#todo-list li").should(
//                     "have.length",
//                     filter.expectedLength
//                 );
//                 cy.get("#todo-list li").should("have.class", filter.status);
//             });
//             // cy.get("#show-active-todos").click();
//             // cy.get("#todo-list li").should(
//             //     "have.length",
//             //     notCompletedTodos.length
//             // );
//             // cy.get("#todo-list li").should("not.have.class", "completed");
//         });
//     });
// });
