/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbIconModule } from '../icon/icon.module';
import { NbToggleComponent } from './toggle.component';
var NbToggleModule = /** @class */ (function () {
    function NbToggleModule() {
    }
    NbToggleModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                NbIconModule,
            ],
            declarations: [NbToggleComponent],
            exports: [NbToggleComponent],
        })
    ], NbToggleModule);
    return NbToggleModule;
}());
export { NbToggleModule };
//# sourceMappingURL=toggle.module.js.map