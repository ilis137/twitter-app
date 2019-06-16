import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class TwitterserviceService {
  constructor(private http: HttpClient) {}

  api_url = "http://localhost:5000";

  getTimeline(max_id: any) {
    return this.http
      .get<any>(this.api_url + "/home_timeline?max_id=" + max_id)
      .pipe(map(data => data));
  }

  getFollowers() {
    return this.http
      .get<any>(this.api_url + "/followers/list")
      .pipe(map(data => data));
  }

  getUserDetails() {
    return this.http
      .get<any>(this.api_url + "/account/info")
      .pipe(map(data => data));
  }
  tweet(tweetdata: string) {
    return this.http
      .post<any>(`${this.api_url}/post_tweet/`, { status: tweetdata })
      .pipe(
        map(tweet => {
          return tweet;
        })
      );
  }
}
