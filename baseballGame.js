<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        button {
            font-size: 20px;
            background-size: 10px;
        }

        div {
            text-align: center;
            margin: 20px;
        }

        #cnt {
            font-size: 20px;
        }

        h1 {
            text-align: center;
        }

        #result {
            color: red;
            font-weight: 900;
            font-size: 25px;
        }
    </style>
</head>

<body>
    <h1>
        <img src="https://t1.daumcdn.net/cfile/tistory/14189B4A50A48FB935" width="80" height="80"> 숫자 야구게임
        <img src="https://t1.daumcdn.net/cfile/tistory/14189B4A50A48FB935" width="80" height="80">
    </h1>
    <div>
        <button id="start" onclick="startGame()">Start Game</button>
    </div>
    <div>
        <button id="end" onclick="endGame()">Show Result</button>
        <button id="Reset" onclick="initHtml()">Reset</button>
    </div>
    <p id="cnt"></p>
    <p id="time"></p>
    <p id="result"></p>
    <script>
        //사용자로부터 숫자 받기
        var getUserNum = function () {
            var UserNum = [];
            var input = prompt("숫자를 입력해주세요. (1~9사이의 3개의 숫자 입력)");
            UserNum = (input.split(""));
            //사용자로부터 받은 string형 숫자를 number형 숫자로 바꾸기
            for (var i = 0; i < 3; i++) {
                UserNum.push(Number(UserNum.shift()));
            }
            return UserNum;
        }

        //상대방 숫자(컴퓨터 숫자) 생성
        var getComNum = function () {
            var ComNum = [];
            while (ComNum.length !== 3) {
                var randNum = Math.floor(Math.random() * 9) + 1;    //1~9의 난수 생성
                if (isOnlyNum(ComNum, randNum)) {
                    ComNum.push(randNum);
                }
            }
            return ComNum;
        }

        //난수 중복 체크(컴퓨터 숫자 중복 체크)
        var isOnlyNum = function (ComNum, randNum) {
            for (var i = 0; i < ComNum.length; i++) {
                if (ComNum[i] === randNum) return false;
            }
            return true;
        }

        //스트라이크 체크
        var checkStrikeNum = function (ComNum, UserNum) {
            var stk = 0;
            for (var i = 0; i < 3; i++) {
                if (ComNum[i] === UserNum[i]) {
                    stk++;
                }
            }
            return stk;
        }

        //볼 체크
        var checkBallNum = function (ComNum, UserNum) {
            var ball = 0;
            for (var i = 0; i < 3; i++) {
                if (ComNum.includes(UserNum[i]) && ComNum[i] !== UserNum[i]) {
                    ball++;
                }
            }
            return ball;
        }

        //결과 판정 및 출력
        var printResult = function (stk, ball) {
            if (stk === 0 && ball === 0) {
                window.alert("낫싱");
            } else if (stk !== 0 && ball === 0) {
                window.alert(stk + "스트라이크");
            } else if (stk === 0 && ball !== 0) {
                window.alert(ball + "볼");
            } else {
                window.alert(stk + "스트라이크 " + ball + "볼");
            }
        }

        //3스트라이크 여부 판정
        var isThreeStrike = function (stk) {
            if (stk === 3) return true;
            return false;
        }

        //시도 횟수 출력
        var printTryNum = function (StartCnt, TryCnt) {
            var PrintCnt = document.getElementById("cnt");
            var Output = document.createElement("p");
            Output.innerHTML = StartCnt + "번째 시도 횟수 : " + TryCnt + "회";
            PrintCnt.appendChild(Output);
        }

        //1회 게임
        var oneGame = function (TryCnt) {
            var ComNum = getComNum();
            console.log(ComNum);
            //3스트라이크가 나올 때까지 반복
            while (1) {
                var UserNum = getUserNum();
                TryCnt++;
                if (isNotRightUserNum(UserNum)) continue;
                var stk = checkStrikeNum(ComNum, UserNum);
                var ball = checkBallNum(ComNum, UserNum);
                printResult(stk, ball);
                if (isThreeStrike(stk)) break;
            }
            return TryCnt;
        }

        var StartCnt = 0;   //세트 횟수
        var SumTryCnt = []; //세트당 시도 횟수 저장 배열

        //게임 시작
        var startGame = function () {
            document.getElementById("result").innerHTML = "";
            var TryCnt = 0;
            TryCnt = oneGame(TryCnt);
            //checkTimer(0);
            StartCnt++;
            window.alert("3개의 숫자를 모두 맞히셨습니다!");
            //stopTimer(StartTimer);
            printTryNum(StartCnt, TryCnt);
            SumTryCnt.push(TryCnt);
        }

        //게임 종료
        var endGame = function () {
            var sum = 0;
            for (var i = 0; i < SumTryCnt.length; i++) {
                sum += SumTryCnt[i];
            }
            var avg = (sum / SumTryCnt.length);
            document.getElementById("result").innerHTML = "평균 시도 횟수 : " + avg.toFixed(1) + "회";
            console.log(avg.toFixed(1));
            StartCnt = 0;
        }

        //화면 초기화
        var initHtml = function () {
            document.getElementById("cnt").innerHTML = "";
            document.getElementById("result").innerHTML = "";
            StartCnt = 0;
            SumTryCnt = [];
        }

        //사용자 입력 예외 처리
        var isNotRightUserNum = function (UserNum) {
            if (checkNumberOfNum(UserNum) || checkDuplNum(UserNum)) {
                return true;
            } else {
                return false;
            }
        }

        //입력숫자 개수 체크
        var checkNumberOfNum = function (UserNum) {
            if (UserNum.length > 3) {
                window.alert("숫자 개수가 초과하였습니다. 다시 입력하세요.");
                return true;
            }
            if (UserNum.length < 3) {
                window.alert("숫자 개수가 부족합니다. 다시 입력하세요.");
                return true;
            }
        }

        //입력숫자 중복 체크
        var checkDuplNum = function (UserNum) {
            var SortUserNum = [];
            for (var i = 0; i < UserNum.length; i++) {
                SortUserNum.push(UserNum[i]);
            }
            SortUserNum.sort();
            for (var i = 0; i < SortUserNum.length - 1; i++) {
                if (SortUserNum[i] === SortUserNum[i + 1]) {
                    window.alert("중복된 숫자가 존재합니다. 다시 입력하세요.");
                    return true;
                }
            }
        }

        //시간 측정
        var checkTimer = function (time) {
            StartTimer = setInterval(function () {
                time++;
                document.getElementById("time").innerHTML = "걸린 시간 : " + time + "초";
                console.log(time);
            }, 1000);
        }

        //시간 종료
        var stopTimer = function () {
            clearInterval(StartTimer);
        }
    </script>
</body>

</html>
