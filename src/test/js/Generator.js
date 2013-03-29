define(['Generator', 'Enum'], function(Generator, Enum) {
    describe('Generator', function () {
        beforeEach(function() {
            this.generator = new Generator();
        });

        describe('getRandomNumber', function () {
            it('should be chosen by fair dice roll', function () {
                expect(this.generator.getRandomNumber()).toBe(Enum.FOUR);
            });
        });
    });
});
