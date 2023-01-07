/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import'bootstrap/dist/js/bootstrap.bundle.js';
import { Device } from './device';

$(function () {
  // User state variables.
  //let loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

  // EVENT HANDLERS

  // Event handler for login button click.
  $('#loginButton').on('click', function (event) {
    let loginButton = $('#loginButton');

    if (loginButton.is('.loggedIn')) {
      loginButton.trigger('user:logout');
    }
    if (loginButton.is('loggedOut')){
      loginButton.trigger('user:login');
    }
  });

  // Custom event handler for user:login event.
  $(document).on('user:login', function() {
    let loginButton = $('#loginButton');
    console.log('Signing in...');
    loginButton.text("Sign Out");
    loginButton.addClass('loggedIn').removeClass('loggedOut');
    $.noConflict();
    $('#loginModal').modal("toggle");
    let loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.hide();
  });

  // Custom event handler for user:logout event.
  // Signs out of database and reloads page.
  $(document).on('user:logout', function () {
    window.mysql.dbLogout();
    document.location.reload();
  });

  // Event handler for modal submission event.
  // Establishes database connection.
  $('#loginSubmitButton').on('click', async function (event) {
    // Get username and password from input fields on submission.
    const username = $('#userFormControl').val();
    const password = $('#passwordFormControl').val(); 

    // Send values to main process to create a database connection to the mysql server.
    let databaseConnection: Boolean = await window.mysql.dbLogin(username, password);
    if (!databaseConnection) {
      // Show error message on modal dialog.
      $('#invalidLoginMessage').toggle();
      $(document).trigger('user:loginFail');
    } else {      
      $(document).trigger('user:login');
    }
    console.log('Database Connection: ', databaseConnection);
  });

  $('#deviceTable').on('user:login', function (event) {
    let deviceTable = $(this);

    // Populate the table with device information
    console.log('Loading device table entries...');
  })
});
