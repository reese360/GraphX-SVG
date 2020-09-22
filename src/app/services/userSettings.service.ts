import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    // stroke option settings
    strokeColor = '#000000';
    strokeOpacity = '1';
    strokeWidth = '2';
    strokeDashArray = '0';
    strokeType = 0; // solid
    shapeRender = 0; // auto

    // fill option settings
    fillType = 0; // solid
    fillOpacity = '1';
    fillColor = '#ffffff';
}