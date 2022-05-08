// shutter轉場
function shutter() {
    const table = document.querySelector('#tableShutter');
    let td = '';
    let tr = '';
    // let resulttr = '';
    let boxCount = 0;
    const rowNum = 4; //有幾行
    const boxNum = 5; //一行有幾個box

    for (let ii = 0; ii < rowNum; ii++) {
        td = '';
        for (let i = 0; i < boxNum; i++) {
            td += `<td class="colorbox${boxCount}"></td>`;
            boxCount++;
        };
        tr += `<tr>${td}</tr>`;
    };
    table.innerHTML = tr;
    console.log(boxCount);

    const htmlTd = [...document.querySelectorAll('td')];
    const domTd = htmlTd.slice();
    // console.log(domTd, domTd.constructor.name, tdTotal);
    let count = 0;


    const colorChange1 = () => {
        if (count < boxCount) {
            $(domTd[count]).css('background-color', `rgba(0, ${Math.floor(count / boxNum) * Math.floor(boxCount / rowNum)}, 0`);
            count++;

            setTimeout(colorChange1, 100);
        }
        else {
            count = 0;
            clearTimeout(colorChange1);
            stop(colorChange1);
            setTimeout(colorChange2, 1000);
        }
    };

    const colorChange2 = () => {
        $(sceenThree).css('display', 'none');
        document.querySelector('#bgi').append(mainChar);
        document.querySelector('#bosscharAll').style = 'display: block;';
        document.querySelector('#princesscharAll').style = 'display: block;';
        if (count < boxCount) {
            $(domTd[count]).css('background-color', `transparent`);
            count++;

            setTimeout(colorChange2, 100);
        }
        else {
            count = 0;
            clearTimeout(colorChange2);
            stop(colorChange2);
            startSceenThree();
            return;
        }
    };

    colorChange1();
};

// 第一幕-------------------------------------------------------------------------------------
//抓到slogan
const sloganOne = document.querySelector('#sloganOne').innerText;
const sloganTwo = document.querySelector('#sloganTwo').innerText;
//抓到要擺的位置
const showOne = document.querySelector('#showSloganOne');
const showTwo = document.querySelector('#showSloganTwo');
// 抓到按鈕 並記得初始化
const btnOne = document.querySelector('#btnOne');
btnOne.style = 'display: none';


//跑什麼包來著 讓字一個個出現
function startSceenOne() {
    console.log('第一幕開始');
    let i = 0;
    let ii = 0;
    function sOne() {
        if (i <= sloganOne.length) {
            showOne.innerHTML = sloganOne.substring(0, i);
            i++;
            setTimeout(sOne, 200);
            // console.log('h1');
        }
        if (i === sloganOne.length) {
            $(btnOne).one('click', sTwo);
            btnOne.style = 'display: block';
            // sTwo();
        }
        // console.log(i,'io');
    };
    function sTwo() {
        btnOne.style = 'display: none';
        $('#showSloganOne').remove();
        if (ii <= sloganTwo.length) {
            showTwo.innerHTML = sloganTwo.substring(0, ii);
            ii++;
            setTimeout(sTwo, 200);
            // console.log('h1');
        }
        if (ii === sloganTwo.length) {
            setTimeout(function () {
                $("#sceen_one").css('background-color', 'transparent');
                $('#showSloganTwo').css('color', 'transparent')
                $('#showSloganTwo').one('transitionend', function () {
                    startSceenTwo();
                    $('#showSloganTwo').remove();
                    $('#sceen_one').css('display', 'none');
                    console.log('第一幕結束');
                });
                // console.log('end');
            }, 1200);
        }
    }
    setTimeout(sOne, 200);
};


// 第二幕-----------------------------------------------------------------------------------
// 抓到主角div 抓到slogan3
const mainChar = document.querySelector('#mainChar');
const conversationElif = document.querySelector('#conversationElif');
const sloganThree = document.querySelector('#sloganThree').innerText;
//會跑動的背景 龍
const sceenThree = document.querySelector('.sceen_three');
const threeTrain = document.querySelector('#sceenThreeBgtrain');
const dragon = document.querySelector('#bosschar');
const conversationDragon = document.querySelector('#bosschar > .conver_box');
const conversationPrincess = document.querySelector('#princesschar > .conver_box');

