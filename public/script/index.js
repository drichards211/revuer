'use strict'

function handleUserNav() {
  $('body').on('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'sign-in') {
      console.log("sign-in button pressed")
    } 
    if (`${$(this).prop('id')}` === 'sign-up') {
      console.log("sign-up button pressed")
    } 
    if (`${$(this).prop('id')}` === 'preview') {
      console.log("preview button pressed")
    }
    if (`${$(this).prop('id')}` === 'chair-1') {
      console.log("chair-1 button pressed")
    } 
    if (`${$(this).prop('id')}` === 'chair-2') {
      console.log("chair-2 button pressed")
    } 
    if (`${$(this).prop('id')}` === 'chair-3') {
      console.log("chair-3 button pressed")
    } 
  })
}

function updateDOMTest() {
  console.log("updateDOMTest ran")
  $('.js-test').append(
    `<p>This is new text rendered by index.js</p>`)
}

$(function() {
  updateDOMTest()
  handleUserNav()
})