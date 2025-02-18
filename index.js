const GameViewport = {
    WIDTH: 384,
    HEIGHT: 216,
}

window.addEventListener('load', function () {
    //get our canvas and context
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //set our canvas size
    canvas.width = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;

    const entities = [
        new Stage(),
        new Player(80, 145, 150),
        new Player2(160, 145, -150),
        new FPSCounter(),
    ];

    //for managing game clock
    const GameTime = {
        previous: 0,
        delta: 0,
    };

    function frame (time) {
        window.requestAnimationFrame(frame);

        //update time between frames
        GameTime.delta = (time - GameTime.previous) / 1000;
        GameTime.previous = time;
        
        
    }//end frame

    window.requestAnimationFrame(frame);

});//end window.onload