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
  parent: string | null;
}

export function Apply(state: State, action: Action): State {
  let objects = state.objects;
  const objState = objects[action.id] || {};
  const oldParent = objState.parent;

  if (oldParent) {
    let entry = objects[oldParent] || {};
    entry = {
      ...entry,
      children: entry.children?.filter(i => i != action.id)
    };
    objects = { ...objects, [oldParent]: entry };
  }

  if (action.parent) {
    let newParent = objects[action.parent] || {};
    newParent = {
      ...newParent,
      children: [...(newParent.children || []), action.id]
    };
    objects = {
      ...objects,
      [action.parent]: newParent
    };
  }

  objects = {
    ...objects,
    [action.id]: { ...objState, parent: action.parent }
  };

  return { ...state, objects };
}