// 抓到要擺的位置
const showThree = document.querySelector('#showSloganThree');

// 第二幕啟動func
function startSceenTwo() {
    console.log('第二幕開始');
    // 初始化
    $(conversationElif).css('display', 'none');
    // 主角出現
    mainChar.style = 'transform: translateX(0%)';
    $(mainChar).one('transitionend', sThree);

    // sloganthree出現 文字
    let i = 0;
    function sThree() {
        if (i <= sloganThree.length) {
            showThree.innerHTML = sloganThree.substring(0, i);
            i++;
            setTimeout(sThree, 200);
            // console.log('h1');
        }
        if (i === sloganThree.length) {
            setTimeout(function () {
                showThree.style = 'transition: 2s; opacity: 0;';
                $(showThree).one('transitionend', sFour);
            }, 300)
            // $(btnOne).one('click', sTwo);
            // btnOne.style = 'display: block';
            // sTwo();
        }
        // console.log(i,'io');
    };

    // sloganfour出現 出發去救公主
    function sFour() {
        // console.log('4start!');
        $(conversationElif).css('display', 'flex');

        let opaci = 1;
        let r = 0;
        function opaciNum() {
            console.log(r);
            if (r > 0) {
                return;
            }
            opaci = (opaci > 0) ? 0 : 1;
            // console.log(opaci);
            $(conversationElif).css('opacity', `${opaci}`);
            setTimeout(opaciNum, 500);
        };
        setTimeout(opaciNum, 2000);
        setTimeout(sFive, 500);

        function sFive() {
            let rr = 0
            $('#sceen_two').css('display', 'none');
            // $(conversationElif).css('display', 'none');
            // window.removeEventListener('keydown', run);
            window.addEventListener('keydown', run);
            function run() {
                $(conversationElif).find('p:first').css('display', 'none');
                console.log('running', r);
                r++;
                $(threeTrain).css('transform', `translateX(-${r}%)`);
                if (r === 1) {
                    $(conversationElif).css('display', 'none');
                }

                if (r === 5) {
                    $(conversationElif).css('opacity', '1');
                    $(conversationElif).css('display', 'block');
                    $(conversationElif).find('#sloganFive').css('display', 'block');
                }
                if (r === 30) {
                    $(conversationElif).css('display', 'none');
                    $(conversationElif).find('#sloganFive').css('display', 'none');
                }
                if (r === 40) {
                    $(conversationElif).css('display', 'block');
                    $(conversationElif).find('#sloganSix').css('display', 'block');
                }
                if (r === 65) {
                    $(conversationElif).css('display', 'none');
                    $(conversationElif).find('#sloganSix').css('display', 'none');
                }
                if (r === 90) {
                    $(conversationElif).css('display', 'block');
                    $(conversationElif).find('#sloganSeven').css('display', 'block');
                }
                if (r === 120) {
                    $(conversationElif).css('display', 'none');
                    $(conversationElif).find('#sloganSeven').css('display', 'none');
                }
                if (r === 140) {
                    $(conversationElif).css('display', 'block');
                    $(conversationElif).find('#sloganEight').css('display', 'block');
                }
                if (r === 170) {
                    $(conversationElif).css('display', 'none');
                    $(conversationElif).find('#sloganEight').css('display', 'none');
                    let opaciP = 1;
                    function opaciNumP() {
                        if (rr === 1) {
                            return;
                        };
                        opaciP = (opaciP > 0) ? 0 : 1;
                        // console.log(opaci);
                        $(conversationPrincess).css('opacity', `${opaciP}`);
                        setTimeout(opaciNumP, 500);
                    };
                    opaciNumP();
                }
                if (r === 198) {
                    $(conversationElif).css('display', 'block');
                    $(conversationElif).find('#sloganNine').css('display', 'block');
                }

                if (r === 199) {
                    $('.elif img').css('animation-name', 'shock');
                    $('.elif img').one('animationend', function () {
                        $('.elif img').css('animation-name', 'unset');
                        $(conversationElif).css('display', 'none');
                        $(conversationElif).find('#sloganNine').css('display', 'none');
                    });
                }

                // 停止跑步
                if (r > 200) {
                    window.removeEventListener('keydown', run);
                    setTimeout(() => {
                        $(conversationDragon).css('display', 'block');
                        $(conversationDragon).find('#sloganTen').css('display', 'block');
                        setTimeout(() => {
                            $(conversationDragon).css('display', 'none');
                            $(conversationDragon).find('#sloganTen').css('display', 'none');
                            $(conversationDragon).css('display', 'block');
                            $(conversationDragon).find('#sloganTenone').css('display', 'block');
                            setTimeout(() => {
                                setTimeout(shutter, 2000);
                                sceenThree.append(mainChar);
                                $(sceenThree).css('animation-name', 'intofight');
                                $(sceenThree).one('animationend', function () {
                                    $(conversationDragon).css('display', 'none');
                                    $(conversationDragon).find('#sloganTenone').css('display', 'none');
                                    $(conversationPrincess).css('display', 'none');
                                    rr = 1;
                                });
                            }, 2000);
                        }, 2000);
                    }, 500);
                }
            }
        };
    };
};


