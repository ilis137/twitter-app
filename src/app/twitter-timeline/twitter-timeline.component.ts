import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-twitter-timeline",
  templateUrl: "./twitter-timeline.component.html",
  styleUrls: ["./twitter-timeline.component.css"]
})
export class TwitterTimelineComponent implements OnInit {
  constructor() {}
  @Input("timeline") myTimeline;
  @Input("tweetsError") tweetsError;
  ngOnInit() {}
}
