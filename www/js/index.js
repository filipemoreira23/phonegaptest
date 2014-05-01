/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    }
};

$(document).ready(function() {
    var table = $("#main");
    var gameTimePanel = $("#gameTime");
    var watTimePanel = $("#watTime");
    var scorePanel = $("#score");
    var failPanel = $("#fail");

    var colors = ["r","g","b","y"];

    var gameTime = 10;
    var watTime = 1000;
    var score = 0;
    var fail = 0;

    var gameTimeInterval;
    var watTimeInterval;

    var hit = false;

    var wat;

    gameTimeInterval = setInterval(function(){
        gameTime--;
        updateGameTime();
        if(gameTime<=0)
            endgame();
    },1000);

    watTimeInterval = setInterval(function(){
        createWat();
    },watTime);

    function createWat(){
        $(".wat").remove();
        var color = randomColor();
        wat = $("<div/>",{
            id: color
        }).addClass("wat");
        table.append(wat);
    }

    function randomColor(){
        var index = Math.floor((Math.random() * 4));
        return colors[index];
    }

    function updateGameTime(){
        gameTimePanel.text(gameTime);
    }

    function updateScore(){
        scorePanel.text(score);
    }

    function updateFail(){
        failPanel.text(fail);
    }

    function updateAll(){
        updateGameTime();
        updateScore();
        updateFail();
    }

    function checkFail(){
        if(fail >= 3){
            endgame();
        }
    }

    function endgame(){
        clearInterval(gameTimeInterval);
        clearInterval(watTimeInterval);
        alert("Fim de jogo!");
        location.reload();
    }

    $$(document).swipeLeft(function(){
        if(wat.attr("id")=="y"){
            score++;
            gameTime+=2;
            hit = true;
        }else{
            fail++;
        }
        wat.animate({left: "7%"},50);
        wat.fadeOut(200);
        hit();
    });

    $$(document).swipeUp(function(){
        if(wat.attr("id")=="r"){
            score++;
            gameTime+=2;
            hit = true;
        }else{
            fail++;
        }
        wat.animate({top: "7%"},50);            
        wat.fadeOut(200);
        hit();
    });

    $$(document).swipeRight(function(){
        if(wat.attr("id")=="g"){
            score++;
            gameTime+=2;
            hit = true;
        }else{
            fail++;
        }
        wat.animate({left: "93%"},50);          
        wat.fadeOut(200);
        hit();
    });

    $$(document).swipeDown(function(){
        if(wat.attr("id")=="b"){
            score++;
            gameTime+=2;
            hit = true;
        }else{
            fail++;
        }
        wat.animate({top: "93%"},50);           
        wat.fadeOut(200);
        hit();
    });

    function hit(){
        if(hit){
            if(watTime>300){
                watTime-=(score/2);
                clearInterval(watTimeInterval);
                watTimeInterval = setInterval(function(){
                    createWat();
                },watTime);
            }
            hit = false;
        }
        updateAll();
        checkFail();
    }
});
