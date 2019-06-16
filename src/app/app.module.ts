import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { TabsComponent } from "./tabs/tabs.component";
import { TwitterTimelineComponent } from "./twitter-timeline/twitter-timeline.component";

import { FollowersComponent } from "./followers/followers.component";
import { PosttweetComponent } from './posttweet/posttweet.component';
@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TwitterTimelineComponent,
    FollowersComponent,
    PosttweetComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
