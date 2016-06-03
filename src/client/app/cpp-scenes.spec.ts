import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {CppScenesApp} from '../app/cpp-scenes';

beforeEachProviders(() => [CppScenesApp]);

describe('App: CppScenes', () => {
  it('should have the `defaultMeaning` as 42', inject([CppScenesApp], (app: CppScenesApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([CppScenesApp], (app: CppScenesApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

