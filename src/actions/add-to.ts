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

import { State } from "../state";

export interface Action {
  kind: "add-to";
  id: string;
  parent: string;
}

export function Apply(state: State, action: Action): State {
  const objState = state[action.id] || {};
  const oldParent = objState.parent;

  if (oldParent) {
    let entry = state[oldParent];
    entry = {
      ...entry,
      children: entry.children?.filter(i => i != action.id)
    };
    state = { ...state, [oldParent]: entry };
  }

  let newParent = state[action.parent] || {};
  newParent = {
    ...newParent,
    children: [...(newParent.children || []), action.id]
  };

  state = {
    ...state,
    [action.parent]: newParent,
    [action.id]: { ...objState, parent: action.parent }
  };

  return state;
}
