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
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NbSharedModule } from '../shared/shared.module';
import { NbButtonModule } from '../button/button.module';
import { NbIconModule } from '../icon/icon.module';
import { NbCalendarMonthModelService } from './services/calendar-month-model.service';
import { NbDateService } from './services/date.service';
import { NbCalendarDayCellComponent } from './components/calendar-day-picker/calendar-day-cell.component';
import { NbCalendarDayPickerComponent } from './components/calendar-day-picker/calendar-day-picker.component';
import { NbCalendarDaysNamesComponent } from './components/calendar-days-names/calendar-days-names.component';
import { NbCalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { NbCalendarMonthCellComponent } from './components/calendar-month-picker/calendar-month-cell.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';
import { NbCalendarPageableNavigationComponent, } from './components/calendar-navigation/calendar-pageable-navigation.component';
import { NbCalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { NbCalendarPickerRowComponent } from './components/calendar-picker/calendar-picker-row.component';
import { NbCalendarYearCellComponent } from './components/calendar-year-picker/calendar-year-cell.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarWeekNumberComponent } from './components/calendar-week-number/nb-calendar-week-number.component';
import { NbNativeDateService } from './services/native-date.service';
var SERVICES = [
    { provide: NbDateService, useClass: NbNativeDateService },
    DatePipe,
    NbCalendarMonthModelService,
];
var COMPONENTS = [
    NbCalendarHeaderComponent,
    NbCalendarNavigationComponent,
    NbCalendarPageableNavigationComponent,
    NbCalendarDaysNamesComponent,
    NbCalendarYearPickerComponent,
    NbCalendarMonthPickerComponent,
    NbCalendarDayPickerComponent,
    NbCalendarDayCellComponent,
    NbCalendarMonthCellComponent,
    NbCalendarYearCellComponent,
    NbCalendarPickerRowComponent,
    NbCalendarPickerComponent,
    NbCalendarWeekNumberComponent,
];
/**
 * `NbCalendarKitModule` is a module that contains multiple useful components for building custom calendars.
 * So if you think our calendars is not enough powerful for you just use calendar-kit and build your own calendar!
 *
 * Available components:
 * - `NbCalendarDayPicker`
 * - `NbCalendarDayCell`
 * - `NbCalendarMonthPicker`
 * - `NbCalendarMonthCell`
 * - `NbCalendarYearPicker`
 * - `NbCalendarYearCell`
 * - `NbCalendarHeader`
 * - `NbCalendarNavigation`
 * - `NbCalendarPageableNavigation`
 *
 * For example you can easily build full calendar:
 * @stacked-example(Full calendar, calendar-kit/calendar-kit-full-calendar.component)
 * */
var NbCalendarKitModule = /** @class */ (function () {
    function NbCalendarKitModule() {
    }
    NbCalendarKitModule = __decorate([
        NgModule({
            imports: [NbSharedModule, NbButtonModule, NbIconModule],
            exports: COMPONENTS.slice(),
            declarations: COMPONENTS.slice(),
            providers: SERVICES.slice(),
            entryComponents: [
                NbCalendarDayCellComponent,
                NbCalendarMonthCellComponent,
                NbCalendarYearCellComponent,
            ],
        })
    ], NbCalendarKitModule);
    return NbCalendarKitModule;
}());
export { NbCalendarKitModule };
//# sourceMappingURL=calendar-kit.module.js.map