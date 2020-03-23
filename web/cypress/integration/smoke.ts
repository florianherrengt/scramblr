/* eslint-disable @typescript-eslint/no-unused-expressions */
/// <reference types="cypress" />

import CryptoJS from "crypto-js"
import { config } from '../config'

const username = 'deletethisaccount' + CryptoJS.lib.WordArray.random(128 / 8).toString()
const password = 'demoaccount' + CryptoJS.lib.WordArray.random(128 / 8).toString()
const aesPassphrase = 'passphrase'
const tagLabel = 'tagtest'
context('Smoke tests', () => {
  it('sign up', function () {
    cy.visit(config.baseUrl + config.routerUri.signUp)
    cy.get('.SignUp_TextField_Username').type(username)
    cy.get('.SignUp_TextField_Password').type(password)
    cy.get('.SignUp_Button_Submit').click()
    cy.url().should('include', config.routerUri.notes).should(() => {
      expect(localStorage.getItem(config.localStorageKeys.token)).to.not.be.null
    })
  })

  it('set aes passphrase', function () {
    cy.get('.AesPassphraseForm_TextField_Passphrase').type(aesPassphrase)
    cy.get('.AesPassphraseForm_Button_Submit').click().should(() => {
      expect(localStorage.getItem(config.localStorageKeys.aesPassphrase)).to.not.be.null
    })
  })

  it('add a note', function () {
    const noteText = 'my first note'
    cy.get('.CreateNote_TextField_Text').type(noteText)
    cy.get('.CreateNote_Button_Submit').click()
    cy.get('.NoteList').should('contain', noteText)
  })

  it('add a tag', function () {

    cy.get('.TopBar_IconButton_Menu').click()
    cy.get('.MainLayout_Drawer_ListItem_Tags').click()
    cy.get('.CreateTagForm_TextField_Label').type(tagLabel)
    cy.get('.CreateTagForm_Button_Submit').click()
    cy.get('.ListTags').should('contain', tagLabel)
  })
  it('add a note with a tag', function () {
    cy.get('.TopBar_IconButton_Menu').click()
    cy.get('.MainLayout_Drawer_ListItem_Notes').click()

    cy.get('.CreateNote_TextField_Text').type('note with tag')
    cy.get('.SelectTag').type('test').type('{enter}')

    cy.get('.CreateNote_Button_Submit').click()
    cy.get('.NoteList').should('contain', 'tagtest')
  })

  it('delete a note', function () {
    cy.get('.CreateNote_TextField_Text').type('delete me').type('{alt}{enter}')

    cy.get('.NoteList .NoteCard').first().find('.NoteCard_IconButton_MoreActions').click()
    cy.get('.NoteCard_MenuItem_Delete').last().click()
    cy.get('.ListTags').should('not.contain', 'delete me')
  })

  it('edit a note', function () {
    cy.get('.CreateNote_TextField_Text').type('to edit me').type('{alt}{enter}')

    cy.get('.NoteList .NoteCard').first().find('.NoteCard_IconButton_MoreActions').click()
    cy.get('.NoteCard_MenuItem_Edit').last().click()

    cy.get('.NoteList .CreateNote .CreateNote_TextField_Text').type('edited').type('{alt}{enter}')
    cy.get('.NoteList .NoteCard').first().should('contain', 'edited')
  })

  it('add a lot of notes and scroll back to top', function () {
    for (let i = 0; i < 10; i++) {
      cy.get('.CreateNote_TextField_Text').type(Math.random().toString()).type('{alt}{enter}')
    }
    cy.scrollTo('bottom')
    cy.get('.NoteList_Button_ScrollTop')
      .should('be.visible')
    cy.get('.NoteList_Button_ScrollTop').click()
    cy.get('.NoteList_Button_ScrollTop')
      .should('not.be.visible')
  })

  it('logout', function () {
    cy.get('.TopBar_IconButton_Menu').click()
    cy.get('.MainLayout_Drawer_ListItem_Settings').click()
    cy.get('.Settings_Button_Logout').click()
    cy.url().should('include', config.routerUri.signIn).should(() => {
      expect(localStorage.getItem(config.localStorageKeys.token)).to.be.null
      expect(localStorage.getItem(config.localStorageKeys.aesPassphrase)).to.be.null
    })
  })
})

export { }