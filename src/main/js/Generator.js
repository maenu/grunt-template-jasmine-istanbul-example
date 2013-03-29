define(['Enum'], function(Enum) {
    return function (){
        this.getRandomNumber = function() {
            return Enum.FOUR;
        };
    };
});
