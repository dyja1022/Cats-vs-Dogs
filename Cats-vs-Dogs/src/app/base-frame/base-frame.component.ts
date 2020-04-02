import { Component, OnInit } from '@angular/core';
import {ControlsService} from '../services/controls.service';

@Component({
  selector: 'app-base-frame',
  templateUrl: './base-frame.component.html',
  styleUrls: ['./base-frame.component.css']
})
export class BaseFrameComponent implements OnInit {

  constructor(private controls:ControlsService) { }

  ngOnInit(): void {
    
  }

}
