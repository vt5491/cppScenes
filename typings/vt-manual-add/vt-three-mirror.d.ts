declare namespace THREE {
  export class Mirror extends Object3D{
    //constructor(name: string, times: any[], values: any[], interpolation: InterpolationModes);
    constructor(renderer: any, camera : any, options :any)

    material : any
    render()
    renderWithMirror(otherMirror : Mirror)
  }

  export class FBXLoader extends Object3D{
    constructor(loadingManager: THREE.LoadingManager)
  }

}
