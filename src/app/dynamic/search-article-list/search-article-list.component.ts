import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { GeneralServices } from 'src/app/services/general.service';
import { Location } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NewYorkServices } from 'src/app/services/new-york.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'app-search-article-list',
  templateUrl: './search-article-list.component.html',
  styleUrls: ['./search-article-list.component.css']
})
export class SearchArticleListComponent implements OnInit {

  menuList;
  totalRecords = 50;
  top_stories_list: any;

  myControl = new FormControl();
  options: string[] = ["car", "bike", "ship", "cow", "fox"];
  filteredOptions: Observable<string[]>;

  search_query = "";
  current_component_selected = "TopStoriesList";

  articleName = "home";

  appitems = [
    {
      label: 'World',
      faIcon: 'fa fa-globe',
      items: [
        {
          label: 'Africa',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'Africa';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Australia',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'Australia';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Americas',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'Americas';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Asia Pacific',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'asia';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Canada',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'Canada';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Europe',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'Europe';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Middle East',
          onSelected: () => {
            this.parent_menu = 'World';
            this.sub_menu = 'middleeast';
            this.selectedSubMenu();
          }
        },
      ]
    },
    {
      label: 'Science',
      faIcon: 'fa fa-flask',
      items: [
        {
          label: 'Climate & Environment',
          onSelected: () => {
            this.parent_menu = 'Science';
            this.sub_menu = 'climate';
            this.selectedSubMenu();
          }
        },
        {
          label: 'Space & Astronomy',
          onSelected: () => {
            this.parent_menu = 'Science';
            this.sub_menu = 'space';
            this.selectedSubMenu();
          }
        },
      ]
    },
  ];
  parent_menu: string;
  sub_menu: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private newYorkService: NewYorkServices,
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    public router: Router,) { }
  changes: Subject<void>;
  itemsPerPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
  firstPageLabel: string;
  lastPageLabel: string;
  getRangeLabel: (page: number, pageSize: number, length: number) => string;


  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'white',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: 'white',
    selectedListFontColor: '#673ab7',
  };


  ngOnInit(): void {

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );

    const value = this.route.snapshot.queryParams["query"];
    this.search_query = value;
    this.searchArticle(0);

    this.historySearch();

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSideNavPanel() {

  }

  selectedItem(event) {
    console.log(event);
  }

  selectedSubMenu() {
    this.articleName = this.parent_menu + "/" + this.sub_menu
    this.getTopStories(this.parent_menu + "/" + this.sub_menu);
  }



  searchArticle(page_number) {

    console.log("search_query ", this.search_query);
    this.spinner.show();
    this.newYorkService.articleSearch(this.search_query, page_number).then((response) => {
      this.spinner.hide();
      if (response != undefined) {
        console.log("")
        this.top_stories_list = response["artcile_search_list"]["response"]["docs"];
        this.totalRecords = response["artcile_search_list"]["response"]["meta"]["hits"];

        this.options = response["history_data"];
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );

      }

    }).catch(response => {
      console.log(response)
      this.spinner.hide();
    });

  }

  historySearch() {
    this.newYorkService.historySearch().then((response: []) => {
      this.spinner.hide();
      if (response != undefined) {
        console.log("");
        let temp_option = [];
        temp_option = response;
        this.options = temp_option;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        console.log("this.options ", this.options);
      }

    }).catch(response => {
      console.log(response)
      this.spinner.hide();
    });
  }

  changeValue(event) {
    console.log(event)
  }

  detailsNews(url) {
    console.log(url);
    window.open(url, '_blank');
  }

  getServerData(event) {
    console.log("event--> ", event);
    const page_no = event.pageIndex;
    this.searchArticle(page_no);
  }

}
