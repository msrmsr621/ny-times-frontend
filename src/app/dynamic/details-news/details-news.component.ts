import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { NewYorkServices } from 'src/app/services/new-york.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';

interface IMenu {
  text: string,
  icon: string,
  routerLink?: string;
  children: IMenuItem[]
}

interface IMenuItem {
  text: string,
  icon: string,
  routerLink: string;
}

@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {


  menuList;
  top_stories_list: any;

  constructor(private formBuilder: FormBuilder,
    private newYorkService: NewYorkServices,
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    public router: Router,) { }


  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'rgb(208, 241, 239)',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: 'rgb(208, 241, 239)',
    selectedListFontColor: 'red',
  };


  ngOnInit(): void {

    this.getTopStories();
  }

  getTopStories() {
    this.spinner.show();
    this.newYorkService.topStories({}).then((response) => {
      this.spinner.hide();
      if (response != undefined) {
        this.top_stories_list = response["results"];
      }

    }).catch(response => {
      console.log(response)
      this.spinner.hide();
    });

  }

  openSideNavPanel() {

  }

  selectedItem(event) {
    console.log(event)
  }

  detailsNews(short_url) {
    console.log(short_url);
    this.tokenStorage.saveShortUrl(short_url);
  }

}
