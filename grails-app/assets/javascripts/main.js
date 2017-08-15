function initSquares(numbers, resolve) {

    squares = [];

    if (numbers === undefined) {
        numbers = $('#numbers').val().split(',');
    }

    for (let i = 0; i < numbers.length; i++) {

        squares.push({
            'x': 50 * i,
            'y': 10,
                'width': 30,
                'height': 30,
                'fill': 'cyan',
                animId: 0,
                distance: 0,
                turn: 1,
                direction: "top",
                value: numbers[i],
            drawSwap: function () {

                    context.clearRect(this.x, this.y, this.width, this.height);

                    this.fill = 'yellow';
                    const square = this;

                this.animId = window.requestAnimationFrame(square.drawSwap.bind(square));

                    if (this.direction === "top") {
                        if (this.y < 50) {
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
                        if (this.y > 10) {
                            this.y -= speed;
                        } else {
                            this.fill = 'cyan';
                            window.cancelAnimationFrame(this.animId);
                            this.direction = "top";
                            this.callback()
                        }
                    }
                drawSquare(this);
            },
            drawShift: function () {

                context.clearRect(this.x, this.y, this.width, this.height);

                this.fill = 'yellow';
                const square = this;

                this.animId = window.requestAnimationFrame(square.drawShift.bind(square));

                if (this.distance > 0) {
                    this.x += speed * this.turn;
                    this.distance -= speed;
                } else {
                    this.fill = 'cyan';
                    window.cancelAnimationFrame(this.animId);
                    if (this.callback) {
                        this.callback()
                    }
                }

                drawSquare(this);
            }
            }
        )
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numbers.length; i++) {
        Promise.all([
            new Promise(resolve => {
                drawSquare(squares[i], resolve);
            })
        ])
    }

    if (resolve) {
        resolve()
    }

}

function swap(steps) {
    initSquares();

    let chain = Promise.resolve();
    for (let step of steps) {
        if (step[2] === 'swap') {
            chain = chain.then(() => getProm(step));
        } else {
            chain = chain.then(() => getPromShift(step));
        }
    }
    return chain;
}

function getProm(i) {

    let srcSquare = squares[i[0]];
    let destSquare = squares[i[1]];

    return Promise.all([
        new Promise(resolve => {

            srcSquare.turn = destSquare.x > srcSquare.x ? 1 : -1;
            srcSquare.distance = Math.abs(destSquare.x - srcSquare.x);
            srcSquare.callback = resolve;
            srcSquare.drawSwap();

        }),
        new Promise(resolve => {

            destSquare.turn = srcSquare.x > destSquare.x ? 1 : -1;
            destSquare.distance = Math.abs(destSquare.x - srcSquare.x);
            destSquare.callback = resolve;
            destSquare.drawSwap();

        }),

    ]).then(() => new Promise(resolve => {
        initSquares(i[3], resolve);
    }));
}

function getPromShift(i) {
    let promises = [];

    promises.push(new Promise(resolve => {

        let srcSquare = squares[i[0]];
        let destSquare = squares[i[1]];

        srcSquare.turn = -1;
        srcSquare.distance = Math.abs(destSquare.x - srcSquare.x);
        srcSquare.callback = resolve;
        srcSquare.drawSwap();
    }));

    // for (let j = i[1]; j <= i[0]; j++) {
    //     promises.push(new Promise(resolve => {
    //         let square = squares[j];
    //         square.turn = 1;
    //         square.distance = Math.abs(square.x - squares[j + 1].x);
    //         square.callback = resolve;
    //         square.drawShift();
    //     }));
    // }

    return Promise.all(promises).then(() => new Promise(resolve => {
        initSquares(i[3], resolve);
    }));
}

function drawSquare(square, resolve) {
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

    if (resolve) {
        resolve()
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


function createRandomInput() {
    let randoms = [];
    for (let i = 0; i < 10; i++) {
        randoms.push(Math.floor(Math.random() * 100));
    }
    $('#numbers').val(randoms.join(','));
    initSquares();
}

function sort() {
    let numbers = $('#numbers').val();
    $.ajax({
        method: "POST",
        url: "/index/sort",
        data: {numbers: numbers, algorithmName: $('#dropdownButton').attr('value')}
    }).done(function (steps) {
        swap(steps);
    }).fail(function (exception) {
        console.log(exception);
    });
}

$().ready(function () {
    $('#sortingAlgorithms li').on('click', function () {
        $('#dropdownButton').text(($(this).text())).attr('value', $(this).attr('value'));
    });
});
