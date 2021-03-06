define([
    'test-sandbox',
    'text!fixtures/tozee.html'
], function(testSandbox, fixture) {
    var Tozee;
    var $element;
    var $;

    describe('Tozee plugin', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;
                Tozee = $.fn.tozee.Constructor;
                $element = $(fixture);

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });
    });
});