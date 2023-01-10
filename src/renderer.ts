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
import 'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.js';
import { Device } from './device';
import { Alert } from 'bootstrap';

$(function () {
  // EVENT HANDLERS

  /** 
   * Handler for user:login event.
   * Closes login modal and begins loading table data.
  */ 
  $(document).on('user:login', function() {
    let loginButton = $('#loginButton');
    loginButton.text("Sign Out");
    loginButton.addClass('loggedIn').removeClass('loggedOut');

    // Close login modal
    $('.btn-close').trigger('click');

    // Begin loading table data
    $(this).trigger('table:load');

    // Enable 'add device' button
    if ($('#addDeviceBtn').prop('hidden', true)) {
      $('#addDeviceBtn').prop('hidden', false);
    }
  });

  /**
   * Handler for user:logout event.
   * Signs out of database and reloads page.
   */
  $(document).on('user:logout', function () {
    window.mysql.db.logout();
    document.location.reload();
  });

  /**
   * Handler for table:load event.
   * Populates page with mobile devices.
   */
  $(document).on('table:load', function (event) {
    // Populate the table with device information
    console.log('Loading device table entries...');
    let results = window.mysql.table.load();
    console.log(results);
  });

  /**
   * Handler for user:loginFail event.
   * Shows an error message on invalid login attempt.
   */
  $(document).on('user:loginFail', function (event) {
    let invalidLogin = $('#invalidLoginMessage').clone();
    invalidLogin.prependTo($('.modal-body'))
    invalidLogin.removeClass('d-none');
  });

  /**
   * Event handler for login button click.
   * Triggers the appropriate user login/logout event based on current state.
   */
  $('#loginButton').on('click', function (event) {
    let loginButton = $('#loginButton');

    if (loginButton.is('.loggedIn')) {
      loginButton.trigger('user:logout');
    }
    if (loginButton.is('.loggedOut')) {
      console.log('triggering user:login');
      loginButton.trigger('user:login');
    }
  });

  /**
   * Event handler for modal submission event.
   * Establishes database connection.
   */
    $('#loginSubmitButton').on('click', async function (event) {
    // Get username and password from input fields on submission.
    const username = $('#userFormControl').val();
    const password = $('#passwordFormControl').val(); 

    // Send values to main process to create a database connection to the mysql server.
    let databaseConnection: Boolean = await window.mysql.db.login(username, password);
    if (!databaseConnection) {
      $(document).trigger('user:loginFail');
    } else {      
      $(document).trigger('user:login');
    }
    console.log('Database Connection: ', databaseConnection);
  });

  /**
   * Event handler for device submission button in add-device modal.
   * Preps data from fields for submission to database.
   */
  $('#deviceSubmitBtn').on('click', async function (event) {
    let device = new Device();
    

    // Setup datalist options with usernames.
    
  });

  /**
   * Event handler for add device button.
   * Loads the username datalist options from the database.
   */
  $('#addDeviceBtn').on('click', async function (event) {
    let usernameDatalistOptions = $('#usernameDatalistOptions');

    // Query usernames from database.
    let usernames: string[] = await window.mysql.db.getUsernames();
    console.log(usernames);
  });
});
