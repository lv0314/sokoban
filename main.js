//---1단계: 지도 데이터 출력하기
//스테이지 모음
const Stage1 = `Stage 1
#####
#OoP#
#####`

const Stage2 = `Stage 2
  #######  
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #  
 ########  `

 const Stage3 = `Stage 3
 ###### 
#O    ##
# oPo  #
#     O#
 #    ##
  ####  `

  const Stage4 = `Stage 4
  ### ### 
 #   # O #
 #   o   #
 #  P o # 
 #     #  
  #  O#   
   ###    `

const Stage5 = `Stage 5
  ####  
  #OO#  
 ## O## 
 #  oO# 
## o  ##
#  #oo #
# P    #
########`

const stages = [Stage1, Stage2, Stage3, Stage4, Stage5]
let turns = 0;

 //이차원 배열 생성 함수
function create2DArray(rows, cols){
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++){
        arr[i] = new Array(cols);
    };
    return arr;
};

//줄바꿈 기준으로 잘라 새로운 배열에 넣고 반환
function splitMap(stage){
    const splitedMap = stage.split("\n");
    return splitedMap;
}

//기호를 저장값으로 치환하는 함수
function trans(arr){
    for (let i = 1; i <= 5; i++){
        eval("var transedArr"+i+"=[]");
    }
    for(let i = 0; i < arr.length; i++){
        transedArr1[i] = arr[i].replaceAll("#", 0)
    }
    for(let i = 0; i < arr.length; i++){
        transedArr2[i] = transedArr1[i].replaceAll("O", 1)
    }
    for(let i = 0; i < arr.length; i++){
        transedArr3[i] = transedArr2[i].replaceAll("o", 2)
    }
    for(let i = 0; i < arr.length; i++){
        transedArr4[i] = transedArr3[i].replaceAll("P", 3)
    }
    // for(let i = 0; i < arr.length; i++){
    //     transedArr5[i] = transedArr4[i].replaceAll("0", 5)
    // }
    return transedArr4;
}

//세로, 가로, 맵을 인자로 받아 틀에 맵 배열을 주입해서 배열을 반환하는 함수
function inject(height, width, map){
    let mold = create2DArray(height, width);
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            mold[i][j] = map[i][j];
        }
    }
    return mold;
}

function stage2DArray(splitedMap){
    //첫 줄 Stage 부분을 빼서 순수한 맵만 저장
    const pureMap = splitedMap.slice(1);
    const height = pureMap.length;
    const width = pureMap[0].length;

    const arr = inject(height, width, pureMap);
    return arr;
}

//조립 함수
function createMap(stage){
    const _2dArr = stage2DArray(trans(splitMap(stage)));
    return _2dArr
}

//이차원 배열을 돌면서 저장값의 총 개수 세는 함수
function counting(stage, num){
    const arr = createMap(stage);
    let count = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[0].length; j++){
            if(arr[i][j] == String(num)){
                count++;
            }
        }
    }
    return count;
}

//구멍의 개수 리턴
function countHole(stage){
    return counting(stage, 1)
}

//공의 개수 리턴
function countBall(stage){
    return counting(stage, 2)
}

//플레이어의 Y좌표 반환
function YPlayer(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[0].length; j++){
            if(arr[i][j] == '3'){
                return i+1;
            }
        }
    }
}

//플레이어의 X좌표 반환
function XPlayer(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[0].length; j++){
            if(arr[i][j] == '3'){
                return j+1;
            }
        }
    }
}

//스테이지 정보 출력 함수
function stageInfo(stage){
    const stg = createMap(stage)
    console.log(stage);
    console.log("\n");
    console.log("가로크기 :" + stg[0].length)
    console.log("세로크기 :" + stg.length)
    console.log("구멍의 수 :" + countHole(stage))
    console.log("공의 수 :" + countBall(stage))
    console.log("플레이어 위치 : (" + YPlayer(stg) + ", " + XPlayer(stg) + ")")
}

//버튼을 누르면 각 스테이지의 정보가 콘솔로 출력(1단계 사용)
// function btnStage1(){
//     const btnStg1 = document.getElementById("stg1");
//     btnStg1.addEventListener("click", function(){
//         stageInfo(Stage1);
//     })
// }
// function btnStage2(){
//     const btnStg2 = document.getElementById("stg2");
//     btnStg2.addEventListener("click", function(){
//         stageInfo(Stage2);
//     })
// }

// function addBtnOp(){
//     btnStage1();
//     btnStage2();
// }

// addBtnOp();

//---2단계: 플레이어 이동 구현하기
let currentMap = createMap(Stage2);

