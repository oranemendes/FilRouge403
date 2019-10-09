import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalController} from "@ionic/angular";
import * as $ from "jquery";
import {ApiService} from "../../services/api/api.service";

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
})
export class ViewMediaComponent implements OnInit {

  @Input() ref;
  @Input() fileName;
  domain;

  constructor(private modalController: ModalController,
              private apiService: ApiService) { }

  ngOnInit() {
    this.defineDomain();
    this.setBackground();
  }

  setBackground() {
    const urlImg = this.domain + '/media/' + this.ref + '/' + this.fileName;
    $('#bg-media').css({'background-image': 'url(' + urlImg + ')'});
  }

  onModalDismiss() {
    this.modalController.dismiss();
  }

  defineDomain() {
    this.domain = this.apiService.domain;
  }

}
