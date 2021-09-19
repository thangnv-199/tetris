
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
const overlay = document.querySelector('.overlay');
const gameInfo = document.querySelector('.game-info');

const _ = null;
const ROW = 24;
const COL = 10;
const DOT_SIZE = Math.round(window.innerHeight / ROW);
const GAME_HEIGHT = DOT_SIZE * ROW;
const GAME_WIDTH = DOT_SIZE * COL;

const GAME_FRAME = 40;
const GAME_BGCOLOR = '#212529';
const GAME_SPEED_DEFAULT = 500;

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

ctx.fillStyle = GAME_BGCOLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.addEventListener('DOMContentLoaded', function() {
    boardWrapper.style.bottom = DOT_SIZE * (ROW - 20) + 'px';
    main.style.position = 'relative';
    main.style.top = DOT_SIZE * (ROW - 20) / 2 + 'px';
    gameInfo.style.width = Math.round(GAME_WIDTH * 0.66) + 'px';
})