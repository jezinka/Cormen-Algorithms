<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <asset:stylesheet src="application.css"/>
    <asset:stylesheet src="bootstrap.css"/>
    <asset:javascript src="main.js"/>
    <asset:javascript src="jquery-2.2.0.min.js"/>
    <asset:javascript src="bootstrap.js"/>
    <asset:javascript src="application.js"/>
</head>

<body>

<div class="row">
    <canvas class="col-xs-offset-1" width="1000" height="100" id='canvas'>
        Your browser does not support canvas - go get Chrome!
    </canvas>
</div>

<div class="row">
    <div class="col-xs-offset-1 btn-group btn-group-sm" role="group">
        <div class="btn-group col-lg-7" role="group">
            <div class="input-group">
                <input id="numbers" class="form-control" placeholder="Liczby do posortowania">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" onclick="createRandomInput()">Wylosuj!</button>
                </span>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" onclick="sort()">Go!</button>
                </span>
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