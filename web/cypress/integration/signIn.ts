/* eslint-disable @typescript-eslint/no-unused-expressions */
/// <reference types="cypress" />

import CryptoJS from 'crypto-js';
import { config } from '../config';
import { signInRequest } from '../helpers';

const username =
    'deletethisaccount' + CryptoJS.lib.WordArray.random(128 / 8).toString();
const password =
    'demoaccount' + CryptoJS.lib.WordArray.random(128 / 8).toString();

context('Sign In', () => {
    before(() => {
        signInRequest({ username, password });
    });
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('connect.sid');
    });

    it('sign In', function() {
        cy.visit(Cypress.config().baseUrl + config.routerUri.signIn);
        cy.get('.SignIn_TextField_Username').type(username);
        cy.get('.SignIn_TextField_Password').type(password);
        cy.get('.SignIn_Button_Submit').click();
        cy.url().should('include', config.routerUri.notes);
    });
});

export {};
