import {Injectable} from 'angular2/core';


@Injectable()
export class VtDummy {

  msg : string
  msg2 : string = "hello2"
  msg3 : string

  constructor() {
    this.msg = "hello from VtDummy"
  }

  init () {
    console.log('VtDummy.init: entered')
    this.msg3 = "hello3"
  }


}
