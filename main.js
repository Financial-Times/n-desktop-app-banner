const OForms = require('o-forms');

export default class DesktopAppBanner {

	constructor() {
		this.closeLink = document.querySelector('.js-app-banner-close');
		this.emailButton = document.querySelector('.js-n-app-banner-button');
		this.emailField = document.querySelector('.js-n-app-banner-email-field');
		this.errorMessage = document.querySelector('.js-n-app-banner-error-message');
		this.form = document.querySelector('.js-n-app-banner-form');
		this.wrapper = document.querySelector('.js-n-app-banner-wrapper');

		new OForms(this.form);

		this.bindEvents();
	}

	bindEvents() {
		this.closeLink.addEventListener('click', this.handleCloseClick.bind(this));
		this.emailButton.addEventListener('click', this.handleEmailClick.bind(this));
		this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
	}

	handleCloseClick(e) {
		const event = new CustomEvent('oTracking.event', {
				detail: {
					category: 'desktop-app-banner',
					action: 'dismiss'
				},
				bubbles: true
			});
		document.body.dispatchEvent(event);

		this.wrapper.className += ' is-dismissed';
	}

	handleEmailClick(e) {
		// Only intercept if the user is yet to see the email field.
		if (!this.isEnteringEmail) {
			this.wrapper.className += ' is-entering-email';
			this.isEnteringEmail = true;

			e.preventDefault();
			return false;
		}
	}

	handleFormSubmit(e) {
		this.emailButton.disabled = 'disabled';
		// TODO: send the request

		// TODO: success handling
		// this.wrapper.className += ' has-sent';

		// TODO: error handling
		// this.errorMessage.innerHTML = '<p>Some error message here</p>';
		// this.emailButton.disabled = false;

		e.preventDefault();
		return false;
	}

};
