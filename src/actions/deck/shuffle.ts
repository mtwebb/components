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

import { State, Container } from "../../state";
import seedrandom from "seedrandom";

export interface Action {
  kind: "deck/shuffle";
  id: string;
  seed: string;
}

export function Apply(state: State, action: Action): State {
  const objects = state.objects;
  const deck: Container = objects[action.id] || {};
  let { children } = deck;

  const rng = seedrandom(action.seed);

  if (children) {
    for (let i = children.length - 1; i > 0; i--) {
      let j = Math.floor(rng() * (i + 1));
      let temp = children[i];
      children[i] = children[j];
      children[j] = temp;
    }
  }

  const shuffleID = deck.shuffleID || 0;

  return {
    ...state,
    objects: {
      ...objects,
      [action.id]: {
        ...deck,
        shuffleID: shuffleID + 1,
        children: [...(children || [])],
      },
    },
  };
}
