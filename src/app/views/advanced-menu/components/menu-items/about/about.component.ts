import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    imagePath: string = 'http://reesepeltier.net/assets/images/reese_smile.png';
    constructor() {}

    ngOnInit(): void {}

}