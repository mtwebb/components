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

import { Action } from "./actions";
import { Template } from "./schema";

type Order = number;

export interface State {
  objects: {
    [id: string]: StateEntry;
  };

  // Used in multiplayer games to identify the different seats.
  // Each seat has a private Player Hand.
  seats?: {
    [id: string]: SeatInfo;
  };

  game: any;
  ctx: any;

  highest?: Order;

  // A list of the actions applied at the most recent state update.
  latestActions?: Action[];

  // True if the latest state update was the result of actions
  // from a remote player.
  remote?: boolean;
}

export interface SeatInfo {
  id: string;

  // The object that represents the player hand.
  handID: string;
}

/**
 * Common properties.
 */
export interface Common {
  // Position.
  x?: number;
  y?: number;

  // Game-logic specific data.
  data?: KeyValue<any>;

  // Set if the object is in a container.
  parent?: string | null;

  // The rendering order.
  order?: Order;

  // This is populated for objects that are created
  // on the fly and don't have an entry in the schema.
  // For example, decks are created like this when
  // cards are stacked on top of each other.
  template?: Template.Entry;
}

export type Card = Common & {
  faceDown?: boolean;
  rotation?: number;
};

export type Container = Common & {
  // ID's of the children in this container.
  children?: Array<string>;
  // A unique ID that's updated every time the deck is shuffled.
  shuffleID?: number;
};

export type StateEntry = Card | Container;

export interface KeyValue<T> {
  [key: string]: T;
}
