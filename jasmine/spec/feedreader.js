/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		* allFeeds variable has been defined and that it is not
		* empty. Experiment with this before you get started on
		* the rest of this project. What happens when you change
		* allFeeds in app.js to be an empty array and refresh the
		* page?
		*/
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* loops through each feed
		* in the allFeeds object and ensures it has a URL defined
		* and that the URL is not empty.
		*/
		it('urls are defined and not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
				expect(feed.url).not.toBeNull();
			});
		});

		/* a test that loops through each feed
		* in the allFeeds object and ensures it has a name defined
		* and that the name is not empty.
		*/
		it('names are defined and not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
				expect(feed.name).not.toBeNull();
			});
		});

	});

	describe('The Menu', function() {

		/* a test that ensures the menu element is
		* hidden by default. You'll have to analyze the HTML and
		* the CSS to determine how we're performing the
		* hiding/showing of the menu element.
		*/
		it('is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});


		/* a test that ensures the menu changes
		* visibility when the menu icon is clicked. This test
		* should have two expectations: does the menu display when
		* clicked and does it hide when clicked again.
		*/
		it('changes visibility when display is clicked', function() {
			var menuIcon = $('.menu-icon-link');

			// test that the click unhides the menu
			menuIcon.click();
			expect($('body').attr('class')).not.toBe('menu-hidden');

			// test that click hides the menu again
			menuIcon.click();
			expect($('body').attr('class')).toBe('menu-hidden');
		});
	});

	describe('Initial Entries', function() {

		/* test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test wil require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('has at least one entry', function(done) {
			expect($('.feed').children().length).toBeGreaterThan(0);
			done();
		});
	});

	describe('New Feed Selection', function() {
		/* test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		var feed;

		beforeEach(function(done) {
			loadFeed(0, function() {
				feed0 = $('.feed')[0].innerHTML;  // save the html of this feed

				// load a different feed as part of the callback
				loadFeed(1, function() {
					feed1 = $('.feed')[0].innerHTML;  // save the html of this feed also

					// finished with these nested callbacks
					done();
				});
			});
		});

		it('loads changes', function(done) {
			expect(feed1).not.toBe(feed0);
			done();
		});
	});
}());
