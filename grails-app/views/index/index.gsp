<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <asset:stylesheet src="application.css"/>
    <asset:javascript src="application.js"/>
</head>

<body>

<div class="row">
    <canvas width="1000" height="100" id='canvas'>
        Your browser does not support canvas - go get Chrome!
    </canvas>
</div>

<div class="row">
    <div class="col-lg-6">
        <div class="input-group">
            <div class="input-group-btn">
                <button id="dropdownButton" type="button" class="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false" value="bubbleSort">
                    Bubble Sort <span class="caret"></span>
                </button>
                <ul id="sortingAlgorithms" class="dropdown-menu">
                    <li value="bubbleSort"><a href="#">Bubble Sort</a></li>
                    <li value="selectionSort"><a href="#">Selection Sort</a></li>
                    <li value="quickSort"><a href="#">Quick Sort</a></li>
                    %{--<li value="insertionSort"><a href="#">Insertion Sort</a></li>--}%
                </ul>
            </div>

            <input id="numbers" class="form-control" placeholder="Liczby do posortowania">

            <div class="input-group-btn">
                %{--<button class="btn btn-default" type="button" onclick="initSquares()">Odśwież!</button>--}%
                <button class="btn btn-default" type="button" onclick="createRandomInput()">Wylosuj!</button>
                <button class="btn btn-default" type="button" onclick="sort()">Go!</button>
            </div>

        </div>

    </div>
</div>

<script type="text/javascript">
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let squares = [];
    let speed = 5;
</script>
</body>
</html>