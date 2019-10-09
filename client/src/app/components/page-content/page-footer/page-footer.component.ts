import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent implements OnInit {

    url: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route) {
        if (typeof this.route.snapshot.component !== 'string') {
            this.url = this.route.snapshot.component.name;
        }
    }
  }

  onRouterLink(link) {
      this.router.navigate([link]);
  }

}
