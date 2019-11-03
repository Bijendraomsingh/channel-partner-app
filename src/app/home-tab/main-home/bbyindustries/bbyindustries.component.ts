import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bbyindustries',
  templateUrl: './bbyindustries.component.html',
  styleUrls: ['./bbyindustries.component.scss'],
})
export class BbyindustriesComponent implements OnInit {
  @Input() industries: any;
  constructor() { }

  ngOnInit() {}

}
