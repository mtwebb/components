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

import { Component } from "../../types";
import { State, PlayerInfo } from "../../state";

export interface Action {
  kind: "player/create";
  player: PlayerInfo;
}

export function Apply(state: State, action: Action): State {
  const hand = {
    template: {
      id: action.player.handID,
      type: Component.HAND,
      geometry: { width: 0, height: 0 },
    },
    children: [],
  };

  return {
    ...state,

    objects: {
      ...state.objects,
      [action.player.handID]: hand,
    },

    players: {
      ...state.players,
      [action.player.id]: action.player,
    },
  };
}
