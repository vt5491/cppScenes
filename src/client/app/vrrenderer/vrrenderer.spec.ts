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
import {VRRenderer} from './vrrenderer';


describe('VRRenderer Service', () => {

  beforeEachProviders(() => [VRRenderer]);


  iit('should ...', inject([VRRenderer], (service: VRRenderer) => {
  }));

});