//第三幕----------------------------------------------------------------------------------------
//抓到slogan
const sloganTentwo = document.querySelector('#sloganTentwo').innerText;
const sloganTenthree = document.querySelector('#sloganTenthree').innerText;
//抓到要擺的位置
const showTentwo = document.querySelector('#showSloganTentwo');
const showTenthree = document.querySelector('#showSloganTenthree');
const showTenfour = document.querySelector('#showSloganTenfour');
// 抓到主角和龍的offset;
let elifOffsetLeft;
let elifOffsetTop;
let dragonOffsetLeft;
let dragonOffsetTop;
let dragonHeight;
let dragonWidth;
let elifHeight;
let elifWidth;


//戰鬥前說明
function startSceenThree() {
    $('#sceen_four').css('display', 'flex');
    console.log('第三幕開始 戰鬥');
    let i = 0;
    let ii = 0;
    function sOne() {
        if (i == 0) {
            $(showTentwo).css('display', 'block');
        };
        if (i <= sloganTentwo.length) {
            showTentwo.innerHTML = sloganTentwo.substring(0, i);
            i++;
            setTimeout(sOne, 200);
            // console.log('h1');
        };
        if (i === sloganTentwo.length) {
            $('#btnTwo').one('click', sTwo);
            $('#btnTwo').css('display', 'block');
        };
    };
    function sTwo() {
        $('#showSloganTentwo').remove();
        $('#btnTwo').css('display', 'none');
        $('#sloganBtnOne').css('display', 'none');
        $(showTenthree).css('display', 'block');

        setTimeout(function () {
            $(showTenthree).css('display', 'none');
            $('#heart').css('display', 'flex');
            startFight();

        }, 1000);

    }
    setTimeout(sOne, 200);
};

