
const tetrisStorage = storage('tetris');

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('next-brick');
const ctx2 = canvas2.getContext('2d');

const main = document.querySelector('.main')
const boardContainer = document.querySelector('.board-container');
const boardWrapper = document.querySelector('.board-wrapper');
const boardNav = document.querySelector('.board-nav');
const lineScore = document.querySelector('.line-score');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const overlay = document.querySelector('.overlay');
const gameInfo = document.querySelector('.game-info');
const fallAudio = document.querySelector('.fall-audio');
const clearAudio = document.querySelector('.clear-audio');
const successAudio = document.querySelector('.success-audio');
const gameoverAudio = document.querySelector('.gameover-audio');

const _ = null;
const ROW = 24;
const COL = 10;
const DOT_SIZE = Math.round(800 / ROW);
const GAME_HEIGHT = DOT_SIZE * ROW;
const GAME_WIDTH = DOT_SIZE * COL;

const GAME_FRAME = 40;
const GAME_BGCOLOR = '#212529';
const GAME_SPEED_DEFAULT = tetrisStorage.get('spped') || 500;

const Color = [
    '#0d6efd',
    '#198754',
    '#0dcaf0',
    '#ffc107',
    '#dc3545',
    '#6f42c1',
    '#fd7e14',
];

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const background = new Image();
background.src = './asset/img/bg.png';

document.addEventListener('DOMContentLoaded', function() {
    boardWrapper.style.bottom = DOT_SIZE * (ROW - 20) + 'px';
    main.style.position = 'relative';
    main.style.top = DOT_SIZE + 'px';
    gameInfo.style.width = Math.round(GAME_WIDTH * 0.66) + 'px';

})