//맵 출력을 위헤 저장값을 기호로 다시 치횐하는 함수
function trans2(arr){
    for (let i = 1; i <= 5; i++){
        eval("var transedArr"+i+"=[]");
    }
    for(let i = 0; i < arr.length; i++){
        transedArr1[i] = arr[i].replaceAll(0, "#")
    }
    for(let i = 0; i < arr.length; i++){
        transedArr2[i] = transedArr1[i].replaceAll(1, "O")
    }
    for(let i = 0; i < arr.length; i++){
        transedArr3[i] = transedArr2[i].replaceAll(2, "o")
    }
    for(let i = 0; i < arr.length; i++){
        transedArr4[i] = transedArr3[i].replaceAll(3, "P")
    }
    for(let i = 0; i < arr.length; i++){
        transedArr5[i] = transedArr4[i].replaceAll(5, "0")
    }
    return transedArr5;
}

//현재 맵 정보를 불러와 깊은 복사한 뒤 기호로 치환하고 배열을 반환
function transback(){
    let copy = currentMap.map(function(val){
        return val.slice(); });
    let length = copy.length;
    for(let i = 0; i < length; i++){
        copy[i] = trans2(copy[i]);
     }
    return copy;
}

//현재 맵을 카피해 기호로 치환한 결과를 콘솔로 출력
function printCurrentMap(){
    let copiedMap = transback();
    for(let i = 0; i < copiedMap.length; i++){
       console.log(copiedMap[i].join(""));
    }
}

//프롬프트로 입력받아 기능 수행하는 함수
function inputMove(){
    let storage = prompt("이동하실 방향을 입력해 주세요(wasd, q=종료)")
    let direction = storage.split("")
    for(let i = 0; i < direction.length; i++){
        if(direction[i] == "w"){
            moveW();
            printCurrentMap();
        } else if(direction[i] == "a"){
            moveA();
            printCurrentMap();
        } else if(direction[i] == "s"){
            moveS();
            printCurrentMap();
        } else if(direction[i] == "d"){
            moveD();
            printCurrentMap();
        } else if(direction[i] == "q"){
            console.log("게임을 종료합니다.")
        } else {
            console.log(direction[i] + ": 올바른 값을 입력해주세요(wasd, q)")
        }
    }   
}

//y x 인덱스를 y2 x2 인덱스로 교환하는 함수
function swtIdx(yIdx, xIdx, y2Idx, x2Idx){
    let temp = currentMap[yIdx][xIdx];
    currentMap[yIdx][xIdx] = currentMap[y2Idx][x2Idx];
    currentMap[y2Idx][x2Idx] = temp;
}

//이동 함수
function moveW(){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[yIdx-1][xIdx] == " "){
        swtIdx(yIdx, xIdx, yIdx-1, xIdx);
        console.log("w: 위쪽으로 이동합니다.")
    } else {
        console.log("w: 해당 명령을 수행할 수 없습니다.")
    }
}
function moveA(){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[yIdx][xIdx-1] == " "){
        swtIdx(yIdx, xIdx, yIdx, xIdx-1);
        console.log("a: 왼쪽으로 이동합니다.")
    } else {
        console.log("a: 해당 명령을 수행할 수 없습니다.")
    }
}
function moveS(){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[yIdx+1][xIdx] == " "){
        swtIdx(yIdx, xIdx, yIdx+1, xIdx);
        console.log("s: 아래쪽으로 이동합니다.")
    } else {
        console.log("s: 해당 명령을 수행할 수 없습니다.")
    }
}
function moveD(){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[yIdx][xIdx+1] == " "){
        swtIdx(yIdx, xIdx, yIdx, xIdx+1);
        console.log("d: 오른쪽으로 이동합니다.")
    } else {
        console.log("d: 해당 명령을 수행할 수 없습니다.")
    }
}

//html 버튼에 기능 추가(2단계 사용)
// function btnMap(){
//     let btnMap = document.getElementById("map");
//     btnMap.addEventListener("click", printCurrentMap)
// }
// function btnMove(){
//     let btnMove = document.getElementById("move");
//     btnMove.addEventListener("click", inputMove);
// }
// function addBtnOp2(){
//     btnMap();
//     btnMove();
// }

// printCurrentMap();
// addBtnOp2();

//--3단계: 소코반 게임 완성하기

//지도파일 문자열로 읽는 함수
//구현 불가

