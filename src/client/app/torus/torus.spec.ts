import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Torus} from './torus';


describe('Torus Service', () => {

  beforeEachProviders(() => [Torus]);


  it('should ...', inject([Torus], (service: Torus) => {

  }));

});
