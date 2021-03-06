/*
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Input, Output, QueryList, PLATFORM_ID, Inject, ElementRef, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge } from 'rxjs';
import { filter, switchMap, take, takeUntil, takeWhile } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NB_DOCUMENT } from '../../theme.options';
import { NbRadioComponent } from './radio.component';
/**
 * The `NbRadioGroupComponent` is the wrapper for `nb-radio` button.
 * It provides form bindings:
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Also, you can use `value` and `valueChange` for binding without forms.
 *
 * ```html
 * <nb-radio-group [(value)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Radio items name has to be provided through `name` input property of the radio group.
 *
 * ```html
 * <nb-radio-group name="my-radio-group">
 *   ...
 * </nb-radio-group>
 * ```
 *
 * You can change radio group status by setting `status` input.
 * @stacked-example(Statuses, radio/radio-statuses.component)
 *
 * Also, you can disable the whole group using `disabled` attribute.
 * @stacked-example(Disabled group, radio/radio-disabled-group.component)
 *
 * */
var NbRadioGroupComponent = /** @class */ (function () {
    function NbRadioGroupComponent(hostElement, platformId, document) {
        this.hostElement = hostElement;
        this.platformId = platformId;
        this.document = document;
        this.alive = true;
        this.isTouched = false;
        this.onChange = function (value) { };
        this.onTouched = function () { };
        this._status = '';
        this.valueChange = new EventEmitter();
    }
    NbRadioGroupComponent_1 = NbRadioGroupComponent;
    Object.defineProperty(NbRadioGroupComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.updateValues();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioGroupComponent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
            this.updateNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioGroupComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = convertToBoolProperty(disabled);
            this.updateDisabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioGroupComponent.prototype, "status", {
        /**
         * Radio buttons status.
         * Possible values are `primary` (default), `success`, `warning`, `danger`, `info`.
         */
        get: function () {
            return this._status;
        },
        set: function (value) {
            if (this._status !== value) {
                this._status = value;
                this.updateStatus();
            }
        },
        enumerable: true,
        configurable: true
    });
    NbRadioGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // In case option 'name' isn't set on nb-radio component,
        // we need to set it's name right away, so it won't overlap with options
        // without names from other radio groups. Otherwise they all would have
        // same name and will be considered as options from one group so only the
        // last option will stay selected.
        this.updateNames();
        Promise.resolve().then(function () { return _this.updateAndSubscribeToRadios(); });
        this.radios.changes
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () {
            // 'changes' emit during change detection run and we can't update
            // option properties right of since they already was initialized.
            // Instead we schedule microtask to update radios after change detection
            // run is finished.
            Promise.resolve().then(function () { return _this.updateAndSubscribeToRadios(); });
        });
    };
    NbRadioGroupComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbRadioGroupComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbRadioGroupComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbRadioGroupComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (typeof value !== 'undefined') {
            this.updateValues();
        }
    };
    NbRadioGroupComponent.prototype.updateAndSubscribeToRadios = function () {
        this.updateNames();
        this.updateValues();
        this.updateDisabled();
        this.updateStatus();
        this.subscribeOnRadiosValueChange();
        this.subscribeOnRadiosBlur();
    };
    NbRadioGroupComponent.prototype.updateNames = function () {
        var _this = this;
        if (this.radios) {
            this.radios.forEach(function (radio) { return radio.name = _this.name; });
        }
    };
    NbRadioGroupComponent.prototype.updateValues = function () {
        var _this = this;
        if (this.radios && typeof this.value !== 'undefined') {
            this.radios.forEach(function (radio) { return radio.checked = radio.value === _this.value; });
        }
    };
    NbRadioGroupComponent.prototype.updateDisabled = function () {
        var _this = this;
        if (this.radios && typeof this.disabled !== 'undefined') {
            this.radios.forEach(function (radio) { return radio.disabled = _this.disabled; });
        }
    };
    NbRadioGroupComponent.prototype.subscribeOnRadiosValueChange = function () {
        var _this = this;
        if (!this.radios || !this.radios.length) {
            return;
        }
        merge.apply(void 0, this.radios.map(function (radio) { return radio.valueChange; })).pipe(takeWhile(function () { return _this.alive; }), takeUntil(this.radios.changes))
            .subscribe(function (value) {
            _this.writeValue(value);
            _this.propagateValue(value);
        });
    };
    NbRadioGroupComponent.prototype.propagateValue = function (value) {
        this.valueChange.emit(value);
        this.onChange(value);
    };
    NbRadioGroupComponent.prototype.subscribeOnRadiosBlur = function () {
        var _this = this;
        var hasNoRadios = !this.radios || !this.radios.length;
        if (!isPlatformBrowser(this.platformId) || this.isTouched || hasNoRadios) {
            return;
        }
        var hostElement = this.hostElement.nativeElement;
        fromEvent(hostElement, 'focusin')
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (event) { return hostElement.contains(event.target); }), switchMap(function () { return merge(fromEvent(_this.document, 'focusin'), fromEvent(_this.document, 'click')); }), filter(function (event) { return !hostElement.contains(event.target); }), take(1), takeUntil(this.radios.changes))
            .subscribe(function () { return _this.markTouched(); });
    };
    NbRadioGroupComponent.prototype.markTouched = function () {
        this.isTouched = true;
        this.onTouched();
    };
    NbRadioGroupComponent.prototype.updateStatus = function () {
        var _this = this;
        if (this.radios) {
            this.radios.forEach(function (radio) { return radio.status = _this.status; });
        }
    };
    var NbRadioGroupComponent_1;
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NbRadioGroupComponent.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NbRadioGroupComponent.prototype, "name", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbRadioGroupComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NbRadioGroupComponent.prototype, "status", null);
    __decorate([
        ContentChildren(NbRadioComponent, { descendants: true }),
        __metadata("design:type", QueryList)
    ], NbRadioGroupComponent.prototype, "radios", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NbRadioGroupComponent.prototype, "valueChange", void 0);
    NbRadioGroupComponent = NbRadioGroupComponent_1 = __decorate([
        Component({
            selector: 'nb-radio-group',
            template: "\n    <ng-content select=\"nb-radio\"></ng-content>",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NbRadioGroupComponent_1; }),
                    multi: true,
                },
            ],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Inject(PLATFORM_ID)),
        __param(2, Inject(NB_DOCUMENT)),
        __metadata("design:paramtypes", [ElementRef, Object, Object])
    ], NbRadioGroupComponent);
    return NbRadioGroupComponent;
}());
export { NbRadioGroupComponent };
//# sourceMappingURL=radio-group.component.js.map