//2단계에서 쓰인 이동 함수 중복된 부분을 함수로 구현
//가려는 방향에 공백이나 구멍(O)이 있을 경우
let holeStg = 0; //플레이어와 구멍이 겹치면 ++
function moveTo(y2Idx, x2Idx){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[y2Idx][x2Idx] == " "){
        if(holeStg == 1){
            currentMap[yIdx][xIdx] = "1";
            currentMap[y2Idx][x2Idx] = "3";
            holeStg--;
            return true;
        } else if (holeStg == 0) {
            swtIdx(yIdx, xIdx, y2Idx, x2Idx);
            return true;
        }
    } else if (currentMap[y2Idx][x2Idx] == "1"){
        currentMap[yIdx][xIdx] = " ";
        currentMap[y2Idx][x2Idx] = "3";
        holeStg++;
        return true;
    } else {
        return false;
    }
}
//가려는 방향에 공(o)이 있을경우
//y2Idx, x2Idx는 상자의 좌표/ y3Idx, x3Idx는 상자 한 칸 앞의 좌표
function nearBall(y2Idx, x2Idx, y3Idx, x3Idx){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[y2Idx][x2Idx] == "2"){
        if(currentMap[y3Idx][x3Idx] == " "){
            if(holeStg == 1){
                currentMap[yIdx][xIdx] = "1"
                currentMap[y2Idx][x2Idx] = "3"
                currentMap[y3Idx][x3Idx] = "2"
                holeStg--;
                return true;
            } else if(holeStg == 0){
                swtIdx(y2Idx, x2Idx, y3Idx, x3Idx);
                swtIdx(yIdx, xIdx, y2Idx, x2Idx);
                return true;
            }
        } else if(currentMap[y3Idx][x3Idx] == "1"){
            currentMap[y3Idx][x3Idx] ="5";
            currentMap[y2Idx][x2Idx] = "3";
            currentMap[yIdx][xIdx] = " ";
            return true;
        }
    } else {
        return false;
    }
}
//가려는 방향에 구멍에 들어간 공(0) 이 있을 경우
function near0(y2Idx, x2Idx, y3Idx, x3Idx){
    let yIdx = YPlayer(currentMap)-1;
    let xIdx= XPlayer(currentMap)-1;
    if(currentMap[y2Idx][x2Idx] == "5"){
        if(currentMap[y3Idx][x3Idx] == " "){
            if(holeStg == 1){
                currentMap[y3Idx][x3Idx] = "2";
                currentMap[y2Idx][x2Idx] = "3";
                currentMap[yIdx][xIdx] = "1";
                return true;
            } else if (holeStg == 0){
                currentMap[y3Idx][x3Idx] = "2";
                currentMap[y2Idx][x2Idx] = "3";
                currentMap[yIdx][xIdx] = " ";
                holeStg++;
                return true;
            }
        } else if(currentMap[y3Idx][x3Idx] == "1"){
            if(holeStg == 1){
                currentMap[y3Idx][x3Idx] = "5";
                currentMap[y2Idx][x2Idx] = "3";
                currentMap[yIdx][xIdx] = "1";
                return true;
            } else if (holeStg == 0){
                currentMap[y3Idx][x3Idx] = "5";
                currentMap[y2Idx][x2Idx] = "3";
                currentMap[yIdx][xIdx] = " ";
                holeStg++;
                return true;
            }
        }
    } else {
        return false;
    }
}

