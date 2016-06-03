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
import {VtDummy} from './vt-dummy';


describe('VtDummy Service', () => {

  beforeEachProviders(() => [VtDummy]);


  it('should ...', inject([VtDummy], (service: VtDummy) => {

  }));

});
