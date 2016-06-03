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
import {SphereScene} from './sphere-scene';


describe('SphereScene Service', () => {

  beforeEachProviders(() => [SphereScene]);


  it('should ...', inject([SphereScene], (service: SphereScene) => {

  }));

});