//이동함수 ver2
function moveW2(){
    if (moveTo(YPlayer(currentMap)-2, XPlayer(currentMap)-1)){
        console.log("w: 위쪽로 이동합니다.")
        printCurrentMap();
    } else if (nearBall(YPlayer(currentMap)-2, XPlayer(currentMap)-1, YPlayer(currentMap)-3, XPlayer(currentMap)-1)){
        console.log("w: 위쪽으로 이동합니다.")
        printCurrentMap();
    } else if(near0(YPlayer(currentMap)-2, XPlayer(currentMap)-1, YPlayer(currentMap)-3, XPlayer(currentMap)-1)){
        console.log("w: 위쪽으로 이동합니다.")
        printCurrentMap();
    } else {
        console.log("w: 해당 명령을 수행할 수 없습니다.")
    }
}
function moveA2(){
    if (moveTo(YPlayer(currentMap)-1, XPlayer(currentMap)-2)){
        console.log("a: 왼쪽으로 이동합니다.")
        printCurrentMap();
    } else if (nearBall(YPlayer(currentMap)-1, XPlayer(currentMap)-2, YPlayer(currentMap)-1, XPlayer(currentMap)-3)){
        console.log("a: 왼쪽으로 이동합니다.")
        printCurrentMap();
    } else if(near0(YPlayer(currentMap)-1, XPlayer(currentMap)-2, YPlayer(currentMap)-1, XPlayer(currentMap)-3)){
        console.log("a: 왼쪽으로 이동합니다.")
        printCurrentMap();
    } else {
        console.log("a: 해당 명령을 수행할 수 없습니다.")
    }
}
function moveS2(){
    if (moveTo(YPlayer(currentMap), XPlayer(currentMap)-1)){
        console.log("s: 아래쪽으로 이동합니다.")
        printCurrentMap();
    } else if (nearBall(YPlayer(currentMap), XPlayer(currentMap)-1, YPlayer(currentMap)+1, XPlayer(currentMap)-1)){
        console.log("s: 아래쪽으로 이동합니다.")
        printCurrentMap();
    } else if(near0(YPlayer(currentMap), XPlayer(currentMap)-1, YPlayer(currentMap)+1, XPlayer(currentMap)-1)){
        console.log("s: 아래쪽으로 이동합니다.")
        printCurrentMap();
    } else {
        console.log("s: 해당 명령을 수행할 수 없습니다.")
    }
}
function moveD2(){
    if (moveTo(YPlayer(currentMap)-1, XPlayer(currentMap))){
        console.log("d: 오른쪽으로 이동합니다.")
        printCurrentMap();
    } else if (nearBall(YPlayer(currentMap)-1, XPlayer(currentMap), YPlayer(currentMap)-1, XPlayer(currentMap)+1)){
        console.log("d: 오른쪽으로 이동합니다.")
        printCurrentMap();
    } else if(near0(YPlayer(currentMap)-1, XPlayer(currentMap), YPlayer(currentMap)-1, XPlayer(currentMap)+1)){
        console.log("d: 오른쪽으로 이동합니다.")
        printCurrentMap();
    } else {
        console.log("d: 해당 명령을 수행할 수 없습니다.")
    }
}

//프롬프트에 입력받아 이동을 수행하는 함수 ver2
function inputMove2(){
    let storage = prompt("이동하실 방향을 입력해 주세요(wasd, q=종료, r=초기화)")
    let direction = storage.split("")
    for(let i = 0; i < direction.length; i++){
        if(direction[i] == "w"){
            moveW2();
            turns++;
            check()
        } else if(direction[i] == "a"){
            moveA2();
            turns++;
            check()
        } else if(direction[i] == "s"){
            moveS2();
            turns++;
            check()
        } else if(direction[i] == "d"){
            moveD2();
            turns++;
            check()
        } else if(direction[i] == "q"){
            console.log("게임을 종료합니다.")
        } else if(direction[i] == "r"){
            console.log("스테이지를 초기화합니다.")
            turns = 0;
            start();
        } else {
            console.log(direction[i] + ": 올바른 값을 입력해주세요(wasd=이동, q=종료, r=초기화)")
        }
    }   
}

//진행 함수
//남아있는 공의 개수 세기
function countingBall(){
    const arr = currentMap;
    let count = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[0].length; j++){
            if(arr[i][j] == String(2)){
                count++;
            }
        }
    }
    return count;
}

//스테이지 체크용 변수. 클리어시 ++
let stageCheck = 1;
//남아있는 공의 개수가 0이면 클리어
function check(){
    if(countingBall() == 0){
        console.log("스테이지 " + stageCheck + " 클리어!");
        console.log("턴수 : " + turns)
        turns = 0;
        console.log("");
        stageCheck++;
        if (stageCheck == 6){
            console.log("모든 스테이지를 클리어하셨습니다!")
            console.log("축하 드립니다!")
            return;
        }
        start();
    }
}

//스테이지 체크의 정보를 받아와 해당 스테이지 실행
function start(){
    let stg = stageCheck;
    currentMap = createMap(stages[stg-1])
    console.log("Stage " + stg)
    printCurrentMap();
    inputMove2();
}

function btnactMove(){
    var btn = document.getElementById("actMove")
    btn.addEventListener("click", inputMove2)
}

function gameStart(){
    console.log("소코반 게임이 시작되었습니다.")
    start();
    btnactMove();
}

gameStart();

//--4단계: 추가 기능 구현하기
//저장하기 불러오기 기능
let saveslot = []
saveslot.length = 5;

function save(n){
    saveslot[n-1] = {
        map: currentMap,
        turn: turns,
        stagech: stageCheck,
        hole: holeStg
    }
}

function load(n){
    let save = saveslot[n-1]
    currentMap = save.map;
    turn = save.turn;
    stageCheck = save.stagech;
    holeStg = save.hole

    start();
}
