/* eslint-disable @typescript-eslint/no-unused-expressions */
/// <reference types="cypress" />

import CryptoJS from 'crypto-js';
import { config } from '../config';

const username =
    'deletethisaccount' + CryptoJS.lib.WordArray.random(128 / 8).toString();
const password =
    'demoaccount' + CryptoJS.lib.WordArray.random(128 / 8).toString();

context('Sign Up', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('connect.sid');
    });

    it('sign up', function() {
        cy.visit(Cypress.config().baseUrl + config.routerUri.signUp);
        cy.get('.SignUp_TextField_Username').type(username);
        cy.get('.SignUp_TextField_Password').type(password);
        cy.get('.SignUp_Button_Submit').click();
        cy.url().should('include', config.routerUri.notes);
    });
});

export {};
