import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { OptionSelectorComponent } from '../../form-items/option-selector/option-selector.component';

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

    @ViewChild('showGrid') showGrid: OptionSelectorComponent;
    @ViewChild('snapGrid') snapGrid: OptionSelectorComponent;

    ngOnInit(): void {}

    toggleGridLines(val): void {
        // disable grid snapping if grid display is off
        if (val === 1 && this.snapGrid.selIdx !== 1) {
            this.snapGrid.toggleOptions(1);
        }
    }

    toggleSnapGrid(val): void {
        // grid display must be enabled to snap to grid -> toggle grid display
        if (val === 0 && this.showGrid.selIdx !== 0)
            this.showGrid.toggleOptions(0);
    }

    updateGridWidth(val): void {
        console.log(val);
    }
    updateGridHeight(val): void {
        console.log(val);
    }
}