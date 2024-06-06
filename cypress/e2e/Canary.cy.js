/// <reference types="cypress" />
import { describe } from "mocha";


describe('Application Tests', () => {
    const baseUrl = 'http://localhost:5174';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('Deve tentar fazer o login e resultar em erro de ceredenciais', () => {
      cy.get('a').contains('Login').click({force: true});
      cy.get('input[name=email]').type('teste@teste.com', { force: true });
      cy.get('input[name=password]').type('teste123', { force: true });
      cy.get('button').contains('Login').click({ force: true });
  
      // cy.url().should('include', '/posts');
      cy.get('p').contains('Invalid credentials').should('be.visible');
    });
  
    it('Deve mostrar o Ranking de usuários', () => {
      cy.get('a').contains('Ranking').click({force: true});
      cy.url().should('include', '/ranking');
      cy.get('div').contains('Ranking de Pontuações').should('be.visible');
      cy.get('li').should('have.length.greaterThan', 0);
    });
  
    it('DEve navegar para o cadastro do usuário ao clicar no card do usuários', () => {
      cy.get('a').contains('Ranking').click({force: true});
      cy.get('li').first().click({force: true});
      cy.url().should('include', '/user');
      cy.get('h2').contains('Profile').should('be.visible');
    });
      
  });
  