process.env.TZ ='UCT'
require('dotenv').config();
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;