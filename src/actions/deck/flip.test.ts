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

import { Action, ApplyActionsToState } from "..";
import { State } from "../../state";

describe("flip", () => {
  let state: State = {
    objects: {
      deck: {
        children: ["card1", "card2", "card3", "card4", "card5"],
      },
      card1: { parent: "deck" },
      card2: { parent: "deck" },
      card3: { parent: "deck" },
      card4: { parent: "deck" },
      card5: { parent: "deck" },
    },
  };

  test("flip", () => {
    const action: Action = {
      kind: "deck/flip",
      id: "deck",
    };

    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      deck: {
        children: ["card5", "card4", "card3", "card2", "card1"],
      },
      card1: { parent: "deck", faceDown: true },
      card2: { parent: "deck", faceDown: true },
      card3: { parent: "deck", faceDown: true },
      card4: { parent: "deck", faceDown: true },
      card5: { parent: "deck", faceDown: true },
    });
  });
});
