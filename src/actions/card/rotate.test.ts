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

describe("rotate", () => {
  let state: State = {
    objects: {
      card: {},
    },
  };

  test("rotate once", () => {
    const action: Action = {
      kind: "card/rotate",
      id: "card",
    };

    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      card: { rotation: 45 },
    });
  });

  test("rotate again", () => {
    const action: Action = {
      kind: "card/rotate",
      id: "card",
    };

    state = ApplyActionsToState(state, [action]);
    expect(state.objects).toEqual({
      card: { rotation: 90 },
    });
  });

  test("bring back to 0", () => {
    const action: Action = {
      kind: "card/rotate",
      id: "card",
    };

    state = ApplyActionsToState(state, new Array(6).fill(action));
    expect(state.objects).toEqual({
      card: { rotation: 0 },
    });
  });
});
