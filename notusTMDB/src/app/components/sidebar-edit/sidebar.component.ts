import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar-new",
  templateUrl: "./sidebar.component.html",
})
export class SidebarNewComponent implements OnInit {
  collapseShow = "hidden";
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
