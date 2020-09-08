import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'app-gridlines',
    templateUrl: './gridlines.component.html',
    styleUrls: ['./gridlines.component.css'],
})
export class GridlinesMenuItemComponent implements OnInit {
    gridDisplayLabel: string = 'Show Grid'
    gridDisplayOptions: string[] = ['On', 'Off'];
    gridDisplayDefault: number = 1;

    snapGridLabel: string = 'Snap to Grid';
    snapGridOptions: string[] = ['On', 'Off'];
    snapGridDefault: number = 1;

    gridWidthLabel: string = "Grid Width";
    gridWidthMin: number = 5;
    gridWidthMax: number = 100;
    gridWidthStep: number = 5;
    gridWidthStartVal: number = 25;

    gridHeightLabel: string = "Grid Height";
    gridHeightMin: number = 5;
    gridHeightMax: number = 100;
    gridHeightStep: number = 5;
    gridHeightStartVal: number = 25;

    constructor() {}

    ngOnInit(): void {}

    toggleGridLines(val): void {
        console.log(val);
    }

    toggleSnapGrid(val): void {
        console.log(val);
    }

    updateGridWidth(val): void {
        console.log(val);
    }
    updateGridHeight(val): void {
        console.log(val);
    }
}