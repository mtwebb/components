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

import { State, Card, Container } from "../../state";

export interface Action {
  kind: "deck/flip";
  id: string;
}

export function Apply(state: State, action: Action): State {
  let objects = state.objects;
  const stateEntry: Container = objects[action.id] || {};
  const children = stateEntry.children?.reverse() || [];

  objects = {
    ...objects,
    [action.id]: {
      ...stateEntry,
      children,
    },
  };

  children.forEach((childID) => {
    const card: Card = objects[childID];
    const faceDown = card.faceDown ? false : true;
    objects[childID] = { ...card, faceDown };
  });

  return {
    ...state,
    objects,
  };
}
