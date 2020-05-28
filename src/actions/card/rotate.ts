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

import { State, Card } from "../../state";

export interface Action {
  kind: "card/rotate";
  id: string;
}

export function Apply(state: State, action: Action): State {
  const objects = state.objects;
  const card: Card = objects[action.id] || {};
  const rotation = card.rotation ?? 0;

  return {
    ...state,
    objects: {
      ...objects,
      [action.id]: {
        ...card,
        rotation: rotation + 45,
      },
    },
  };
}
