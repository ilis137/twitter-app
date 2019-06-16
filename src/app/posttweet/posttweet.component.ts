import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TwitterserviceService } from "../twitterservice.service";
import { first, last } from "rxjs/operators";
@Component({
  selector: "app-post-tweet",
  templateUrl: "./posttweet.component.html",
  styleUrls: ["./posttweet.component.css"]
})
export class PosttweetComponent implements OnInit {
  // tweetForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  tweetText: string = "";
  lastTweetTime = Date.now();
  noOfTweets = 0;
  reachedLimit = false;

  constructor(private api: TwitterserviceService) {}

  ngOnInit() {
    var tweetTracker;
    if (localStorage.getItem("tweetTracker")) {
      tweetTracker = JSON.parse(localStorage.getItem("tweetTracker"));
      this.lastTweetTime = tweetTracker.lastTweetTime;
      this.noOfTweets = tweetTracker.noOfTweets;
    }
  }

  ngOnDestroy() {
    localStorage.setItem(
      "tweetTracker",
      JSON.stringify({
        lastTweetTime: this.lastTweetTime,
        noOfTweets: this.noOfTweets,
        reachedLimit: this.reachedLimit
      })
    );
  }
  // get f() {
  //   return this.tweetForm.controls;
  // }

  checkTweetLimitation(): any {
    if (Date.now() - this.lastTweetTime < 180000 && this.noOfTweets <= 300) {
      this.noOfTweets++;
      this.lastTweetTime = Date.now();
      return true;
    } else if (
      Date.now() - this.lastTweetTime < 180000 &&
      this.noOfTweets >= 300
    ) {
      this.reachedLimit = true;
      return false;
    } else if (
      Date.now() - this.lastTweetTime > 180000 &&
      this.noOfTweets >= 300
    ) {
      this.reachedLimit = false;
      return true;
    }
  }

  onSubmit() {
    // stop here if form is invalid
    // if (this.tweetForm.invalid) {
    //   return;
    // }
    if (!this.checkTweetLimitation()) {
      return;
    }
    this.loading = true;
    this.api
      .tweet(this.tweetText)
      .pipe(first())
      .subscribe(
        data => {
          console.log("yes");
          this.submitted = true;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
