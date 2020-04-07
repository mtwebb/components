/*
 * Copyright 2020 Nicolo John Davis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// The State object contains the specific game state at
// a point in time.  Unlike the Schema, it does change
// throughout the game.  The values in the State object
// may override their equivalents in the Schema.

export interface State {
  objects: {
    [id: string]: StateEntry;
  };
}

export interface StateEntry {
  data?: KeyValue<any>;
  opts?: KeyValue<any>;
  parent?: string | null;
  children?: Array<string>;
  order?: number;
}

export interface KeyValue<T> {
  [key: string]: T;
}
