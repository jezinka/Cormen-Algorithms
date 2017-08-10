let squares = [];
let speed = 5;

function initSquares(numbers) {

    for (let i = 0; i < numbers.length; i++) {

        squares.push({
                'x': 50 + (50 * i) + 10,
                'y': 50,
                'width': 30,
                'height': 30,
                'fill': 'cyan',
                animId: 0,
                distance: 0,
                turn: 1,
                direction: "top",
                value: numbers[i],
                draw: function (callback) {

                    context.clearRect(this.x, this.y, this.width, this.height);

                    this.fill = 'yellow';
                    const square = this;

                    this.animId = window.requestAnimationFrame(square.draw.bind(square).bind(callback));

                    if (this.direction === "top") {
                        if (this.y < 100) {
                            this.y += speed;
                        } else {
                            this.direction = "horizontally";
                        }
                    } else if (this.direction === "horizontally") {
                        if (this.distance > 0) {
                            this.x += speed * this.turn;
                            this.distance -= speed;
                        } else {
                            this.direction = "bottom"
                        }
                    } else if (this.direction === "bottom") {
                        if (this.y > 50) {
                            this.y -= speed;
                        } else {
                            this.fill = 'cyan';
                            window.cancelAnimationFrame(this.animId);
                            this.direction = "top";
                            if (this.callback) {
                                this.callback()
                            }
                        }
                    }
                    drawRectangle(this);
                }
            }
        )
    }
}

function swap() {
    let chain = Promise.resolve();
    for (let i of steps) {
        chain = chain.then(() => getProm(i));
    }
    return chain;
}

function getProm(i) {
    return new Promise(resolve => {

        let srcSquare = squares[i[0]];
        let destSquare = squares[i[1]];

        srcSquare.turn = destSquare.x > srcSquare.x ? 1 : -1;
        srcSquare.distance = destSquare.distance = Math.abs(destSquare.x - srcSquare.x);
        srcSquare.draw();

        destSquare.turn = srcSquare.x > destSquare.x ? 1 : -1;
        destSquare.callback = resolve;
        destSquare.draw();

        const temp = squares[i[0]];
        squares[i[0]] = squares[i[1]];
        squares[i[1]] = temp;

    })
}

function drawRectangle(square) {
    context.beginPath();
    context.rect(square.x, square.y, square.width, square.height);

    const textX = square.x + square.width / 2 - context.measureText(square.value.toString()).width / 2;
    const textY = square.y + square.height / 2;

    context.fillStyle = square.fill;
    context.fill();

    context.fillStyle = 'black';
    context.textBaseline = "middle";
    context.fillText(square.value.toString(), textX, textY);
    context.closePath();
}

function drawRectangles(numbers) {

    initSquares(numbers);

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numbers.length; i++) {
        drawRectangle(squares[i]);
    }
}

(function () {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());