//開始戰鬥
function startFight() {
    const bossBox = document.querySelector('.fightbox_boss');
    const elifBox = document.querySelector('.fightbox_elif');
    const bossQ = document.createElement('p');
    const elifA = document.createElement('p');
    const elifB = document.createElement('p');
    const elifC = document.createElement('p');
    const fireball = document.querySelector('#fireball');
    let qustNum = 1;
    let bossQone;
    let elifAone;
    let elifBone;
    let elifCone;
    let bosstalkOne;
    let bosstalkP;

    function questionOne() {
        $(bossBox).css('opacity', '1');
        bossQone = document.createTextNode('問題一：xxxxx?');
        bossQ.append(bossQone);
        bossBox.append(bossQ);
        setTimeout(answerOne, 1000);
    };
    function answerOne() {
        $(elifBox).css('opacity', '1');
        elifAone = document.createTextNode('A. xxxxxx');
        elifA.append(elifAone);
        elifBone = document.createTextNode('B. xxxxxx');
        elifB.append(elifBone);
        elifCone = document.createTextNode('C. xxxxxx');
        elifC.append(elifCone);


        elifBox.append(elifA);
        elifBox.append(elifB);
        elifBox.append(elifC);
        $('.fightbox_elif p').one('click', attack);
    };
    function attack() {
        console.log('attack!!!');
        $('.fightbox_elif p').off('click', attack);
        $(elifBox).css('transition', '.5s').css('opacity', '0').one('transitionend', function () {
            document.querySelector('.fightbox_elif p').remove();
            $(showTenfour).css('display', 'block');
            bossQone.remove();
            elifAone.remove();
            elifBone.remove();
            elifCone.remove();
            setTimeout(shotFireball, 500);
        });
        $(bossBox).css('transition', '.3s').css('opacity', '0').one('transitionend', function () {
            document.querySelector('.fightbox_boss p').remove();
        });
    };
    function shotFireball() {
        $(showTenfour).css('display', 'none');
        dragonOffsetLeft = $('#bosscharAll > img').offset().left;
        dragonOffsetTop = $('#bosscharAll > img').offset().top;
        elifOffsetLeft = $('#mainChar > img').offset().left;
        elifOffsetTop = $('#mainChar > img').offset().top;
        dragonWidth = $('#bosscharAll > img').width();
        dragonHeight = $('#bosscharAll > img').height();
        elifWidth = $('#mainChar > img').width();
        elifHeight = $('#mainChar > img').height();

        console.log('fire!!!', dragonOffsetLeft, dragonOffsetTop, elifOffsetLeft, elifOffsetTop, dragonWidth, dragonHeight, elifWidth, elifHeight);
        $(fireball).css('top', `${elifOffsetTop + (elifHeight / 2)}px`);
        $(fireball).css('left', `${elifOffsetLeft + (elifWidth / 2)}px`);
        $(fireball).css('display', 'flex');
        $('#bosscharAll').one('animationend', function () {
            console.log('shotfire3');
            $(`#heart img:nth-child(${qustNum})`).css('opacity', '0');
            $('#bosscharAll').css('animation-name', 'unset');
            qustNum++;
            bosstalk();
        });
        $('#mainChar').one('animationend', function () {
            console.log('shotfire4');
            $('#mainChar').css('animation-name', 'unset');
        });
        $(fireball).one('transitionend', function () {
            console.log('shotfire2');
            $('#bosscharAll').css('animation-name', 'beenhit');
            $(fireball).css('display', 'none');
            $(fireball).css('transform', 'translate(0, 0)');
        });
        setTimeout(function () {
            $(fireball).css('transform', `translate(${(dragonOffsetLeft + dragonWidth / 5) - (elifOffsetLeft + elifWidth / 2)}px, ${(dragonOffsetTop + dragonHeight / 2) - (elifOffsetTop + elifHeight / 2)}px)`);
            $('#mainChar').css('animation-name', 'shotfire');
            console.log('shotfire1');
        }, 50);
    };
    function bosstalk() {
        bosstalkOne = document.createTextNode('不錯嘛，那這招呢？');
        bosstalkP = document.createElement('p');
        bosstalkP.append(bosstalkOne);
        document.querySelector('#bosscharAll .conver_sation').append(bosstalkP);
        // $('#bosscharAll .conver_sation').css('display', 'flex');
        $('#bosscharAll .conver_box').css('display', 'flex');
        setTimeout(function () {
            $('#bosscharAll .conver_box').css('display', 'none');
            $('#bosscharAll .conver_box p').remove();
            bosstalkOne.remove();
            bosstalkP.remove();
        }, 1800);
        setTimeout(questionOne, 2000);
    };
    questionOne();
};







// start game -----------------------------------------------------------------------
// TODO: 修開始戰鬥時的爆版 修愛心zindex！！！
window.addEventListener('load', startSceenOne);

//單獨測試第二幕出場
// startSceenTwo();
        //單獨測試第二幕有路的部分
        // sFive();