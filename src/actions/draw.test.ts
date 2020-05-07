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

import { Action, ApplyActionsToState } from ".";
import { State } from "../state";

describe("draw", () => {
  let state: State = {
    objects: {
      deck1: { children: [] },
      deck2: { children: [] },
      card: {}
    }
  };

  test("move card to deck1", () => {
    const action: Action = {
      kind: "add-to",
      id: "card",
      parent: "deck1"
    };

    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      deck1: { children: ["card"] },
      deck2: { children: [] },
      card: { parent: "deck1" }
    });
  });

  test("move card to deck2", () => {
    const action: Action = {
      kind: "draw",
      id: "deck1",
      target: "deck2"
    };

    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      deck1: { children: [] },
      deck2: { children: ["card"] },
      card: { parent: "deck2" }
    });
  });

  test("move card to freedom", () => {
    const action: Action = {
      kind: "draw",
      id: "deck2"
    };

    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      deck1: { children: [] },
      deck2: { children: [] },
      card: { parent: null }
    });
  });
});
