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

describe("raise", () => {
  let state: State = {
    objects: {
      card1: {},
      card2: {}
    }
  };

  test("raises card1", () => {
    const action: Action = {
      kind: "raise",
      id: "card1"
    };
    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      card1: { order: 1 },
      card2: {}
    });
  });

  test("raises card2", () => {
    const action: Action = {
      kind: "raise",
      id: "card2"
    };
    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      card1: { order: 1 },
      card2: { order: 2 }
    });
  });
});
