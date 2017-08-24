import { expect } from 'chai';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';

import DesktopAppBanner from '../main.js';

let desktopAppBanner;

describe('DesktopAppBanner', () => {

	const initialTemplate = document.querySelector('.js-n-app-banner-wrapper').outerHTML;

	beforeEach(() => {
		desktopAppBanner = new DesktopAppBanner();
	});

	afterEach(() => {
	  document.querySelector('.js-n-app-banner-wrapper').outerHTML = initialTemplate;
	});

	it('should be able to grab the dom elements it needs.', () => {
		expect(desktopAppBanner.closeLink).not.to.be.undefined;
		expect(desktopAppBanner.emailButton).not.to.be.undefined;
		expect(desktopAppBanner.errorMessage).not.to.be.undefined;
		expect(desktopAppBanner.form).not.to.be.undefined;
		expect(desktopAppBanner.wrapper).not.to.be.undefined;
	});

	context('event binding', () => {
		it('binds on the close link', () => {
			sinon.spy(desktopAppBanner.closeLink, 'addEventListener');

			desktopAppBanner.bindEvents();

			expect(desktopAppBanner.closeLink.addEventListener.getCall(0).args[0]).to.eql('click');

			desktopAppBanner.closeLink.addEventListener.reset();
		});

		it('binds on form submit', () => {
			sinon.spy(desktopAppBanner.form, 'addEventListener');

			desktopAppBanner.bindEvents();

			expect(desktopAppBanner.form.addEventListener.getCall(0).args[0]).to.eql('submit');

			desktopAppBanner.form.addEventListener.reset();
		});
	});

	it('hides the banner when clicking on the close link', () => {
    let clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': false,
        'cancelable': true
      });

		desktopAppBanner.closeLink.dispatchEvent(clickEvent);

		expect(desktopAppBanner.wrapper.style).to.have.property('bottom');
	});

	context('making the call to send the email', () => {

		afterEach(() => {
			fetchMock.restore();
		});

		it('makes the call to send the email on form submit and disables the submit button', () => {
			fetchMock.post(desktopAppBanner.form.action, 200);
			let fetchSpy = sinon.spy(window, 'fetch');

			// We're calling this directly as submitting the actual form makes the page redirect and messes up the tests.
			desktopAppBanner.handleFormSubmit({ preventDefault: () => {} });

			sinon.assert.calledOnce(fetchSpy);
			expect(desktopAppBanner.emailButton.disabled).to.be.true;

			window.fetch.restore();

		});

		it('shows a thank you message if successful', done => {
			fetchMock.post(desktopAppBanner.form.action, 200);

			desktopAppBanner.submitForm().then(() => {
				expect(desktopAppBanner.wrapper.className).to.have.string('has-sent');

				done();
			});
		});

		it('shows an error message if failure and re-enables the submit button', done => {
			fetchMock.post(desktopAppBanner.form.action, 500);

			desktopAppBanner.submitForm().then(() => {
				expect(desktopAppBanner.errorMessage.innerHTML).to.eql('<p><strong>Oops!</strong> Please try again.</p>');
				expect(desktopAppBanner.emailButton.disabled).to.be.false;

				done();
			});
		});
	});

});
