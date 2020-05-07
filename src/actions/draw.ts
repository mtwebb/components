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
  kind: "draw";

  // ID of container to draw from.
  id: string;

  // Where to place the drawn item.
  // If not specified, then the item is set free on the table.
  target?: string;
}

export function Apply(state: State, action: Action): State {
  let objects = state.objects;
  const objState = objects[action.id];

  // Object is not a container or doesn't have any children.
  if (!objState?.children?.length) {
    return state;
  }

  // Get the top item.
  const topItemID = objState.children[objState.children.length - 1];

  // Remove the item from the list of children.
  const newObjState = {
    ...objState,
    children: objState.children?.filter(i => i != topItemID)
  };
  objects = { ...objects, [action.id]: newObjState };

  // Add the item to a new container (if necessary).
  if (action.target) {
    let newParent = objects[action.target] || {};
    newParent = {
      ...newParent,
      children: [...(newParent.children || []), topItemID]
    };
    objects = { ...objects, [action.target]: newParent };
  }

  // Update the item's parent.
  objects = {
    ...objects,
    [topItemID]: { ...objects[topItemID], parent: action.target || null }
  };

  return { ...state, objects };
}
