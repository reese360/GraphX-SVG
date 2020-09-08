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
    gridWidthMin: number = 0;
    gridWidthMax: number = 10;
    gridWidthStep: number = 1;
    gridWidthStartVal: number = 5;

    gridHeightLabel: string = "Grid Height";
    gridHeightMin: number = 0;
    gridHeightMax: number = 10;
    gridHeightStep: number = 1;
    gridHeightStartVal: number = 5;

    constructor() {}

    ngOnInit(): void {}

    toggleGridLines(val): void {
        console.log(val);
    }

    toggleSnapGrid(val): void {
        console.log(val);
    }
}