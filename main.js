export default class DesktopAppBanner {

	constructor () {
		this.closeLink = document.querySelector('.js-app-banner-close');
		this.emailButton = document.querySelector('.js-n-app-banner-button');
		this.errorMessage = document.querySelector('.js-n-app-banner-error-message');
		this.form = document.querySelector('.js-n-app-banner-form');
		this.wrapper = document.querySelector('.js-n-app-banner-wrapper');

		document.body.dispatchEvent(new CustomEvent('oTracking.event', {
			detail: {
				category: 'component',
				action: 'view',
				messaging: 'desktop-app-banner'
			},
			bubbles: true
		}));

		this.bindEvents();
	}

	bindEvents () {
		this.closeLink.addEventListener('click', this.handleCloseClick.bind(this));
		this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
	}

	handleCloseClick () {
		const event = new CustomEvent('oTracking.event', {
				detail: {
					category: 'component',
					action: 'close',
					messaging: 'desktop-app-banner'
				},
				bubbles: true
			});
		document.body.dispatchEvent(event);

		this.wrapper.style.bottom = `-${this.wrapper.clientHeight}px`;
	}

	handleFormSubmit (e) {
		if (!this.emailButton.disabled) {
			this.emailButton.disabled = 'disabled';

			document.body.dispatchEvent(new CustomEvent('oTracking.event', {
				detail: {
					category: 'form',
					action: 'submit',
					messaging: 'desktop-app-banner'
				},
				bubbles: true
			}));

			this.submitForm();
		}

		e.preventDefault();
		return false;
	}

	submitForm () {
		return fetch(this.form.action, { method: 'POST' })
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('<strong>Oops!</strong> Please try again.');
				}
				this.wrapper.className += ' has-sent';
			})
			.catch((e) => {
				this.errorMessage.innerHTML = `<p>${e.message}</p>`;
				this.emailButton.disabled = false;
			});
	}

};
