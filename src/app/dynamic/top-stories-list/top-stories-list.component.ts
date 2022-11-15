import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { NewYorkServices } from 'src/app/services/new-york.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-top-stories-list',
  templateUrl: './top-stories-list.component.html',
  styleUrls: ['./top-stories-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopStoriesListComponent implements OnInit {

  @Input() public articleName: string;
  top_stories_list: any;

  constructor(private formBuilder: FormBuilder,
    private newYorkService: NewYorkServices,
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    public router: Router,) { }

  ngOnInit(): void {
    console.log("this.articleName ", this.articleName)
    this.getTopStories(this.articleName);
  }

  calculateFunction(value) {
    console.log('calculate...');
  }

  getTopStories(article_name) {
    this.spinner.show();
    const article = article_name;
    this.newYorkService.topStories(article).then((response) => {
      this.spinner.hide();
      if (response != undefined) {
        this.top_stories_list = response["results"];
      }

    }).catch(response => {
      console.log(response)
      this.spinner.hide();
    });

  }

  detailsNews(url) {
    console.log(url);
    window.open(url, '_blank');
  }

}
