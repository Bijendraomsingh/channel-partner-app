import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bbydepartment',
  templateUrl: './bbydepartment.component.html',
  styleUrls: ['./bbydepartment.component.scss'],
})
export class BbydepartmentComponent implements OnInit {
  @Input() getdpart: any;
  constructor() { }

  ngOnInit() {}

}
