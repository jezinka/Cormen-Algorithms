<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <asset:javascript src="main.js"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>

<canvas width='1500' height='200' id='canvas'>Your browser does not support canvas - go get Chrome!</canvas>

<div style="margin-left: 50px">
    <input type="button" value="Swap!" onclick="swap();"/>
</div>

<script type="text/javascript">
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let steps = ${steps};

    drawRectangles(${numbers});
</script>
</body>
</html>