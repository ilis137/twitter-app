import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TwitterserviceService } from "../twitterservice.service";
import * as scrollHelpers from "../scrollhelper";
@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit {
  currentJustify = "fill";
  constructor(private api: TwitterserviceService) {}
  followers: any;
  max_id: any;
  myTimeline: any;
  followerError: boolean;
  tweetsError: boolean;
  noOfRequests = 0;
  lastRequestTime = Date.now();
  details: Object;
  reachedLimit = false;
  activeTab: any;
  ngOnInit() {
    this.getTwitterTimeline(this.max_id);
    this.getFollowers();
    this.getuserDetails();

    window.onscroll = this.handleScroll;

    // if (localStorage.getItem("noOfRequests")) {
    //   this.noOfRequests = JSON.parse(
    //     localStorage.getItem("noOfRequests")
    //   ).noOfRequests;
    // }
  }
  ngOnDestroy() {
    window.onscroll = null;
  }

  getFollowers(): void {
    this.api.getFollowers().subscribe(data => {
      if (data.allErrors) {
        return (this.followerError = true);
      }
      this.followers = data;
      this.followerError = false;
      console.log(this.followers);
    });
  }

  getTwitterTimeline(max_id: any): void {
    this.api.getTimeline(max_id).subscribe(myData => {
      console.log(myData.data);
      if (myData.allErrors) {
        return (this.tweetsError = true);
      }
      this.tweetsError && (this.tweetsError = false);
      if (this.myTimeline) {
        this.myTimeline = this.myTimeline.concat(myData.data);
      } else {
        this.myTimeline = myData.data;
      }
      // console.log(this.myTimeline);
    });
  }

  getuserDetails() {
    this.api.getUserDetails().subscribe(details => {
      // console.log(myTimeline.data);
      this.details = details;
      // console.log(this.myTimeline);
    });
  }

  handleScroll = () => {
    // console.log(this.myTimeline);

    let pageScrolled = scrollHelpers.getScrollDownPercentage();
    if (pageScrolled >= 0.98 && this.activeTab === "feed") {
      // this.noOfRequests++;
      console.log(this.myTimeline[this.myTimeline.length - 1]);
      this.max_id = this.myTimeline[this.myTimeline.length - 1].id;
      this.getTwitterTimeline(this.max_id);
    }
  };
}
