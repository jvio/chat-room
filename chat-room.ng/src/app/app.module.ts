import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ApiModule, BASE_PATH, Configuration } from './api';
import { CoreModule } from './core/core.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

/**
 * Configuration for API, example:
 * https://github.com/OpenAPITools/openapi-generator/tree/master/samples/client/petstore/typescript-angular-v8-provided-in-root/builds/with-npm
 */
export const apiConfig = new Configuration({
  apiKeys: {}
});

/**
 * Returning static api config
 */
export function getApiConfig(): Configuration {
  return apiConfig;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    // make sure to import the HttpClientModule in the AppModule only,
    // see https://github.com/angular/angular/issues/20575
    HttpClientModule,
    ApiModule.forRoot(getApiConfig),
    CoreModule,
    ChatRoomModule,
    AppRoutingModule
  ],
  providers: [
    /**
     * For Api, if different than the generated base path, during app bootstrap, provide the base path to your service.
     */
    { provide: BASE_PATH, useValue: environment.api_path }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
