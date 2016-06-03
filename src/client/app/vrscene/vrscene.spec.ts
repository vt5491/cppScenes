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
import {VRScene} from './vrscene';
import PerspectiveCamera = THREE.PerspectiveCamera;
import Object3D = THREE.Object3D;
import {VRRenderer} from '../vrrenderer/vrrenderer'

describe('VRScene Service', () => {

  beforeEachProviders(() => [VRScene, VRRenderer]);


  it('doIt works', inject([VRScene], (service: VRScene) => {
    //console.log('vrScene=' + vrScene)
    expect(service.doIt()).toEqual('hello from VRScene')
  }));

  // it('initScene works', inject([VRScene, VRRenderer], (vrScene: VRScene, vrRenderer: VRRenderer) => {
  //   vrScene.initScene(100, 100, vrRenderer)
  //   console.log("ut: initScene: vrScene.camera=" + vrScene.camera)
  //   expect(vrScene.camera).toBeAnInstanceOf(PerspectiveCamera)
  //   expect(vrScene.dolly).toBeAnInstanceOf(Object3D)
  // }));
});
