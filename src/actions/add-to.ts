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

import { State, Container, StateEntry } from "../state";

export interface Action {
  kind: "add-to";
  id: string;
  parent: string | null;
}

export function Apply(state: State, action: Action): State {
  let objects = state.objects;
  const objState = objects[action.id] || {};
  const oldParent = objState.parent;

  // Remove object from existing container.
  if (oldParent) {
    objects = RemoveChild(objects, oldParent, action.id);
  }

  // Add object to new container.
  if (action.parent) {
    // If the subject is a container, flatten its children
    // inside the new container.
    const container = objState as Container;
    if (container.children) {
      container.children.forEach((childID) => {
        objects = RemoveChild(objects, action.id, childID);
        objects = AddChild(objects, action.parent as string, childID);
      });
    } else {
      objects = AddChild(objects, action.parent as string, action.id);
    }
  }

  let candidates = [action.id];
  if (oldParent) {
    candidates.push(oldParent);
  }
  objects = PurgeEphemeralDecks(objects, candidates);

  return { ...state, objects };
}

type Objects = { [id: string]: StateEntry };

function PurgeEphemeralDecks(objects: Objects, candidates: string[]): Objects {
  candidates.forEach((id) => {
    const entry: Container = objects[id];
    if (entry.template) {
      const numChildren = entry.children?.length || 0;

      // Remove last child from ephemeral containers.
      // Let it go free instead.
      if (numChildren === 1) {
        const lastChild = entry.children![0];

        objects = {
          ...objects,
          [lastChild]: {
            ...objects[lastChild],
            x: entry.x,
            y: entry.y,
            parent: null,
          },
        };
      }

      // Delete old parent if it was ephemeral and doesn't
      // need to exist anymore, i.e. it is either empty or
      // has exactly one child.
      if (numChildren < 2) {
        objects = DeleteObject(objects, id);
      }
    }
  });

  return objects;
}

function RemoveChild(
  objects: Objects,
  containerID: string,
  childID: string
): Objects {
  let container: Container = objects[containerID] || {};
  let child = objects[childID] || {};

  objects = {
    ...objects,

    [containerID]: {
      ...container,
      children: container.children?.filter((i) => i != childID),
    },

    [childID]: {
      ...child,
      parent: null,
    },
  };
  return objects;
}

function AddChild(
  objects: Objects,
  containerID: string,
  childID: string
): Objects {
  let container: Container = objects[containerID] || {};
  let child = objects[childID] || {};

  objects = {
    ...objects,

    [containerID]: {
      ...container,
      children: [...(container.children || []), childID],
    },

    [childID]: { ...child, x: 0, y: 0, parent: containerID },
  };

  return objects;
}

function DeleteObject(objects: Objects, id: string): Objects {
  const { [id]: _, ...rest } = objects;
  return rest;
}
