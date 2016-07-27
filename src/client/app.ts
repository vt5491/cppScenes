import {bootstrap} from 'angular2/platform/browser';
import {CppScenesApp} from './app/cpp-scenes';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

bootstrap(CppScenesApp, [HTTP_PROVIDERS]);
